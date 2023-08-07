import instance from "./config";

export const doLogin = async (email, password) => {
  try {
    const response = await instance.post("/login", {
      email,
      password,
    });

    return response.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const doSignup = async (userInfo) => {
  try {
    const response = await instance.post("/signup", userInfo);

    return response.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const doLogout = async () => {
  try {
    const response = await instance.get("/logout");

    return response.data;
  } catch (err) {
    console.error(err);
    return err;
  }
};
