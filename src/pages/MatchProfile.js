import React, { useEffect, useContext, useState } from "react";
// import { getMatches } from "../requests/api";
import { useParams } from "react-router-dom";

import { AuthContext } from "../Context/AuthContext";

import axios from "axios";
import Loader from "../Components/Loader/Loader";

function MatchProfile() {
  const params = useParams();
  const [userProfile, setUserProfile] = useState({});

  const [fetching, setFetching] = useState(false);

  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const test = async () => {
      setFetching(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/getMatchedProfile?userId=${params.id}`,
          {
            withCredentials: true,
            credentials: "include",
          }
        );

        console.log(response);

        if (response.status === 200) {
          console.log("Authorized");
          setUserProfile(response.data);
        }
      } catch (err) {
        if (err && err.response && err.response.status === 401) {
          console.log("Unauthorized");
          logout();
        }
      } finally {
        setFetching(false);
      }
    };

    test();
  }, []);

  // const data = ['h1', 'h2', 'h3'];
  return (
    <div>
      {fetching && <Loader />}
      {!fetching && (
        <>
          <div className=" my-2 flex flex-col mx-auto ">
            <img
              className="rounded-[5%] w-[100%] h-[100%] max-h-[20rem] object-cover object-center"
              src={userProfile.image}
              alt="profile"
            />
            <div
              style={{
                backgroundColor: "rgb(168 168 168 / 58%)",
                color: "white",
                transform: "translateY(-100%)",
              }}
              className="w-max"
            >
              <p className="text-black w-min mx-3 text-[20px] font-bold tracking-wider">
                {userProfile.name}
              </p>
            </div>
          </div>
          <div className="mt- mx-5">
            <p className="text-[18px] font-bold">Description</p>
            <p className="text-[14px] font-light">
              {userProfile.description || "They are a bit shy!"}
            </p>
          </div>
          <div className="my-5 mx-5 flex flex-col justify-between h-[100px]">
            <p className="text-[18px] font-bold">Details</p>
            {/* <p className="text-[15px] font-medium">Interests </p> */}
            {/* <div className="flex flex-row my-2">
          {userProfile.interest.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  background:
                    "linear-gradient(166deg, rgba(224,94,249,1) 12%, rgba(236,72,174,1) 84%)",
                }}
                className="text-[14px]  rounded-3xl mx-2 flex flex-row text-center px-5 justify-center font-light"
              >
                {item}
              </div>
            );
          })}
        </div> */}
            <div className="flex flex-row mt-2">
              <p className="text-[15px] font-medium">Branch :</p>
              <p className="mx-2 text-[15px] font-light">
                {userProfile.branch}
              </p>
            </div>

            <div className="flex flex-row">
              <p className="text-[15px] font-medium">Year :</p>
              <p className="mx-2 text-[15px] font-light">{userProfile.year}</p>
            </div>

            <div className="flex flex-row">
              <p className="text-[15px] font-medium capitalize">
                {userProfile.handleType} :
              </p>
              <p className="mx-2 text-[15px] font-light">
                {userProfile.handle}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default MatchProfile;
