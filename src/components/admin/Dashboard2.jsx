import React from "react";

export default function Dashboard2(user) {
  return (
    <div>
      <h2>Dashboard</h2>
      {user.userName}
      <hr />
      {Array.isArray(user.roles)
        ? user.roles.map((role) => <li>{role}</li>)
        : user.roles}
    </div>
  );
}
