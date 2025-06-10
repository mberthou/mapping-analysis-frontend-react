import { formatTickBln } from "../utils/Utils";

function UkGiniCoefficient_Table({ giniCoefficientsData }) {
  return (
    <div className="col-span-full xl:col-span-5 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <div className="p-3">
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-gray-300">
            {/* Table header */}
            <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50 rounded-xs">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-center">Year</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">
                    Gini Coefficient
                  </div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
              {giniCoefficientsData.map((yearData) => (
                <tr key={yearData._id}>
                  <td className="p-2">
                    <div className="text-center text-sky-500">
                      {yearData.year}
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="text-center text-green-500">
                      {yearData.gini_coefficient}%
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UkGiniCoefficient_Table;
