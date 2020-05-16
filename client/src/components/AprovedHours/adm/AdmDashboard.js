import React, { useEffect, useState } from "react";
import "./style/AdmDashboard.scss";
import { connect } from "react-redux";
import logo from '../../../images/logo.svg'

function AdmAdmDashboard({ firstname, token, account_id }) {



  return (
    <div className="AdmDashboard-main">
      <div className="AdmDashboard--top-nav">
          <img src={logo} alt="logo"/>
        <h2>My Dashboard</h2>
      </div>
      <main className="AdmDashboard--display-main">
        <div className="AdmDashboard--top">
          <div className="AdmDashboard--left-top">
            <h1>Welcolme,{firstname}</h1>
          </div>

          <div className="AdmDashboard--center-top">
          </div>
        </div>
        <div className="AdmDashboard--bottom">
          <div className="AdmDashboard--left-bottom">
        
          </div>
          <div className="AdmDashboard--center-bottom">
            
          </div>
          <div className="AdmDashboard--rigth-bottom">
              
           
              
          </div>
        </div>
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

export default connect(mapToProps)(AdmAdmDashboard);
