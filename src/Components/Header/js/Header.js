import React from "react";
import "./../css/Header.css";

const Header = () => {
  return (
    <div id="header-container">
      <div id="headermain">
        <span className="title">
          <span className="title-word title-word-1">COLLEGE</span>
          <span className="title-word title-word-2">CONNECT</span>
          {/* <span class="title-word title-word-3">my</span>
                    <span class="title-word title-word-4">text</span> */}
        </span>
      </div>
    </div>
  );
};

export default Header;
