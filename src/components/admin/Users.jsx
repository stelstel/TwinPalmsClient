import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Users.css";
import "../createuser/Lists.css";
import axios from "axios";
import { FormatAlignRight } from "@material-ui/icons";

function Users() {
  const url = "https://localhost:44306/api/Users";
  const [users, setUsers] = useState();
  const [searchTerm, setSearchterm] = useState("");

  const sendGetRequest = async (url) => {
    try {
      const res = await axios.get(url);
      console.log(res.data);
      console.log("successfull get request");
      setUsers(res.data);
    } catch (err) {
      // Handle Error Here
      console.log("error with get request for users");
      console.error(err);
    }
  };
  useEffect(() => {
    sendGetRequest(url);
  }, []);

  return (
    <div
      style={{ display: "flex", backgroundColor: "white" }}
      className="users-container"
    >
      <div>
        <input
          onChange={(e) => {
            setSearchterm(e.target.value);
          }}
          className="users-input"
          type="text"
          placeholder="Search"
        />
        <i className="fas fa-search"></i>
      </div>
      <h1>Admin</h1>
      {users &&
        users
          .filter(
            (u) => !u.roles.includes("SuperAdmin") && u.roles.includes("Admin")
          )
          .filter((val) => {
            if (searchTerm === "") {
              return val;
            } else if (
              val.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
              val.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
              val.email.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
            return null;
          })

          .map((val, key) => {
            return (
              <div key={key} className="users-userlist-container">
                <div className="users-user">
                  <img
                    className="users-avatar"
                    src="/images/user.png"
                    alt="user"
                  />
                  <div>
                    <div className="users-name">
                      <p className="users-paragraph">{val.firstName}</p>
                      <p className="users-paragraph">{val.lastName}</p>
                    </div>
                    <p className="users-paragraph users-email">{val.email}</p>
                  </div>
                  <div style={{ FormatAlignRight }}>
                    {val.companies.map((c) => c.name).join(", ")}
                  </div>
                </div>
                <div className="users-buttons">
                  <Link to={`/edit/${val.id}`}>
                    <i className="fas fa-edit"></i>
                  </Link>
                  <i className="fas fa-trash-alt"></i>
                </div>
              </div>
            );
          })}
      <h1>Basic users</h1>
      {users &&
        users
          .filter((u) => !u.roles.includes("Admin"))
          .filter((val) => {
            if (searchTerm === "") {
              return val;
            } else if (
              val.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
              val.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
              val.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
              val.outlets
                .map((outlet) => outlet.name.toLowerCase())
                .includes(searchTerm.toLowerCase())
            ) {
              return val;
            }

            return null;
          })

          .map((val, key) => {
            return (
              <div key={key} className="users-userlist-container">
                <div className="users-user">
                  <img
                    className="users-avatar"
                    src="/images/user.png"
                    alt="user"
                  />
                  <div>
                    <div className="users-name">
                      <p className="users-paragraph">{val.firstName}</p>
                      <p className="users-paragraph">{val.lastName}</p>
                    </div>
                    <p className="users-paragraph users-email">{val.email}</p>
                  </div>
                  <div>
                    <p>{val.outlets.map((o) => o.name).join(", ")}</p>
                  </div>
                </div>
                <div className="users-buttons">
                  <Link to={`/edit/${val.id}`}>
                    <i className="fas fa-edit"></i>
                  </Link>

                  <i
                    onClick={() => alert("Delete user?")}
                    className="fas fa-trash-alt"
                  ></i>
                </div>
              </div>
            );
          })}
    </div>
  );
}

export default Users;
