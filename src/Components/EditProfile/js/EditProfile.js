import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import { useRef } from "react";
import { editUser } from "../../../requests/api";
import "./../css/EditProfile.css";

const EditProfile = () => {
  const context = useContext(AuthContext);
  const { user, logout, setUser } = context;

  const navigate = useNavigate();

  const [presentUser, setPresentUser] = useState({
    name: user?.name,
    description: user?.description,
    handleType: user?.handleType,
    handle: user?.handle,
    sexuality: user?.sexuality,
    preferredSexuality: user?.preferredSexuality,
    year: user?.year,
    image: user?.image,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPresentUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const fileInputRef = useRef(null);

  const handleImageClick = () => {
    // Trigger the file input dialog
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      setPresentUser((prevUser) => ({ ...prevUser, image: e.target.result }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleApplyChanges = async () => {
    try {
      await editUser(presentUser);
      setUser((prevUser) => ({ ...prevUser, ...presentUser }));
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
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
    <div id="editprofilemain">
      <div id="editpic">
        <div id="profilepic">
          {/* <img src={presentUser.image}></img> */}
          <div className="image-container">
            <img
              src={presentUser.image}
              alt="Profile"
              onClick={handleImageClick}
            />
            <div className="edit-overlay" onClick={handleImageClick}>
              Upload
            </div>
            <input
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              ref={fileInputRef}
              onChange={handleImageChange}
            />
          </div>
        </div>
      </div>

      <div id="editcontent">
        <div className="contentdiv">
          <div className="contenthead">Username</div>
          <span className="contentmid"></span>
          <div className="contentval">
            <input
              className="inpfield"
              type="text"
              name="name"
              value={presentUser.name}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="contentdiv">
          <div className="contenthead">Description</div>
          <span className="contentmid"></span>
          <div className="contentval">
            <input
              className="inpfield"
              type="textarea"
              name="description"
              placeholder="maxlimit = 20 words"
              value={presentUser.description}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="contentdiv">
          <div className="contenthead">Preferred Gender</div>
          <span className="contentmid"></span>
          <div className="contentval">
            {/* <input className="inpfield" type='text' name='preferredSexuality' value={presentUser.preferredSexuality} onChange={handleChange}/> */}
            <select
              value={presentUser.preferredSexuality}
              name="preferredSexuality"
              onChange={handleChange}
              className="inpfield py-1 px-2 h-10 w-full bg-[#1b1b1b7c] text-white border-0 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Prefer not to say</option>
            </select>
          </div>
        </div>

        <div className="contentdiv">
          <div className="contenthead">Year</div>
          <span className="contentmid"></span>
          <div className="contentval">
            <input
              className="inpfield"
              type="text"
              name="year"
              value={presentUser.year}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="contentdiv">
          <div className="contenthead">Handle Type</div>
          <span className="contentmid"></span>
          <div className="contentval">
            <select
              className="fa-select py-1 px-2 h-10 w-min bg-black text-[#b4b4b4] border-y-2 border-l-2 border-r-2 border-300 rounded-l-md rounded-r-md focus:outline-none focus:border-blue-500"
              // className="inpfield"
              name="handleType"
              value={presentUser.handleType}
              onChange={handleChange}
            >
              <option value="whatsapp">&#xf232;</option>
              <option value="instagram">&#xf16d;</option>
              <option value="facebook">&#xf09a;</option>
              <option value="twitter">&#xf099;</option>
              <option value="snapchat">&#xf2ab;</option>
            </select>
            {/* <input className="inpfield" type='text' name='uname' value={presentUser.handleType} /> */}
          </div>
        </div>

        <div className="contentdiv">
          <div className="contenthead">Handle</div>
          <span className="contentmid"></span>
          <div className="contentval">
            <input
              className="inpfield"
              type="text"
              name="handle"
              value={presentUser.handle}
              onChange={handleChange}
            />
          </div>
        </div>

        <div id="submitcontent">
          <button id="editbt" onClick={handleApplyChanges}>
            Apply Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
