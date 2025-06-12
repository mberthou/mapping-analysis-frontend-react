import { useState, useEffect } from "react";
import { getMappingData } from "../services/apiMappingData";
import ParameterDistro_Bar from "../chart/ParameterDistro_Bar";

function MappingDashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [mappingData, setMappingData] = useState();
  
  const [choiceTree, setChoiceTree] = useState(new Map())

  const [siteChoices, setSiteChoices] = useState([]);
  const [selectedSites, setSelectedSites] = useState([]);
  
  const [subsiteChoices, setSubsiteChoices] = useState([]);
  const [selectedSubsites, setSelectedSubsites] = useState([]);
  
  const [parameterChoices, setParameterChoices] = useState([]);
  const [selectedParameters, setSelectedParameters] = useState([]);

  const [selectedParameterValues, setSelectedParameterValues] = useState( new Map());
  const [barChartData, setBarChartData] = useState([{from : 0, to : 1, value : 0}, {from : 1, to : 2, value : 1}, {from : 2, to : 3, value : 2}])
  
  // loading mapping data on page load
  useEffect(() => {
    const loadData = async () => {
      try 
      {
        console.log("loading mapping data");
        const data = await getMappingData();
        setMappingData(data);
        console.log("mapping data loaded");
      }
      catch (err) 
      {
        console.error(err.message);
        setErrorMsg(err.message);
      }
    };

    loadData();
  }, []);


  // extracting site/subsite/parameter choices available in mapping data 
  useEffect(() => {
    try 
    {
      console.log("extracting key information from mapping data");
      if(!mappingData)
      {        
        console.log("mapping data is empty");
        return
      }
      
      // console.log(mappingData);

      const expectedSubsiteProperties = new Set(["name", "x", "y", "w", "h", "sel"]);
      const foundChoices = new Map()

      // console.info(sites);
      // console.info(`${sites.length} rows to traverse`);
      
      for (const rowOfSites of mappingData['Content']['sites'])
      {
        // console.info(rowOfSites);
        // console.info(`${rowOfSites.length} cols to traverse`);
        for (const site of rowOfSites)
        {
          // console.info(`adding site name ${site.name}`);
          if(!foundChoices.has(site.name))
          {
            // console.info(`adding site ${site.name} to choices`);
            foundChoices.set(site.name, new Map())
          }

          for (const subsite of site.subsites) 
          {            
            if(!foundChoices.get(site.name).has(subsite.name))
            {
              // console.info(`adding subsite name ${subsite.name} to choices for ${site.name}`);
              foundChoices.get(site.name).set(subsite.name, []);
            }

            for(const key of Object.keys(subsite))
            {
              if(!expectedSubsiteProperties.has(key) && !foundChoices.get(site.name).get(subsite.name).includes(key))
              {
                // console.info(`adding parameter ${key} to choices for subsite ${subsite.name} in site ${site.name}`);
                foundChoices.get(site.name).get(subsite.name).push(key);
              }
            }
          }
        }
      }

      setChoiceTree(foundChoices);
    }
    catch (err) 
    {
      console.error(err.message);
      // console.log(err.stack);
      setErrorMsg(err.message);
    } 
    finally 
    {
      setIsLoading(false);
    }
  }, [mappingData]);

  // rebuilding site choices and selection on choice tree modification
  useEffect(()=>{
    try{
      setSiteChoices(Array.from(choiceTree.keys()) );
      setSelectedSites(siteChoices);
    }
    catch (err) 
    {
      console.error(err.message);
      // console.log(err.stack);
      setErrorMsg(err.message);
    }
  }, [choiceTree])
  
  // rebuilding subsite choices on site selection modification
  useEffect(() => {
    try{
      const subsitesToShow = Array.from(new Set(
        selectedSites.map(
           (value, index, map) => Array.from(choiceTree.get(value).keys())
          ).flat()
      ));

      setSubsiteChoices(subsitesToShow);
      setSelectedSubsites(subsiteChoices);
    }
    catch (err) 
    {
      console.error(err.message);
      // console.log(err.stack);
      setErrorMsg(err.message);
    }
  }, [selectedSites])

  
  // rebuilding parameter choices on subsite selection modification
  useEffect(() => {
    try{
      const selectedSitesData = selectedSites.map( (value) => choiceTree.get(value));
      const availableParameters = new Set();
      for(const siteData of selectedSitesData)
      {
        for(const selectedSubsite of selectedSubsites)
        {
          if( siteData.has(selectedSubsite))
          {
            siteData.get(selectedSubsite).forEach(value => availableParameters.add(value));
          }
        }        
      }

      console.log("available parameters:");
      console.log(availableParameters);
      setParameterChoices(Array.from(availableParameters));
    }
    catch (err) 
    {
      console.error(err.message);
      // console.log(err.stack);
      setErrorMsg(err.message);
    }
  }, [selectedSubsites])


  // extract selectedParameterValues when selectedParameter changes
  useEffect(() => {
    if(!mappingData)
    {
      return;
    }

    const parameterValues = new Map();
    for (const rowOfSites of mappingData['Content']['sites'])
    {
      // console.info(rowOfSites);
      // console.info(`${rowOfSites.length} cols to traverse`);
      for (const site of rowOfSites) {
        // console.info(`adding site name ${site.name}`);
        if (!selectedSites.includes(site.name)) {
          continue;
        }

        for (const subsite of site.subsites) {
          if(!selectedSubsites.includes(subsite.name))
          {
            continue;
          }

          for (const key of Object.keys(subsite)) {
            if(!selectedParameters.includes(key))
            {
              continue;
            }

            console.log(key);
            if(!parameterValues.has(key))
            {
              parameterValues.set(key, []);
            }

            parameterValues.get(key).push(subsite[key])
          }
        }
      }
    }

    console.info("parameterValues");
    console.info(parameterValues);
    setSelectedParameterValues(parameterValues);
  }, [selectedParameters])
  
  useEffect(() => {
    const allBinings = {};
    for(var [param, values] of selectedParameterValues)
    {
      let max = Math.max(...values);
      let min = Math.min(...values);
      const margin = ( max - min ) / 20;
      max += margin;
      min -= margin;
      const step = (max - min) /10;
      
      const bining = [];
      for(let i = 0; i < 10; ++i)
      {
        const from = min + i*step;
        const to = min + (i+1)*step;
        bining.push(
          {
            from : from, 
            to : to,
            value : values.filter(x => x >= from && x < to).length
          });
      }

      allBinings[param] = bining;
    }

    console.log(allBinings);
    if( !Object.keys(allBinings).length) 
    {
      return;
    }

    console.log("reload graph data");
    setBarChartData(Object.values(allBinings)[0]);
  }, [selectedParameterValues])
  

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      {/* Dashboard actions */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        {/* Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
            Mapping Analysis
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {/* Cards */}
        {!isLoading && mappingData && (
          <div className="grid grid-cols-1 gap-6">          
            {/* List of sites */}
            <label>
              Sites:
              <select 
                 multiple={true}
                 value={selectedSites}
                 onChange={e => {
                  const options = [...e.target.selectedOptions];
                  const values = options.map(option => option.value);
                  setSelectedSites(values);
                }}
                 name="select_sites" >
                {
                  siteChoices.map( item => (
                    <option key={item} value={item}>{item}</option>
                    )
                  )
                }
              </select>
            </label>
            {/* List of subsites */}
            <div>
            <label>
              Subsites:
              <select 
                name="select_subsites"
                multiple={true}
                value={selectedSubsites}
                onChange={e => {
                  const options = [...e.target.selectedOptions];
                  const values = options.map(option => option.value);
                  setSelectedSubsites(values);
                }}
              >
                {
                  subsiteChoices.map( item => (
                    <option key={item} value={item}>{item}</option>
                    )
                  )
                }
              </select>
            </label>
            </div>
            <div>
              {/* List of parameters */}
              <label>
                Available Parameters:
                <select 
                  multiple={true}
                  value={selectedParameters}
                  onChange={e => {
                    const options = [...e.target.selectedOptions];
                    const values = options.map(option => option.value);
                    setSelectedParameters(values);
                  }}
                  name="selectParameters"
                >
                  {
                    parameterChoices.map( param => (
                      <option key={param} value={param}>{param}</option>
                      )
                    )
                  }
                </select>
              </label>
            </div>    
          </div>
        )}
        {barChartData && (
            <div>
              <ParameterDistro_Bar parameterData={barChartData}/>
            </div>
        )}
      </div>
    </div>
  );
}

export default MappingDashboard;
