import { useState, useEffect, useMemo } from "react";
import { getMappingData } from "../services/apiMappingData";
import ParameterDistro_Bar from "../chart/ParameterDistro_Bar";
import MultiSelector from "../components/MultiSelector";
import { D3Barplot } from "../chart/D3Barplot";
import { ExtractAllHeatmapData } from "../chart/ExtractMappingHeatMapData";
import { Heatmap } from "../chart/HeatMap";
import BinningPanel from "../components/BinningPanel";

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

  const [binningChoices, setBinningChoices] = useState([]);
  const [selectedBinnings, setSelectedBinnings] = useState([]);

  const [parameterValuesToShow, setParameterValuesToShow] = useState( new Map());
  const [barChartData, setBarChartData] = useState([{name : "0 to 1", value : 0}, {name : "1 to 2", value : 1}, {name : "2 to 3", value : 2}])
  const [allBarChartData, setAllBarChartData] = useState({});
  const [allHeatMapData, setAllHeatMapData] = useState({})
    
  // reset all heatMapData
  useEffect( () => {
    console.info("reset all heatMapData");
    if(!mappingData || selectedSites.length < 1 || selectedSubsites.length < 1 || selectedParameters.length < 1 )
    {
      setAllHeatMapData({});
    }

    setAllHeatMapData(
      ExtractAllHeatmapData(mappingData, selectedSites, selectedSubsites, selectedParameters)
    );

    console.log("heat map data:");
    console.log(allHeatMapData);
  }, [selectedParameters] );

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
      setSelectedSites(Array.from(choiceTree.keys()));
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
      setSelectedSubsites(subsitesToShow);
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
      setSelectedParameters(Array.from(availableParameters));
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
    try {
      if(!mappingData || !selectedParameters)
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
              if(!selectedParameters || !selectedParameters.includes(key))
              {
                continue;
              }

              if(!parameterValues.has(key))
              {
                parameterValues.set(key, []);
              }

              parameterValues.get(key).push(subsite[key])
            }
          }
        }
      }

      setParameterValuesToShow(parameterValues);
    }
    catch(err)
    {
      console.error(err.message);
      console.log(err.stack);
      setErrorMsg(err.message);
    }}, [selectedParameters])
  
  useEffect(() => {
    const allBinings = {};
    for(var [param, values] of parameterValuesToShow)
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
            name : `${from.toPrecision(3)} to ${to.toPrecision(3)}`,
            value : values.filter(x => x >= from && x < to).length
          });
      }

      allBinings[param] = bining;
    }

    if( !Object.keys(allBinings).length) 
    {
      return;
    }

    // setBarChartData(Object.values(allBinings)[0]);
    setAllBarChartData(allBinings);
  }, [parameterValuesToShow])
  

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      {/* Dashboard actions */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        {/* Title */}
          <h1 className="text-2xl text-gray-800 dark:text-gray-100 font-bold">
            Mapping Analysis
          </h1>
      </div>
      <div className="flex flex-row gap-4">
        {/* Selectors */}
        {!isLoading && mappingData && (
          <div className="shrink flex flex-col flex-nowrap gap-2">          
            {/* List of sites */}
            <label>Sites:</label>
            <MultiSelector 
              name="SelectParameters"
              choices={siteChoices}
              setSelectedChoices={setSelectedSites}
              selectedChoices={selectedSites}
            /> 
            {/* List of subsites */}
            <label>Subsites:</label>
            <MultiSelector 
              name="SelectParameters"
              choices={subsiteChoices}
              setSelectedChoices={setSelectedSubsites}
              selectedChoices={selectedSubsites}
            />  
            {/* List of parameters */}
            <label>Available Parameters:</label>
            <MultiSelector
              name="SelectParameters"
              choices={parameterChoices}
              setSelectedChoices={setSelectedParameters}
              selectedChoices={selectedParameters}
            />
            <label>Available Binnings:</label>
            <MultiSelector
              name="SelectParameters"
              choices={binningChoices}
              setSelectedChoices={setSelectedBinnings}
              selectedChoices={selectedParameters}
            />
            <BinningPanel />
          </div>
        )}
        <div className="grow flex flex-wrap gap-4"> 
        {/* charts */}
        {
          (selectedParameters.map(param => allBarChartData[param] && allHeatMapData[param] && (
          <div className="flex flex-wrap gap-4">
            <D3Barplot data={allBarChartData[param]} width="500" height="500"/>
            <Heatmap width="500" height="500" data={allHeatMapData[param]}/>
          </div>)))            
        }
        </div>
      </div>
    </div>
  );
}

export default MappingDashboard;
