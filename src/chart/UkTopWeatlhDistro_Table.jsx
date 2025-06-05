import React from "react";

function UkTopWeatlhDistro_Table() {
  return (
    <div className="col-span-full xl:col-span-8 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      {/* <header className="px-5 py-4 border-b border-gray-100 dark:border-gray-700/60">
        <h2 className="font-semibold text-gray-800 dark:text-gray-100">
          Data as Table
        </h2>
      </header> */}
      <div className="p-3">
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-gray-300">
            {/* Table header */}
            <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50 rounded-xs">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-center">
                    Population Top Percentile
                  </div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">
                    Combined Wealth %
                  </div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">
                    Combined Wealth £
                  </div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="text-center text-sky-500">0.0001%</div>
                </td>
                <td className="p-2">
                  <div className="text-center">4.44%</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-green-500">
                    600 Billion GBP
                  </div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="text-center text-sky-500">0.001%</div>
                </td>
                <td className="p-2">
                  <div className="text-center">8.89%</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-green-500">
                    1,200 Billion GBP
                  </div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="text-center text-sky-500">0.01%</div>
                </td>
                <td className="p-2">
                  <div className="text-center">16.3%</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-green-500">
                    2,200 Billion GBP
                  </div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="text-center text-sky-500">0.1%</div>
                </td>
                <td className="p-2">
                  <div className="text-center">25.93%</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-green-500">
                    3,500 Billion GBP
                  </div>
                </td>
              </tr>
              {/* Row */}
              <tr>
                <td className="p-2">
                  <div className="text-center text-sky-500">1%</div>
                </td>
                <td className="p-2">
                  <div className="text-center">35.56%</div>
                </td>
                <td className="p-2">
                  <div className="text-center text-green-500">
                    4,800 Billion GBP
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UkTopWeatlhDistro_Table;
