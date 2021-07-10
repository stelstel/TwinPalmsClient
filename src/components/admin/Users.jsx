import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Users.css";
import axios from "axios";

function Users() {
  const url = "https://localhost:44306/api/Users";
  const [users, setUsers] = useState();
  const [searchTerm, setSearchterm] = useState("");
  const [filterOnRoles, setFilterOnRoles] = useState({
    basic: {
      showUsers: true,
      radioBtnChecked: true
    },
    admin: {
      showUsers: true,
      radioBtnChecked: true
    }
  })
 

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
      style={{ display: "flex", backgroundColor: "white"  }}
      className="users-container"
    >
      <div className="role-filters">
        <div className="user-role">
          <span>Basic</span>
          <button
            className={`${filterOnRoles.basic.showUsers ? "toggle-users-active" : "toggle-users"}`}
            onClick={() => {
              setFilterOnRoles(prevState => {
                console.log(filterOnRoles)
                return { ...filterOnRoles, basic: { showUsers: !prevState.basic.showUsers, checked: !prevState.basic.radioBtnChecked }}
              })
            }} 
            ></button>
        </div>
        <div className="user-role">
          <span>Admin</span>
          <button 
            className={`${filterOnRoles.admin.showUsers ? "toggle-users-active" : "toggle-users"}`}
            onClick={() => {
              setFilterOnRoles(prevState => {
                return { ...filterOnRoles, admin: { showUsers: !prevState.admin.showUsers, checked: !prevState.admin.radioBtnChecked }}
              })
            }} 
          ></button>
        </div>
      </div>
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

      {users &&
        users
          .filter((val) => {
            if(filterOnRoles.admin.showUsers && filterOnRoles.basic.showUsers) {
              return val
            }
            else if(filterOnRoles.admin.showUsers && !filterOnRoles.basic.showUsers) {
              return val.roles.includes("Admin")
            }
            else if(!filterOnRoles.admin.showUsers && filterOnRoles.basic.showUsers) {
              return !val.roles.includes("Admin")
            }
            return null
          })
          .filter((val) => {
            if (searchTerm === "") {
              return val;
            }    
            else if (
              val.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
              val.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
              val.email.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val
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
                  <div style={{padding: "20px 0px", width: "200px"}}>
                    <div className="users-name">
                      <p className="users-paragraph">{val.firstName}</p>
                      <p className="users-paragraph">{val.lastName}</p>
                    </div>
                    <p className="users-paragraph users-email">{val.email}</p>
                  </div>
                  {val.roles.includes("SuperAdmin") && 
                                        <p className="users-paragraph role">Super admin</p>
                  }
                  {!val.roles.includes("SuperAdmin") && val.roles.includes("Admin") &&
                      <p className="users-paragraph role">Admin</p>
                  }
                  {!val.roles.includes("SuperAdmin") && !val.roles.includes("Admin") && val.roles.includes("Basic") &&
                      <p className="users-paragraph role">Basic</p>
                  }
                  
          
                  
 
                </div>
                <div className="users-buttons">
                  <Link to={`/edit/${val.id}`}>
                    <i className="fas fa-edit"></i>
                  </Link>
                </div>
              </div>
            );
          })}
    </div>
  );
}

export default Users;
