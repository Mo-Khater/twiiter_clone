import axios from "axios";
import { showAlert } from "./alert";

export const login = async (email, password) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/login",
      data: {
        email,
        password,
      },
    });
    if (res.data.status === "succcess") {
      showAlert("success", "Logged in successfully!");
      window.setTimeout(() => {
        location.assign("/");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
export const signup = async (name, email, password, confirmpassword) => {
  try {
    const res = await axios({
      method: "POST",
      url: "/api/v1/users/register",
      data: {
        name,
        email,
        password,
        confirmpassword,
      },
    });
    if (res.data.status === "succcess") {
      showAlert("success", "register successfully!");
      window.setTimeout(() => {
        location.assign("/login");
      }, 1500);
    }
  } catch (err) {
    showAlert("error", err.response.data.message);
  }
};
export const logout = (email, password) => {};
