import React from "react";
import UserHome from "../home/UserHome";
import DataReport from "../DataReports/DataReports";

import Dashboard from "./Dashboard";

export default function Dashboard2(user) {
  console.log("User ", user);
  return (
    <>
      <h2>Dashboard</h2>
      {user.userName}
      <hr />
      {Array.isArray(user.roles)
        ? user.roles.map((role) => <li>{role}</li>)
        : user.roles}

      {user.roles.includes("SuperAdmin") ? (
        <Dashboard />
      ) : user.roles.includes("Admin") ? (
        <DataReport />
      ) : (
        <UserHome />
      )}
    </>
  );
}
