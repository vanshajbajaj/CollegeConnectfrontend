import { ProgressBar } from "@tremor/react";
import React, { useState, useEffect, useContext } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import CheckIcon from "@mui/icons-material/Check";
import { AuthContext } from "../Context/AuthContext";
import { getProfile, swipeCalled } from "../requests/api";
import Loader from "../Components/Loader/Loader";

import { useNavigate } from "react-router-dom";

function Home() {
  const [userList, setUserList] = useState([]);
  const [dataFetching, setDataFetching] = useState(false);

  const { logout } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setDataFetching(true);
      try {
        const data = await getProfile();
        setUserList(data);
      } catch (err) {
        console.error(err);
        if (err.response.status === 401) {
          logout();
          navigate("/login");
        }
      }
      setDataFetching(false);
    };

    fetchData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //will be called whenever like or dislike is clicked
  const handleAction = async (isLike) => {
    setDataFetching(true);

    try {
      const data = await swipeCalled(userList[0].id, isLike);

      setUserList(data);
    } catch (err) {
      console.error(err);
      if (err.response.status === 401) {
        logout();
        navigate("/login");
      }
    }

    setDataFetching(false);
  };

  const handleDisliked = async () => {
    await handleAction(false);
  };

  const handleLiked = async () => {
    await handleAction(true);
  };

  // To do: Change it to just normal object structure instead of array
  const currentUser = userList.length ? userList[0] : null;

  return (
    <div className="main-component px-4 box-border">
      <div
        className={`flex flex-col gap-4 w-full min-h-[10rem] px-5 py-4 rounded-md box-border ${
          !dataFetching && "bg-[#1b1b1b]/40"
        }`}
      >
        {dataFetching ? (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <Loader />
          </div>
        ) : (
          currentUser && (
            <>
              <div className="px-5 py-2 bg-zinc-900 rounded-2xl flex flex-row">
                {/* Progress Bar */}
                <ProgressBar
                  percentageValue={currentUser.compatibilityScore}
                  color="fuchsia"
                  className=""
                />
                <p className="font-medium ml-4">
                  {currentUser.compatibilityScore}%{" "}
                </p>
              </div>

              <div>
                {/* Image And Accept Decline */}
                <div className="relative w-full">
                  <img
                    className="rounded-lg max-h-[25rem] w-full object-cover object-top"
                    src={
                      currentUser.image ||
                      "https://images.unsplash.com/photo-1594409855476-29909f35c73c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80"
                    }
                    alt=""
                  />
                  <div className="absolute bottom-8 flex justify-center gap-4 w-full">
                    <button
                      className=" bg-black/80 rounded-full"
                      onClick={handleDisliked}
                      // disabled={true}
                    >
                      <ClearIcon sx={{ fontSize: "4rem" }} />
                    </button>
                    <button
                      className=" bg-black/80 rounded-full"
                      onClick={handleLiked}
                      // disabled={isDisabled}
                    >
                      <CheckIcon sx={{ fontSize: "4rem" }} />
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="font-bold text-[1.4rem] mx-2">
                    {currentUser.name}
                  </p>
                  {/* <div className="flex flex-row flex-wrap">
                  {currentUser.interest.map((item, index) => {
                    return (
                      <div
                        key={index}
                        style={{
                          background:
                            "linear-gradient(166deg, rgba(224,94,249,1) 12%, rgba(236,72,174,1) 84%)",
                        }}
                        className="text-[14px] mx-2 my-2 px-5 rounded-xl font-medium "
                      >
                        {item}
                      </div>
                    );
                  })}
                </div> */}
                </div>
              </div>
            </>
          )
        )}
        {!currentUser && !dataFetching && (
          <div className="flex flex-col items-center justify-center w-full h-full">
            <p className="text-2xl font-bold text-white">No more users</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
