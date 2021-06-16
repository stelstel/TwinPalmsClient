import React, { useState, useContext } from "react";
import axios from "axios";
import "../../App.css";
import ChangePassword from "../authentication/ChangePassword";
import MultiReport from "../report/MultiStepForm";
import RoomReport from "../report/RoomReportForm";
import "./Home.css";
import "../admin/Dashboard.css";
import { Button } from "./Button";

import { UserContext } from "../../App";

function UserHome() {
  const user = useContext(UserContext);
  console.log("User ", user);

  const [activeChild, setActiveChild] = useState({
    changePassword: false,
    multiReport: false,
    roomReport: false,
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

  return (
    <>
      <main className="dashboard-object-container">
        <Button
          onClick={() =>
            setActiveChild({
              ...activeChild,
              multiReport: true,
              roomReport: false,
              changePassword: false,
            })
          }
        >
          <i className="fas fa-users-cog"></i>
          <p>Create Daily Report</p>
        </Button>
        <Button
          onClick={() =>
            setActiveChild({
              ...activeChild,
              changePassword: true,
              roomReport: false,
              multiReport: false,
            })
          }
        >
          <i className="fas fa-icons"></i>
          <p>Change password</p>
        </Button>
        <Button
          onClick={() =>
            setActiveChild({
              ...activeChild,
              roomReport: true,
              multiReport: false,
              changePassword: false,
            })
          }
        >
          <i className="fas fa-cog"></i>
          <p>Create RoomReport</p>
        </Button>
      </main>
      {activeChild.changePassword === true && (
        <ChangePassword onSubmitFunction={handleChangePassword} />
      )}
      {activeChild.multiReport === true && <MultiReport />}
      {activeChild.roomReport === true && <RoomReport user={user} />}
    </>
  );
}

export default UserHome;
