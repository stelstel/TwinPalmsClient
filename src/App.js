import React, { useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/navigation/Navbar";
import Navbar2 from "./components/navigation/Navbar2";
//import Login from "./components/authentication/Login";
import MultiStepForm from "./components/report/MultiStepForm";
// import RoomReport from "./components/report/RoomReportForm";
//import Home from "./components/home/Home";
import CreateUser from "./components/createuser/CreateUser";
import Dashboard from "./components/admin/Dashboard";
import Dashboard2 from "./components/admin/Dashboard2";
import EditUser from "./components/admin/EditUser";
import ResetPassword from "./components/authentication/ResetPassword";
import ChangePassword from "./components/authentication/ChangePassword";
import DataReports from "./components/DataReports/DataReports";
import Events from "./components/admin/Events";
import Users from "./components/admin/Users";
import Login from "./components/authentication/Login2";

export const UserContext = React.createContext();

// Session storage
/*function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
}

function getToken()
{
  const tokenString = sessionStorage.getItem('token');
  const userToken = JSON.parse(tokenString);
  return userToken?.token
}*/

function getUser(user) {
  //const user = {};
  if (user.token !== null && user.token !== "undefined") {
    const userToken = parseJwt(user.token);
    axios.defaults.headers.common["Authorization"] = `Bearer ${user.token}`;
    user.roles =
      userToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    user.userName =
      userToken["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"];
    user.id =
      userToken[
        "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"
      ];
    //user.token = token;
  }

  return user;
}

//
function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

function App() {
  const [user, setUser] = useState({
    token: "",
  });

  return (
    <>
      <Router>
        {!user.token ?(
          <>
            <Navbar />
            <Login setUser={setUser} />
          </>
        ) : (
          <>
            <Navbar2 {...getUser(user)} />
            <Redirect
              to={
                user.roles.includes("SuperAdmin")
                  ? "admin"
                  : user.roles.includes("Admin")
                  ? "datareports"
                  : "report"
              }
            />
            <Switch>
              <UserContext.Provider value={getUser(user)}>
                <Route
                  path="/home"
                  render={() => (
                    <Dashboard2 {...getUser(user)} isAuthed={true} />
                  )}
                ></Route>
                {/* {<Route path="/" component={Home} />} */}
                <Route path="/login" component={Login} />
                <Route path="/report" component={MultiStepForm} />
                {/* <Route path="/room-report" component={RoomReport} /> */}
                <Route path="/edit/:id" component={EditUser} />
                {<Route path="/admin" component={Dashboard} />}
                <Route path="/createuser" component={CreateUser} />
                <Route path="/reset-password" component={ResetPassword} />
                <Route path="/change-password" component={ChangePassword} />
                <Route path="/events" component={Events} />
                <Route path="/manageusers" component={Users} />
                <Route path="/datareports" component={DataReports} />
              </UserContext.Provider>
            </Switch>
          </>
        )}
      </Router>
    </>
  );
}

export default App;
