import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/navigation/Navbar';
//import Login from "./components/authentication/Login";
import MultiStepForm from './components/report/MultiStepForm';
//import Home from "./components/home/Home";
//import UserHome from "./components/home/UserHome";
import CreateUser from './components/createuser/CreateUser';
//import Dashboard from "./components/admin/Dashboard";
import Dashboard2 from './components/admin/Dashboard2';
import ResetPassword from './components/authentication/ResetPassword';
import DataReports from './components/DataReports/DataReports';
import Events from './components/admin/Events';
import Users from './components/admin/Users';
import Login from './components/authentication/Login2';

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

function getUser(token) {
  const user = {};
  if (token !== null && token !== 'undefined') {
    const userToken = parseJwt(token);

    user.roles = userToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    user.userName = userToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    user.id = userToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
  }

  return user;
}

function parseJwt(token) {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );

  return JSON.parse(jsonPayload);
}

function App() {
  const [token, setToken] = useState();

  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route
            path="/"
            exact
            render={() =>
              !token ? (
                <Login setToken={setToken} />
              ) : (
                <Dashboard2 {...getUser(token)} isAuthed={true} />
              )
            }
          ></Route>
          {/* <Route path="/" exact component={Home} /> */}
          {/*  <Route path="/home" component={Home} /> */}
          <Route path="/login" component={Login} />
          <Route path="/report" component={MultiStepForm} />
          {/* <Route path="/admin" component={Dashboard} /> */}
          <Route path="/createuser" component={CreateUser} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/events" component={Events} />
          <Route path="/manageusers" component={Users} />
          <Route path="/datareports" component={DataReports} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
