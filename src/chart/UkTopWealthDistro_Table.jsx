import { formatTickBln } from "../utils/Utils";

function UkTopWeatlhDistro_Table({ distroData }) {
  return (
    <div className="col-span-full xl:col-span-5 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <div className="p-3">
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
              {distroData.map((wealthCategory) => (
                <tr key={wealthCategory._id}>
                  <td className="p-2">
                    <div className="text-center text-sky-500">
                      {wealthCategory.population_top_percent}%
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="text-center">
                      {wealthCategory.combined_wealth_percent}%
                    </div>
                  </td>
                  <td className="p-2">
                    <div className="text-center text-green-500">
                      {formatTickBln(wealthCategory.combined_wealth_bln_gbp)}
                      <span className="sm:hidden">B</span>
                      <span className="hidden sm:inline">B GBP</span>
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

export default UkTopWeatlhDistro_Table;
