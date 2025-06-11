import { useState, useEffect } from "react";
import { getMappingData } from "../services/apiMappingData";

function MappingDashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [mappingData, setMappingData] = useState();
  const [parameters, setParameters] = useState(new Set());
  const [subsites, setSubsites] = useState(new Set());
  const [siteNames, setSiteNames] = useState(new Set());
  const [selectedParameter, setSelectedParameter] = useState('');

  useEffect(() => {
    try 
    {
      console.log("extracting key information from mapping data");
      if(!mappingData)
      {        
        console.log("mapping data is empty");
        return
      }
      
      console.log(mappingData);

      const expectedSubsiteProperties = new Set(["name", "x", "y", "w", "h", "sel"]);
      const foundSites = new Set()
      const foundSubsites = new Set();
      const foundParameters = new Set();

      const sites = mappingData['Content']['sites']
      console.log(sites);
      console.log(`${sites.length} rows to traverse`);
      
      for (const rowOfSites of sites)
      {
        console.log(rowOfSites);
        console.log(`${rowOfSites.length} cols to traverse`);
        for (const site of rowOfSites)
        {
          console.log(`adding site name ${site.name}`);
          foundSites.add(site.name);
          for (const subsite of site.subsites) 
          {
            console.log(subsite);
            foundSubsites.add(subsite.name);
            for(const key of Object.keys(subsite))
            {
              if(!expectedSubsiteProperties.has(key))
              {
                foundParameters.add(key);
              }
            }
          }
        }
      }

      console.log("displaying data");
      console.log(`found ${foundSites.size} subsites:`)
      for (const item of foundSites) 
      {
          console.log(item);
      }
    
      console.log(`found ${foundSubsites.size} subsites:`)
      for (const item of foundSubsites) 
      {
          console.log(item);
      }

      console.log(`found ${foundParameters.size} parameters:`)
      for (const item of foundParameters) 
      {
          console.log(item);
      }

      setSubsites(foundSubsites);
      setSiteNames(foundSites);
      setParameters(foundParameters);
    }
    catch (err) 
    {
      setErrorMsg(err.message);
    } 
    finally 
    {
      setIsLoading(false);
    }
  }, [mappingData]);

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
        setErrorMsg(err.message);
      }
    };

    loadData();
  }, []);


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
      <div className="grid grid-cols-12 gap-6">
        {/* Cards */}
        {!isLoading && mappingData && (
          <>
          <div>
            {/* List of parameters */}
            <label>
              Available Parameters:
              <select 
                value={selectedParameter} 
                onChange={e => setSelectedParameter(e.target.value)}
                name="selectParameter"
              >
                {
                  Array.from(parameters).map( param => (
                    <option key={param} value={param}>{param}</option>
                    )
                  )
                }
              </select>
            </label>
          </div>
            {/* List of sites */}
            <div>
            <label>
              Sites:
              <select name="selectSite" >
                {
                  Array.from(siteNames).map( item => (
                    <option key={item} value={item}>{item}</option>
                    )
                  )
                }
              </select>
            </label>
            </div>
            {/* List of subsites */}
            <div>
            <label>
              Subsites:
              <select name="selectSubsites" >
                {
                  Array.from(subsites).map( item => (
                    <option key={item} value={item}>{item}</option>
                    )
                  )
                }
              </select>
            </label>
            </div>      
          </>
        )}
      </div>
    </div>
  );
}

export default MappingDashboard;
