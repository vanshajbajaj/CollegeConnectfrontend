import "./App.css";
import "./output.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useState } from "react";

import Header from "./Components/Header/js/Header";
import Tab from "./Components/Tab/js/Tab";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import MatchList from "./pages/MatchList";
import MatchProfile from "./pages/MatchProfile";
import EditProfile from "./Components/EditProfile/js/EditProfile";
import { useContext, useEffect } from "react";

import axios from "axios";
import { AuthContext } from "./Context/AuthContext";
import Loader from "./Components/Loader/Loader";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Page />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/matchlist" element={<MatchList />} />
        <Route path="/matchprofile/:id" element={<MatchProfile />} />
        <Route path="/edit" element={<EditProfile />} />
      </Routes>
      <Tab />
    </div>
  );
}

function Page() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showLogo, setShowLogo] = useState(true);

  useEffect(() => {
    const test = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/test", {
          withCredentials: true,
          credentials: "include",
        });

        console.log(response);

        if (response.status === 200) {
          console.log("Authorized");
          navigate("/home");

          // const timeout1 = setTimeout(() => {
          //   setShowLogo(false);
          // }, 2000);
      
          // const timeout2 = setTimeout(() => {
          //   navigate("/home");
          // }, 4000);
      
          // return () => {
          //   clearTimeout(timeout1);
          //   clearTimeout(timeout2);
          // };

        }
      } catch (err) {
        if (err && err.response && err.response.status === 401) {
          console.log("Unauthorized");
          logout();

          const timeout1 = setTimeout(() => {
            setShowLogo(false);
          }, 2000);

          const timeout2 = setTimeout(() => {
            navigate("/login");
          }, 3000);

          return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
          };

        }
      }
    };

    test();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={`h-[72vh] flex flex-col justify-center items-center w-4xl px-4 bg-orannge-700 box-border text-4xl logo-container`}>
      {/* <Loader /> */}
      <div class="sign">
        <span class="fast-flicker">C</span>ollege<span class="flicker">C</span>onnect
      </div>
    </div>
  );
}

export default App;
