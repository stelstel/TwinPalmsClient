
import React, { useContext } from "react";



import { Link } from "react-router-dom";
import "./Dashboard.css";
import { Button } from "./Button";

import { UserContext } from "../../App";
function Dashboard() {
  const user = useContext(UserContext);
  console.log("User from dashboard", user);


  return (
    <>
      <main className="dashboard-container">
        <div className="dashboard-object-container">
          <Link to="/manageusers">
            <Button>
              <i className="fas fa-users-cog"></i>
              <p>Manage users</p>
            </Button>
          </Link>
          <Link to="/events">
            <Button>
              <i className="fas fa-icons"></i>
              <p>Change events</p>
            </Button>
          </Link>
        </div>
      </main>
    </>
  );
}

export default Dashboard;
