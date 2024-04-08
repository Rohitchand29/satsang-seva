import { useState } from "react";
import { Link } from "react-router-dom";

export const Login = () => {
  const inputStyle =
    "outline-none w-full h-8 text-lg text-gray-700 border-gray-300 ps-1  border-b-2 font-semibold mb-2 text-gray-600  bg-gray-200 mb-4 ";
  // console.log(location.pathname);
  // if (location.pathname === "/login"){

  // }
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [conf, setConf] = useState("");
  const [vis, setVis] = useState("password");
  const [vis2, setVis2] = useState("password");

  return (
    <div className="flex justify-center ">
      <div className="shadow-gray-200 bg-gray-200 shadow-md border-black px-4 sm:px-16 py-6 rounded-xl ml-[18rem] mt-16">
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
        <form>
          <div>
            <p className="text-gray-800 text-2xl font-bold mb-4">Sign up</p>
            <input
              className={inputStyle}
              type="email"
              placeholder="Email..."
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <input
              className={inputStyle}
              type="text"
              placeholder="UserName..."
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <span className="flex">
              <input
                className={inputStyle}
                type={vis}
                placeholder="Password..."
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div
                className="inline "
                onClick={(e) => {
                  vis === "password" ? setVis("text") : setVis("password");
                }}
              >
                <span className="flex select-none justify-center material-symbols-outlined cursor-pointer">
                  {vis === "password" ? "visibility" : "visibility_off"}
                </span>
              </div>
            </span>
          </div>
          <div>
            <span className="flex">
              <input
                className={inputStyle}
                type={vis2}
                placeholder="Confirm Password..."
                name="password"
                value={conf}
                onChange={(e) => setConf(e.target.value)}
              />

              <div
                className="inline "
                onClick={(e) => {
                  vis2 === "password" ? setVis2("text") : setVis2("password");
                }}
              >
                <span className="flex select-none justify-center material-symbols-outlined cursor-pointer">
                  {vis2 === "password" ? "visibility" : "visibility_off"}
                </span>
              </div>
            </span>
          </div>
          <button
            className="mt-2 w-full bg-gray-700 py-2 rounded-xl text-white font-bold"
            type="submit"
          >
            LogIn
          </button>
          <p className="text-xs mt-2 font-extralight">
            Already have a Account?{" "}
            <Link className="text-blue-700" to="/signin">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
