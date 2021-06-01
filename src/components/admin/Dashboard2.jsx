import React from "react";
import MultiStepForm from "../report/MultiStepForm";
import DataReport from "../DataReports/DataReports";
import Dashboard from "./Dashboard";
export default function Dashboard2(user) {
  return (
    <div>
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
        <MultiStepForm />
      )}
    </div>
  );
}
