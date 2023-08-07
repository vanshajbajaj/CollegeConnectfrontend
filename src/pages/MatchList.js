import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../Components/Loader/Loader";
import { getMatches } from "../requests/api";

import { AuthContext } from "../Context/AuthContext";

function MatchList() {
  const [matchList, setMatchList] = useState([]);
  const navigate = useNavigate();

  const [fetching, setFetching] = useState(false);

  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchMatches = async () => {
      setFetching(true);
      try {
        const data = await getMatches();
        setMatchList(data);
      } catch (err) {
        console.error(err);
        if (err.response.status === 401) {
          logout();
          navigate("/login");
        }
      } finally {
        setFetching(false);
      }
    };

    fetchMatches();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (localStorage.getItem("user") === null) {
      navigate("/login");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="flex flex-col items-center justify-center">
        {fetching && <Loader />}
        {!fetching &&
          matchList.map((data) => {
            return (
              <div key={data.id} className="w-full">
                <Link to={`/matchprofile/${data.id}`}>
                  <div className="flex flex-row mx-5 my-4  px-3 py-3 bg-white bg-opacity-10  rounded drop-shadow-lg">
                    <img
                      src={data.image}
                      alt={data.name}
                      className="w-[70px] rounded-md object-cover object-center"
                    />
                    <div className="mx-5 my-5 ">
                      <p className="text-[18px]">{data.name}</p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default MatchList;
