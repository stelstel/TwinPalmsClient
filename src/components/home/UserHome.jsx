import React, { useState } from "react";
import axios from "axios";
import "../../App.css";
import Login from "../authentication/Login2";
import ChangePassword from "../authentication/ChangePassword";
import "./Home.css";

function UserHome() {
  // This should be useContext ?
  const [user, setUser] = useState({
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

    await axios
      .post(
        "https://localhost:44306/api/authentication/change-password",
        passwords,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then(() =>
        alert("Password changed!").catch((err) => console.error("Error: ", err))
      );
  };
  // HANDLE LOGIN

  const handleLogin = async (e) => {
    e.preventDefault();
    let credentials = {
      username: e.target["username"].value,
      password: e.target["password"].value,
    };

    const res = await axios
      .post("https://localhost:44306/api/authentication/login", credentials)
      .then(({ data }) => {
        setUser({
          ...user,
          token: data.token,
          outlets: data.outlets,
          hotels: data.hotels,
        });
        console.log(res.data);
        console.log("user: ", user);
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  };

  return (
    <>
      <Login onSubmitFunction={handleLogin} />
      <ChangePassword onSubmitFunction={handleChangePassword} />
    </>
  );
}

export default UserHome;
