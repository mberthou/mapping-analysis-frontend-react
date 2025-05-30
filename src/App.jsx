import "./App.css";
import NavBar from "./components/NavBar";
import WealthPornPage from "./pages/WealthPorn";
import PlayPage from "./pages/Play";
import { Route, Routes } from "react-router";

function App() {
  return (
    <>
      <div className="h-screen">
        <NavBar />
        <Routes>
          <Route path="/" element={<WealthPornPage />} />
          <Route path="/play" element={<PlayPage />} />
        </Routes>
        <footer></footer>
      </div>
    </>
  );
}

export default App;
