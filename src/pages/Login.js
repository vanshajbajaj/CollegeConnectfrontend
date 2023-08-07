import { useEffect, useState, useContext } from "react";
import Input from "../Components/Input/Input";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

const Validation = {
  values: ["email", "password"],
  email: (value) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(value);
  },
  password: (value) => {
    return value.length >= 8;
  },
};

const Login = () => {
  const { user, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [isValid, setIsValid] = useState({
    email: false,
    password: false,
  });

  const [isDisabled, setIsDisabled] = useState(true);

  const setUserInput = (id, value) => {
    setUserInfo((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    setIsValid((prevState) => ({
      ...prevState,
      [id]: Validation[id](value),
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        userInfo,
        {
          withCredentials: true,
          credentials: "include",
        }
      );

      if (response.status === 200) {
        login(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user) {
      console.log(user);
      navigate("/home");
    }
  }, [user, navigate]);

  useEffect(() => {
    setIsDisabled(Validation.values.some((id) => !isValid[id]));
  }, [isValid]);

  return (
    <div className="main-component">
      <div className="flex flex-col items-start justify-center w-full p-8 box-border text-white">
        <h1 className="mb-8 text-3xl font-bold">Login</h1>
        <div className="flex flex-col items-start justify-center gap-6 w-full">
          <Input
            id="email"
            label="Email"
            value={userInfo.email}
            onChange={(value) => setUserInput("email", value)}
            isValid={isValid.email}
            className="flex flex-col items-start gap-2 w-full text-black"
          />
          <Input
            id="password"
            label="Password"
            type="password"
            value={userInfo.password}
            onChange={(value) => setUserInput("password", value)}
            isValid={isValid.password}
            className="flex flex-col items-start gap-2 w-full text-black"
          />
        </div>
        <div className="flex flex-col items-center justify-center mt-8 w-full">
          <button
            className={`w-full px-4 py-2 text-xl font-bold text-white rounded-md ${
              isDisabled ? "bg-gray-500" : "bg-fuchsia-500"
            }`}
            onClick={handleSubmit}
            disabled={isDisabled}
          >
            Login
          </button>
        </div>
        <p className="mt-2 text-lg">
          Don't have an account?{" "}
          <Link to="/signup" className="text-fuchsia-500">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
