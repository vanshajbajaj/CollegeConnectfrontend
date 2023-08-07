import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../Components/Input/Input";
import ClearIcon from "@mui/icons-material/Clear";
import "./../Styles/SignUp.css";

import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

const RegistrationType = {
  QUESTIONS: "questions",
  SIGNUP: "signup",
};

const SignUpComponents = {
  INITIALS: "initials",
  KUNDLI: "kundli",
  PREFERENCES: "preferences",
  POSTER: "poster",
  NEXT_SECTION: "nextSection",
  getInitials: () => {
    return ["name", "email", "phone", "password"];
  },
  getKundli: () => {
    return ["handle", "sexuality", "dob"];
  },
  getPreferences: () => {
    return ["year", "branch", "preferredSexuality"];
  },
};

const Validation = {
  name: /\w{3,}/,
  email: /[\w.]+@chitkara.edu.in/,
  phone: /\d{10}/,
  password: /.{8,}/,
  handleType: /(whatsapp|instagram|facebook|twitter|snapchat)/,
  handle: /\w{3,}/,
  sexuality: /(male|female|other)/,
  dob: /\d{4}-\d{2}-\d{2}/,
  year: /\d+/,
  branch: /\w+/,
  preferredSexuality: /(male|female|other)/,
  image: /.+/,
};

// const getRequestUrl = (handleType, handle) => {
//   switch (handleType) {
//     case "instagram":
//       return `https://www.instagram.com/${handle}/?__a=1`;
//     case "facebook":
//       return `https://www.facebook.com/${handle}`;
//     case "twitter":
//       return `https://www.twitter.com/${handle}`;
//     case "snapchat":
//       return `https://www.snapchat.com/${handle}`;
//     default:
//       return "";
//   }
// };

const SignUp = () => {
  const [questions, setQuestions] = useState([]);
  const [registrationType, setRegistrationType] = useState(
    RegistrationType.SIGNUP
  );
  const [signupComponent, setSignupComponent] = useState(
    SignUpComponents.INITIALS
  );
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const navigate = useNavigate();

  const context = useContext(AuthContext);

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    handleType: "whatsapp",
    handle: "",
    sexuality: "male",
    dob: "",
    year: "",
    branch: "",
    preferredSexuality: "female",
    image: "",
  });

  const [isValid, setIsValid] = useState({
    name: false,
    email: false,
    phone: false,
    password: false,
    handleType: true,
    handle: true,
    sexuality: true,
    dob: false,
    year: false,
    branch: false,
    preferredSexuality: true,
    image: false,
  });

  const [interests, setInterests] = useState({});

  // const [isHandleInputTouched, setIsHandleInputTouched] = useState(false);

  // const [isHandleActive, setIsHandleActive] = useState(false);

  const setUserInput = (key, value) => {
    setUserInfo((prev) => ({
      ...prev,
      [key]: value,
    }));

    setIsValid((prev) => ({
      ...prev,
      [key]: Validation[key].test(value),
    }));
  };

  // useEffect(() => {
  //   // handle request should not be made for every little change in the handle input
  //   let timeoutId;

  //   if (isHandleInputTouched && isHandleActive) {
  //     if (userInfo.handleType === "whatsapp") {
  //       setIsValid((prev) => ({
  //         ...prev,
  //         handle: Validation.phone.test(userInfo.handle),
  //       }));
  //     } else {
  //       // make a request to the server to check if the handle is valid with a debounce of 500ms
  //       const requestUrl = getRequestUrl(userInfo.handleType, userInfo.handle);
  //       timeoutId = setTimeout(() => {
  //         axios
  //           .get(requestUrl)
  //           .then((response) => {
  //             setIsValid((prev) => ({
  //               ...prev,
  //               handle: response.status === 200,
  //             }));
  //           })
  //           .catch((error) => {
  //             setIsValid((prev) => ({
  //               ...prev,
  //               handle: false,
  //             }));
  //           });
  //       }, 500);
  //     }
  //   }

  //   return () => {
  //     clearTimeout(timeoutId);
  //   };
  // }, [
  //   userInfo.handleType,
  //   userInfo.handle,
  //   isHandleInputTouched,
  //   isHandleActive,
  // ]);

  // const setHandle = (event) => {
  //   setUserInput("handle", event.target.value);
  //   setIsHandleInputTouched(true);
  //   setIsHandleActive(true);
  // };

  const handleOptionSelect = (optionId) => {
    setInterests((prev) => ({
      ...prev,
      [currentQuestionIndex]: optionId,
    }));
  };

  const handleImageInputClick = (event) => {
    // imageRef.current.click();
    // after taking the input convert the image into base64 and store it in the userInfo and also make it the background image of the div

    const file = event.target.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      setUserInput("image", reader.result);
    };

    reader.readAsDataURL(file);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/questions")
      .then((response) => {
        const ques = response.data.map((question) => ({
          ...question,
          options: question.options.map((option, index) => ({
            id: index,
            text: option,
          })),
        }));
        setQuestions(ques);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    if (localStorage.getItem("user") !== null) {
      navigate("/home");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNextClick = () => {
    if (registrationType === RegistrationType.SIGNUP) {
      switch (signupComponent) {
        case SignUpComponents.INITIALS:
          setSignupComponent(SignUpComponents.KUNDLI);
          break;
        case SignUpComponents.KUNDLI:
          setSignupComponent(SignUpComponents.PREFERENCES);
          break;
        case SignUpComponents.PREFERENCES:
          setSignupComponent(SignUpComponents.POSTER);
          break;
        case SignUpComponents.POSTER:
          setSignupComponent(SignUpComponents.NEXT_SECTION);
          break;
        case SignUpComponents.NEXT_SECTION:
          setRegistrationType(RegistrationType.QUESTIONS);
          break;
        default:
          break;
      }
    } else if (registrationType === RegistrationType.QUESTIONS) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleBackClick = () => {
    if (registrationType === RegistrationType.SIGNUP) {
      switch (signupComponent) {
        case SignUpComponents.KUNDLI:
          setSignupComponent(SignUpComponents.INITIALS);
          break;
        case SignUpComponents.PREFERENCES:
          setSignupComponent(SignUpComponents.KUNDLI);
          break;
        case SignUpComponents.POSTER:
          setSignupComponent(SignUpComponents.PREFERENCES);
          break;
        case SignUpComponents.NEXT_SECTION:
          setSignupComponent(SignUpComponents.POSTER);
          break;
        default:
          break;
      }
    } else if (registrationType === RegistrationType.QUESTIONS) {
      if (currentQuestionIndex === 0) {
        setRegistrationType(RegistrationType.SIGNUP);
        setSignupComponent(SignUpComponents.NEXT_SECTION);
      } else {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
      }
    }
  };

  const handleSubmit = () => {
    // mapping interests array with the question ids
    const interestsArray = questions.map((question, index) => {
      return {
        question: question.id,
        option: interests[index],
      };
    });
    console.log({
      ...userInfo,
      interests: interestsArray,
    });
    // make a request to the server to register the user or show an error

    axios
      .post("http://localhost:8000/api/register", {
        ...userInfo,
        interests: interestsArray,
      })
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const currentQuestion = questions[currentQuestionIndex];

  const isDisabled = (() => {
    if (registrationType === RegistrationType.SIGNUP) {
      switch (signupComponent) {
        case SignUpComponents.INITIALS:
          return SignUpComponents.getInitials().some(
            (key) => isValid[key] === false
          );
        case SignUpComponents.KUNDLI:
          return SignUpComponents.getKundli().some(
            (key) => isValid[key] === false
          );
        case SignUpComponents.PREFERENCES:
          return SignUpComponents.getPreferences().some(
            (key) => isValid[key] === false
          );
        case SignUpComponents.POSTER:
          return isValid.image === false;
        default:
          return false;
      }
    } else if (registrationType === RegistrationType.QUESTIONS) {
      return (
        interests[currentQuestionIndex] === undefined ||
        interests[currentQuestionIndex] === null
      );
    }
  })();

  return (
    <div className="main-component">
      {registrationType === RegistrationType.SIGNUP && (
        <div className="flex flex-col items-start justify-center w-full p-8 box-border text-white">
          <h1 className="mb-8 text-3xl font-bold">Sign Up</h1>
          <div className="flex flex-col items-start justify-center gap-6 w-full">
            {signupComponent === SignUpComponents.INITIALS && (
              <>
                <Input
                  id="name"
                  label="Name"
                  value={userInfo.name}
                  onChange={(value) => setUserInput("name", value)}
                  isValid={isValid.name}
                  className="flex flex-col items-start gap-2 w-full text-black"
                />
                <Input
                  id="email"
                  label="Email"
                  value={userInfo.email}
                  onChange={(value) => setUserInput("email", value)}
                  isValid={isValid.email}
                  className="flex flex-col items-start gap-2 w-full text-black"
                />
                <Input
                  id="phone"
                  label="Phone"
                  value={userInfo.phone}
                  onChange={(value) => setUserInput("phone", value)}
                  isValid={isValid.phone}
                  className="flex flex-col items-start gap-2 w-full text-black"
                />
                <Input
                  id="password"
                  label="Password"
                  value={userInfo.password}
                  onChange={(value) => setUserInput("password", value)}
                  isValid={isValid.password}
                  className="flex flex-col items-start gap-2 w-full text-black"
                />
              </>
            )}
            {signupComponent === SignUpComponents.KUNDLI && (
              <>
                <div className="flex flex-col items-start gap-2 w-full">
                  <label
                    htmlFor="handle"
                    className="text-lg font-bold text-gray-300"
                  >
                    Handle
                  </label>
                  <div className="flex items-start justify-center w-full">
                    {/* This div will contain a select and input coupled together to collect the mode of connectivity, like Whatsapp - Phone, Instagram - Handle, Facebook - Handle, Twitter - Handle, Snapchat - Handle */}
                    <select
                      className="fa-select py-1 px-2 h-10 w-min bg-[#1b1b1b7c] text-white border-y-2 border-l-2 border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500"
                      value={userInfo.handleType}
                      onChange={(event) => {
                        setUserInput("handleType", event.target.value);
                      }}
                    >
                      <option value="whatsapp">&#xf232;</option>
                      <option value="instagram">&#xf16d;</option>
                      <option value="facebook">&#xf09a;</option>
                      <option value="twitter">&#xf099;</option>
                      <option value="snapchat">&#xf2ab;</option>
                    </select>
                    <input
                      type="text"
                      id="handle"
                      value={userInfo.handle}
                      onChange={(event) =>
                        setUserInput("handle", event.target.value)
                      }
                      className="py-1 px-2 h-10 w-full bg-[#1b1b1b7c] text-white border-y-2 border-r-2 border-gray-300 rounded-r-md focus:outline-none focus:border-blue-500"
                    />
                  </div>
                </div>

                {/* Sexuality */}
                <div className="flex flex-col items-start gap-2 w-full">
                  <label
                    htmlFor="sexuality"
                    className="text-lg font-bold text-gray-300"
                  >
                    Sexuality
                  </label>
                  <select
                    id="sexuality"
                    value={userInfo.sexuality}
                    onChange={(event) =>
                      setUserInput("sexuality", event.target.value)
                    }
                    className="py-1 px-2 h-10 w-full bg-[#1b1b1b7c] text-white border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Prefer not to say</option>
                  </select>
                </div>

                <Input
                  id="dob"
                  label="Date of Birth"
                  value={userInfo.dob}
                  onChange={(value) => setUserInput("dob", value)}
                  isValid={isValid.dob}
                  className="flex flex-col items-start gap-2 w-full"
                  type="date"
                />
              </>
            )}
            {signupComponent === SignUpComponents.PREFERENCES && (
              <>
                <div className="flex flex-col items-start gap-2 w-full">
                  <Input
                    id="year"
                    label="Year"
                    value={userInfo.year}
                    onChange={(value) => setUserInput("year", value)}
                    isValid={isValid.year}
                    className="flex flex-col items-start gap-2 w-full"
                  />
                  <Input
                    id="branch"
                    label="Branch"
                    value={userInfo.branch}
                    onChange={(value) => setUserInput("branch", value)}
                    isValid={isValid.branch}
                    className="flex flex-col items-start gap-2 w-full"
                  />
                  {/* Preferred Sexuality */}
                  <div className="flex flex-col items-start gap-2 w-full">
                    <label
                      htmlFor="preferredSexuality"
                      className="text-lg font-bold text-gray-300"
                    >
                      Preferred Sexuality
                    </label>
                    <select
                      id="preferredSexuality"
                      value={userInfo.preferredSexuality}
                      onChange={(event) =>
                        setUserInput("preferredSexuality", event.target.value)
                      }
                      className="py-1 px-2 h-10 w-full bg-[#1b1b1b7c] text-white border-2 border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Prefer not to say</option>
                    </select>
                  </div>
                </div>
              </>
            )}
            {signupComponent === SignUpComponents.POSTER && (
              <div className="flex flex-col items-start gap-2 w-full">
                {/* It's image input but within a div which actually handles the input and even shows the image */}
                <div className="flex flex-col items-start justify-center gap-2 w-full">
                  <div className="flex items-center justify-center w-full max-h-[24rem] bg-[#1b1b1b7c] rounded-md">
                    <input
                      type="file"
                      id="poster"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageInputClick}
                    />
                    <label
                      htmlFor="poster"
                      className="relative flex items-center justify-center w-full h-full min-h-[10rem] text-lg font-bold text-gray-300 cursor-pointer"
                      // onClick={handleImageInputClick}
                    >
                      {userInfo.image ? (
                        <img
                          src={userInfo.image}
                          alt=""
                          className="w-full h-full object-cover rounded-md"
                        />
                      ) : (
                        "Upload Profile"
                      )}
                      {userInfo.image && (
                        <button
                          type="button"
                          className="absolute flex justify-center items-center -top-3 -right-3 w-8 h-8 bg-red-600 rounded-full"
                          onClick={(event) => {
                            event.preventDefault();
                            setUserInput("image", "");
                          }}
                        >
                          <ClearIcon className="w-full h-full" />
                        </button>
                      )}
                    </label>
                  </div>
                </div>
              </div>
            )}
            {signupComponent === SignUpComponents.NEXT_SECTION && (
              <div className="flex flex-col items-start gap-2 w-full">
                <p className="text-lg font-bold text-gray-300">
                  What are your interests?
                </p>
              </div>
            )}
          </div>
        </div>
      )}
      {registrationType === RegistrationType.QUESTIONS && (
        <div className="question-box">
          <p className="text-[18px]">{currentQuestion.question}</p>
          <div className="options-container text-[18px]">
            {currentQuestion.options.map((option) => (
              <div
                key={option.id}
                className={`option ${
                  option.id === interests[currentQuestionIndex] && "selected"
                }`}
                onClick={() => handleOptionSelect(option.id)}
              >
                <input
                  type="radio"
                  id={option.id}
                  name="option"
                  value={option.id}
                  checked={option.id === interests[currentQuestionIndex]}
                  onChange={() => {}}
                />
                <label htmlFor={option.id}>{option.text}</label>
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex items-center justify-between gap-4 w-full px-8 box-border text-white">
        {(registrationType !== RegistrationType.SIGNUP ||
          signupComponent !== SignUpComponents.INITIALS) && (
          <button
            className="mr-auto px-4 py-2 text-black font-bold rounded-md bg-[rgb(224,94,249)]"
            onClick={handleBackClick}
          >
            Back
          </button>
        )}
        {(registrationType === RegistrationType.SIGNUP ||
          currentQuestionIndex !== questions.length - 1) && (
          <button
            className={`ml-auto px-4 py-2 text-black font-bold rounded-md ${
              !isDisabled ? "bg-[rgb(224,94,249)]" : "bg-gray-500"
            }`}
            onClick={handleNextClick}
            disabled={isDisabled}
          >
            Next
          </button>
        )}
        {registrationType === RegistrationType.QUESTIONS &&
          currentQuestionIndex === questions.length - 1 && (
            <button
              className={`ml-auto px-4 py-2 text-black font-bold rounded-md ${
                !isDisabled ? "bg-[rgb(224,94,249)]" : "bg-gray-500"
              }`}
              onClick={handleSubmit}
              disabled={isDisabled}
            >
              Sign Up
            </button>
          )}
      </div>
    </div>
  );
};

export default SignUp;
