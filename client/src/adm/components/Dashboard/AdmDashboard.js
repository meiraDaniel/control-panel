import React, { useEffect, useState } from "react";
import "./style/dashboard.scss";
import { connect } from "react-redux";
import getTotalHoursHelper from "../../services/API/getTotalHoursHelper";
import getPostWallHelper from "../../services/API/getPostWallHelper";
import PostDash from './PostDash'
import { useDispatch } from "react-redux";
import logo from '../../images/logo.svg'
import logoutImage from '../../images/logout.svg'
import {logout} from '../../store/actions'
import Percentage from '../AprovedHours/Percentage'

function Dashboard({ firstname, token, account_id }) {
  const [totalHours, setTotalHours] = useState(0);
  const [post, setPost] = useState([]);
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
    <div className="dashboard-main">
      <div className="dashboard--top-nav">
          <img src={logo} alt="logo"/>
        <h2>My Dashboard</h2>
      </div>
      <main className="dashboard--display-main">
        <div className="dashboard--top">
          <div className="dashboard--left-top">
            <h1>Welcolme,{firstname}</h1>
          </div>

          <div className="dashboard--center-top">
            <h1> You worked {totalHours} hours this month </h1>
          </div>
        </div>
        <div className="dashboard--bottom">
          <div className="dashboard--left-bottom">
          <h1>My Wall</h1>
           {post.map((e,i)=>(
               
                <PostDash key={i} post={e} token={token}/>
              ))} 
          </div>
          <div className="dashboard--center-bottom">
            <Percentage token={token} account_id={account_id}/>
          </div>
          <div className="dashboard--rigth-bottom">
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

export default connect(mapToProps)(Dashboard);
