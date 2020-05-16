import React, { useEffect, useState } from "react";
import "./style/AdmDashboard.scss";
import { connect } from "react-redux";
import getTotalHoursHelper from "../../services/API/getTotalHoursHelper";
import getPostWallHelper from "../../services/API/getPostWallHelper";
import PostDash from './PostDash'
import { useDispatch } from "react-redux";
import logo from '../../images/logo.svg'
import logoutImage from '../../images/logout.svg'
import {logout} from '../../store/actions'
import Percentage from '../AprovedHours/Percentage'

function AdmAdmDashboard({ firstname, token, account_id }) {
  const dispatch = useDispatch();


  useEffect(() => {
   getTotalHours();
    getWall(); 
  },[]);

  const getTotalHours = () => {
    getTotalHoursHelper(account_id, token)
      .then((res) => setTotalHours(res.data.value))
      .catch((err) => console.log(err));
  };
  const getWall = () => {
    getPostWallHelper(token).then((res) => setPost(res.data));
  };

 const  toggleLogout =() =>{
  dispatch(logout())
  }

  return (
    <div className="AdmDashboard-main">
      <div className="AdmDashboard--top-nav">
          <img src={logo} alt="logo"/>
        <h2>My AdmAdmDashboard</h2>
      </div>
      <main className="AdmDashboard--display-main">
        <div className="AdmDashboard--top">
          <div className="AdmDashboard--left-top">
            <h1>Welcolme,{firstname}</h1>
          </div>

          <div className="AdmDashboard--center-top">
            <h1> You worked {totalHours} hours this month </h1>
          </div>
        </div>
        <div className="AdmDashboard--bottom">
          <div className="AdmDashboard--left-bottom">
          <h1>My Wall</h1>
           {post.map((e,i)=>(
               
                <PostDash key={i} post={e} token={token}/>
              ))} 
          </div>
          <div className="AdmDashboard--center-bottom">
            <Percentage token={token} account_id={account_id}/>
          </div>
          <div className="AdmDashboard--rigth-bottom">
              <button onClick={toggleLogout}>
              <img src={logoutImage} alt="logout" />
              </button>
              
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
