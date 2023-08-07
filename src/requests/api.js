import instance from "./config";

export const editUser = async (userInfo) => {
  try {
    const response = await instance.post("/editUser", userInfo);

    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getProfile = async () => {
  try {
    const response = await instance.get("/getProfile");

    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const swipeCalled = async (userId, swipeStatus) => {
  try {
    const response = await instance.get(
      `/swipeCalled?userId=${userId}&swipeStatus=${swipeStatus}`
    );

    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getMatches = async () => {
  try {
    const response = await instance.get("/matches");

    return response.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
