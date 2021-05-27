import React, { useState } from "react";
import axios from "axios";
import "../../App.css";
import Login from "../authentication/Login";
import ChangePassword from "../authentication/ChangePassword";
import "./Home.css";

function UserHome() {
  const [state, setState] = useState({
    outlets: [],
    hotels: [],
    token: "",
  });
  const handleChangePassword = async (e) => {
    e.preventDefault();
    let passwords = {
      currentPassword: e.target["currentPassword"].value,
      newPassword: e.target["newPassword"].value,
    };
    try {
      const res = await axios.post(
        "https://localhost:44306/api/authentication/change-password",
        passwords,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      console.log(res.data);

      console.log("successfull post request");
      alert("Password changed!");
    } catch (err) {
      // Handle Error Here
      console.error("Error: ", err);
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    let credentials = {
      username: e.target["username"].value,
      password: e.target["password"].value,
    };
    try {
      const res = await axios.post(
        "https://localhost:44306/api/authentication/login",
        credentials
      );
      console.log(res.data);
      setState({
        ...state,
        token: res.data.token,
        outlets: res.data.outlets,
        hotels: res.data.hotels,
      });
      console.log("successfull post request");
      console.log("state: ", state);
    } catch (err) {
      // Handle Error Here
      console.error("Error: ", err);
    }
  };
  return (
    <>
      <Login onSubmitFunction={handleLogin} />
      <ChangePassword onSubmitFunction={handleChangePassword} />
    </>
  );
}

export default UserHome;
