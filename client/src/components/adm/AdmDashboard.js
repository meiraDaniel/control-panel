import React, { useEffect, useState } from "react";
import "./style/AdmDashboard.scss";
import { connect } from "react-redux";
import logo from '../../images/logo.svg'
import { useDispatch } from "react-redux";
import {logout} from '../../store/actions'
function AdmDashboard({ firstname, token, account_id }) {
  const dispatch = useDispatch();

  const  toggleLogout =() =>{
    dispatch(logout())
    }

  return (
    <div className="AdmDashboard-main">
      <div className="AdmDashboard--top-nav">
          <img src={logo} alt="logo"/>
        <h2>Employees</h2>
      </div>
      <main className="AdmDashboard--display-main">
      <button onClick={toggleLogout}>log out</button>
      </main>
    </div>
  );
}

function mapToProps(state) {
  return {
    firstname: state.createSession.firstname,
    token: state.createSession.token,
    account_id: state.createSession.id,
  };
}

export default connect(mapToProps)(AdmDashboard);
