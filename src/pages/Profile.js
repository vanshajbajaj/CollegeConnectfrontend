import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

import { doLogout } from "../requests/auth";

const fallBackUser = {
  name: "Username",
  email: "email",
  image: "https://i.pravatar.cc/150?img=68",
};

function Profile() {
  const { user, logout } = useContext(AuthContext);

  const navigate = useNavigate();

  const onLogout = async () => {
    try {
      const response = await doLogout();
      console.log(response);

      logout();
      navigate("/login");
    } catch (err) {
      console.error(err);
      if (err.response.status === 401) {
        logout();
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      navigate("/login");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="main-component flex justify-start items-start px-4 box-border text-white">
      {/* Head Profile Name and Profile */}
      <div className=" mx-3 my-5 flex flex-row ">
        <img
          src={user?.image || fallBackUser.image}
          alt={user?.name || fallBackUser.name}
          className="w-[100px] h-[100px] rounded-full object-cover"
        />
        <div className="mx-[20px] my-[30px] ">
          <p className="text-[20px] md:text-[20px]">
            {user?.name || fallBackUser.name}
          </p>
          <p className="text-[13px] md:text-[15px] font-medium text-[#9e9e9e]">
            {user?.email}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-start mx-5 my-5">
        <Link to="/edit" className="my-3">
          Edit Profile
        </Link>
        <Link to="/matchlist" className="my-3">
          Show Matches
        </Link>
        {/* <button className="my-3">My Details</button> */}
        <button onClick={onLogout} className="my-3">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Profile;
