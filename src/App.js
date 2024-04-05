import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";

import Landing from "./components/Landing/Landing";
import { SignUp } from "./pages/signup/Signup";
import "./output.css"

function App() {
  return (
    <>
      {/* <SignIn /> */}
      <BrowserRouter> 
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing />} />
          
          <Route path="/signup" element={<SignUp />} />
        </Routes> 
      </BrowserRouter>
    </>
  );
}

export default App;
