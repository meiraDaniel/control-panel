import React, { useState } from "react";
import Login from "./components/login/Login";
import { Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Dashboard from "./components/Dashboard/Dashboard";
import "./App.scss";
import MyHours from "./components/MyHours/MyHours";
import Insert from "./components/InsertHours/Insert";
import Wall from "./components/Wall/Wall";
import Settings from "./components/Settings/Settings";
import AdmDashboard from "./components/adm/AdmDashboard";
import Menu from "./components/Menu/Menu";
import EmployeeInfo from "./components/adm/employeeInfo/EmployeeInfo";

function mapToProps(state) {
  return {
    isAuthenticated: state.createSession.token,
    isAdm: state.createSession.adm,
  };
}
function App({ isAuthenticated, isAdm }) {
  const [onMenu, setonMenu] = useState(false);

  const toggleonMenu = () => {
    setonMenu(!onMenu);
  };

  return (
    <div className="app--main">
      <div className="menu-users">
        {isAuthenticated ? (
          isAdm ? null : (
            <Menu onMenu={onMenu} toggleonMenu={toggleonMenu} />
          )
        ) : null}
      </div>

      <Switch>
        <Route exact path="/">
          {isAuthenticated ? isAdm ?  <Redirect to="/adm/dashboard" />:<Redirect to="/dashboard" /> 
          : (
            <Login />
          )}
        </Route>
       
        <Route path="/adm/dashboard">
          {!isAuthenticated ? <Redirect to="/" /> : <AdmDashboard />}
        </Route>
        <Route path="/dashboard">
          {!isAuthenticated && !isAdm ? <Redirect to="/" /> : <Dashboard />}
        </Route>
        <Route path="/myhours">
          {!isAuthenticated && !isAdm ? <Redirect to="/" /> : <MyHours />}
        </Route>
        <Route path="/insert">
          {!isAuthenticated && !isAdm ? <Redirect to="/" /> : <Insert />}
        </Route>
        <Route path="/wall">
          {!isAuthenticated && !isAdm ? <Redirect to="/" /> : <Wall />}
        </Route>
        <Route path="/settings">
          {!isAuthenticated && !isAdm ? <Redirect to="/" /> : <Settings />}
        </Route>

        <Route path="/adm/employee">
          {!isAuthenticated ? <Redirect to="/" /> : <EmployeeInfo />}
        </Route>
      </Switch>
    </div>
  );
}

export default connect(mapToProps)(App);
