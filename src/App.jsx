import { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router";
import PlayPage from "./pages/Play";
import MappingDashboard from "./pages/MappingDashboard"

import Sidebar from "./partials/Sidebar";
import Header from "./partials/Header";

import "./css/style.css";


function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <>
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        {/* Content area */}
        <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {/*  Site header */}
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

          <main className="grow">
            <Routes>
              <Route exact path="/" element={<MappingDashboard />} />
              <Route path="/play" element={<PlayPage />} />
            </Routes>
          </main>

          {/* <Banner /> */}
        </div>
      </div>
    </>
  );
}

export default App;
