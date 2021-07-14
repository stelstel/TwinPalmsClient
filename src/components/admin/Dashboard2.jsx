import React from "react";
import Home from "../home/Home";
import DataReport from "../DataReports/DataReports";
import Dashboard from "./Dashboard";

export default function Dashboard2(user) {
  console.log("User ", user);
  return (
    <>
      {user.roles.includes("SuperAdmin") ? (
        <Dashboard />
      ) : user.roles.includes("Admin") ? (
        <DataReport />
      ) : (
        <Home />
      )}
    </>
  );
}
