import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

import Landing from "./components/Landing/Landing";
import { SignUp } from "./pages/signup/Signup";
import "./output.css";
import Sildebar from "./components/Sildebar/Sildebar";
import Dropdown from "./components/Dropdown/Dropdown";
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
            <Route path="/" element={<Landing />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
