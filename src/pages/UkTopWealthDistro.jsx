import { useState, useEffect } from "react";
import { getUkTopWealthDistro } from "../services/apiWealthPorn";
import UkTopWealthDistro_Table from "../chart/UkTopWealthDistro_Table";
import UkTopWealthDistro_Bar from "../chart/UkTopWeatlhDistro_Bar";

function UkTopWealthDistro() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [ukTopWealthDistroData, setUkTopWealthDistroData] = useState();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getUkTopWealthDistro();
        console.log(data);
        setUkTopWealthDistroData(data);
      } catch (err) {
        setErrorMsg(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
      {/* Dashboard actions */}
      <div className="sm:flex sm:justify-between sm:items-center mb-8">
        {/* Left: Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
            UK Top Weatlh Distribution in 2024
          </h1>
        </div>
      </div>
      {/* Facts & Figures */}
      <div className="grid grid-cols-12 gap-6">
        <h4 className="col-span-full font-semibold text-gray-800 dark:text-gray-100">
          Source: EqualityTrust and ONS.
        </h4>
        {/* Table and Charts */}
        <div className="col-span-full xl:col-span-5 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
          <div className="p-3">
            <div className="overflow-x-auto">
              {!isLoading && ukTopWealthDistroData && (
                <>
                  {/* Table  */}
                  <UkTopWealthDistro_Table
                    distroData={ukTopWealthDistroData.topWealthDistro}
                  />
                  {/* Bar */}
                  <UkTopWealthDistro_Bar
                    distroData={ukTopWealthDistroData.topWealthDistro}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UkTopWealthDistro;
