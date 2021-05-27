import React from "react";
import "./App.css";
import Navbar from "./components/navigation/Navbar";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/authentication/Login";
import MultiStepForm from "./components/report/MultiStepForm";
import Home from "./components/home/Home";
import UserHome from "./components/home/UserHome";
import CreateUser from "./components/createuser/CreateUser";
import Dashboard from "./components/admin/Dashboard";
import ResetPassword from "./components/authentication/ResetPassword";
import DataReports from "./components/DataReports/DataReports";
import Events from "./components/admin/Events";
import Users from "./components/admin/Users";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/report" component={MultiStepForm} />
          <Route path="/admin" component={Dashboard} />
          <Route path="/createuser" component={CreateUser} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/events" component={Events} />
          <Route path="/manageusers" component={Users} />
          <Route path="/datareports" component={DataReports} />
          <Route path="/user" component={UserHome} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
