import { useState, useEffect } from "react";
import { getUkBottomWealthDistro } from "../services/apiWealthPorn";
import UkBottomWealthDistro_Table from "../chart/UkBottomWealthDistro_Table";
// import UkTopWealthDistro_Bar from "../chart/UkTopWeatlhDistro_Bar";

function UkBottomWealthDistro() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [ukBottomWealthDistroData, setUkBottomWealthDistroData] = useState();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getUkBottomWealthDistro();
        console.log(data);
        setUkBottomWealthDistroData(data);
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
        {/* Title */}
        <div className="mb-4 sm:mb-0">
          <h1 className="text-2xl md:text-3xl text-gray-800 dark:text-gray-100 font-bold">
            UK Bottom Wealth Distribution in 2024
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        {/* Source */}
        <h4 className="col-span-full font-semibold text-gray-800 dark:text-gray-100">
          Source: EqualityTrust and ONS.
        </h4>
        {/* Cards */}
        {!isLoading && ukBottomWealthDistroData && (
          <>
            {/* Table  */}
            <UkBottomWealthDistro_Table
              distroData={ukBottomWealthDistroData.bottomWealthDistro}
            />
            {/* Bar */}
            {/* <UkTopWealthDistro_Bar
              distroData={ukBottomWealthDistroData.topWealthDistro}
            /> */}
          </>
        )}
      </div>
    </div>
  );
}

export default UkBottomWealthDistro;
