import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

import Landing from "./components/Landing/Landing";
import Login, { SignUp } from "./pages/signup/Signup";
import "./output.css";
import Sildebar from "./components/Sildebar/Sildebar";
import Dropdown from "./components/Dropdown/Dropdown";
import Upload from "./components/Upload/Upload";
import Team from "./components/Team/Team";
import Explore from "./components/Explore/Explore";
function App() {
  return (
    <div>
      {/* <SignIn /> */}
      <BrowserRouter>
        <Navbar />
        <div className=" pt-[72px] flex flex-row w-full">
          <Sildebar />
          <Dropdown />
          <Routes>
            <Route path="/Home" element={<Landing />} />
            <Route path="/Explore" element={<Explore />} />
            <Route path="/Upload" element={<Upload />} />
            <Route path="/Team" element={<Team />} />
            <Route path="/Login" element={<Login />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
