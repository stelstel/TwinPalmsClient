import React, { useContext } from "react";
import axios from "axios";
import "../../App.css";
import ChangePassword from "../authentication/ChangePassword";
import MultiReport from "../report/MultiStepForm";
import "./Home.css";

import { UserContext } from "../../App";

function UserHome() {
  const user = useContext(UserContext);
  console.log("User ", user);
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

  return (
    <>
      <ChangePassword onSubmitFunction={handleChangePassword} />
      <MultiReport />
    </>
  );
}

export default UserHome;
