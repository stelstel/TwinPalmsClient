import React from "react";
import './App.css';
import Navbar from './components/navigation/Navbar';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/authentication/Login';
import MultiStepForm from './components/report/MultiStepForm';
import Home from './components/home/Home';
import Carousel from './components/analytics/Carousel';
import CreateUser from './components/createuser/CreateUser';
import Dashboard from './components/admin/Dashboard';
import Events from './components/admin/Events';
import Users from './components/admin/Users';


function App() {



  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home}/>
          <Route path='/home' component={Home}/>
          <Route path='/login' component={Login}/>
          <Route path='/report' component={MultiStepForm}/>
          <Route path='/datareports' component={Carousel}/>
          <Route path='/admin' component={Dashboard}/>
          <Route path='/events' component={Events}/>
          <Route path='/createuser' component={CreateUser}/>
          <Route path='/manageusers' component={Users} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
