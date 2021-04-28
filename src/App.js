import './App.css';
import Navbar from './components/navigation/Navbar';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/authentication/Login';
import MultiStepForm from './components/report/MultiStepForm';
import HomeWithVideo from './components/home/HomeWithVideo';
import Home from './components/home/Home';
import Carousel from './components/analytics/Carousel';
import CreateUser from './components/createuser/CreateUser';
import Admin from './components/admin/Admin';

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
          <Route path='/admin' component={Admin}/>
          <Route path='/createuser' component={CreateUser}/>
        </Switch>
      </Router>
    </>
  );
}

export default App;
