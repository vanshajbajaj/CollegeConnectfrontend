import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./../css/Tab.css";
import { AuthContext } from "../../../Context/AuthContext";

const Tab = () => {
  const { user } = useContext(AuthContext);

  return (
    <div id="tabmain">
      <div id="tabmid">
        <Link className="tabopt" to={user ? "/home" : "/"}>
          <i className="flinks zmdi zmdi-home"></i>
        </Link>
        {!user && (
          <>
            <Link className="tabopt" to="/signup">
              <i className="flinks zmdi zmdi-accounts-add"></i>
            </Link>
            <Link className="tabopt" to="/login">
              <i className="flinks zmdi zmdi-account"></i>
            </Link>
          </>
        )}
        {user && (
          <>
            <Link className="tabopt" to="/matchlist">
              <i className="flinks zmdi zmdi-accounts-list"></i>
            </Link>
            <Link className="tabopt" to="/profile">
              <i className="flinks zmdi zmdi-account"></i>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Tab;
