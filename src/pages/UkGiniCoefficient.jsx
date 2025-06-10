import { useState, useEffect } from "react";
import { getUkGiniCoefficient } from "../services/apiWealthPorn";
import UkGiniCoefficient_Table from "../chart/UkGiniCoefficient_Table";
import UkGiniCoefficient_Bar from "../chart/UkGiniCoefficient_Bar";

function UkGiniCoefficient() {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState();
  const [ukGiniCoefficientsData, setUkGiniCoefficientsData] = useState();

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getUkGiniCoefficient();
        console.log(data);
        setUkGiniCoefficientsData(data);
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
            UK Gini Coefficient
          </h1>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        {/* Source */}
        <h4 className="col-span-full font-semibold text-gray-800 dark:text-gray-100">
          Source: ONS.
        </h4>
        {/* Cards */}
        {!isLoading && ukGiniCoefficientsData && (
          <>
            {/* Bar */}
            <UkGiniCoefficient_Bar
              giniCoefficientsData={ukGiniCoefficientsData.giniCoefficients}
            />
            {/* Table  */}
            <UkGiniCoefficient_Table
              giniCoefficientsData={ukGiniCoefficientsData.giniCoefficients}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default UkGiniCoefficient;
