import { formatTickBln } from "../utils/Utils";

function UkTopHundredWealthiest_Table({ wealthyPeepsData }) {
  return (
    <div className="col-span-full xl:col-span-5 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
      <div className="p-3">
        <div className="overflow-x-auto">
          <table className="table-auto w-full dark:text-gray-300">
            {/* Table header */}
            <thead className="text-xs uppercase text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-700/50 rounded-xs">
              <tr>
                <th className="p-2">
                  <div className="font-semibold text-center">Rank</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Net Worth £</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">Name</div>
                </th>
                <th className="p-2">
                  <div className="font-semibold text-center">
                    Citizenship(s)
                  </div>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody className="text-sm font-medium divide-y divide-gray-100 dark:divide-gray-700/60">
              {wealthyPeepsData &&
                wealthyPeepsData.map((wealthyPerson) => (
                  <tr key={wealthyPerson._id}>
                    <td className="p-2">
                      <div className="text-center text-sky-500">
                        {wealthyPerson.rank}
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center text-green-500">
                        {wealthyPerson.net_worth_bln_gbp}
                        <span className="sm:hidden">B</span>
                        <span className="hidden sm:inline">B GBP</span>
                      </div>
                    </td>
                    <td className="p-2">
                      <div className="text-center ">{wealthyPerson.name}</div>
                    </td>
                    <td className="p-2">
                      <div className="text-center ">
                        {wealthyPerson.citizenship}
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

export default UkTopHundredWealthiest_Table;
