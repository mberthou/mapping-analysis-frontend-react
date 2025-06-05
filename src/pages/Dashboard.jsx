import TableUkTopWeatlhDistro from "../chart/UkTopWeatlhDistro_Table";

function Dashboard() {
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
      {/* Charts, Facts & Figures */}
      <div className="grid grid-cols-12 gap-6">
        <h4 className="col-span-full font-semibold text-gray-800 dark:text-gray-100">
          Source: EqualityTrust and ONS.
        </h4>
        {/* Table */}
        <TableUkTopWeatlhDistro />
      </div>
    </div>
  );
}

export default Dashboard;
