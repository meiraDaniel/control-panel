import React, { useEffect, useState, useCallback } from "react";
import "./style/dashboard.scss";
import { connect } from "react-redux";
import getTotalHoursHelper from "../../services/API/getTotalHoursHelper";
import getPostWallHelper from "../../services/API/getPostWallHelper";
import PostDash from "./PostDash";
import { useDispatch } from "react-redux";
import logoutImage from "../../images/logout.svg";
import { logout } from "../../store/actions";
import Percentage from "../AprovedHours/Percentage";
import dashboard from "../../images/icons/dashboard.svg";
import {
  Grid,

} from "@material-ui/core";
function Dashboard({ firstname, token, account_id }) {
  const [totalHours, setTotalHours] = useState("0");
  const [post, setPost] = useState([]);
  const dispatch = useDispatch();

  const getTotalHours = useCallback(() => {
    getTotalHoursHelper(account_id, token)
      .then((res) => setTotalHours(res.data.value))
      .catch((err) => setTotalHours("Not avaible"));
  }, [account_id, token]);
  const getWall = useCallback(() => {
    getPostWallHelper(token).then((res) => setPost(res.data));
  }, [token]);

  useEffect(() => {
    getWall();
  }, [getWall]);

  useEffect(() => {
    getTotalHours();
  }, [getTotalHours]);

  const toggleLogout = () => {
    dispatch(logout());
  };

  return (
    <Grid
      container
      justify='center'
      style={{
        height: "100%",
    
        background: "#0C3E59" ,
         color:"white"
      }}
    >
      <Grid item xs={9} sm={10} style={{ height: "10%"}}>
        {" "}
        <h2 className="page-name">Dashboard</h2>
      </Grid>
      <Grid
        item
        xs={12}
        style={{
          height: "45%",
          display: "flex",
          flexWrap: "wrap",
                    overflow: window.innerWidth > 600 ? "hidden" : "auto",
        }}
      >
        <Grid
          item
          xs={12}
          sm={8}
          style={{
            height: "100%",
            display: "flex",
            padding: "1%",
            background: "#0C3E59",
            color:"white",
          }}
        >
          {" "}
          <Grid item xs={6}>
            <h1 className="welcome">
              Welcome, <span>{firstname}</span>
            </h1>
          </Grid>
          <Grid item xs={6}>
            <img className="image-dash" src={dashboard} alt="dashboard" />
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            background: "#293F71",
            color:"white",
          }}
        >
          {" "}
          <p className="hours-worked">
            {" "}
            You worked <span>{totalHours}</span> hours this month{" "}
          </p>{" "}
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        style={{
          height: "45%",
          display: "flex",
          flexWrap: "wrap",
          overflow: window.innerWidth > 600 ? "hidden" : "auto",
        }}
      >
        <Grid
          item
          xs={12}
          sm={4}
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            background: "#0C3E59",
            color:"white",
          }}
        >
          <h3>My Wall</h3>
          {post.map((e, i) => (
            <PostDash key={i} post={e} token={token} />
          ))}
        </Grid>
        <Grid
          xs={12}
          sm={4}
          item
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            background: "#293F71",
            color:"white",
          }}
        >
          <Percentage token={token} account_id={account_id} />
        </Grid>
        <Grid
          xs={12}
          sm={4}
          item
          style={{
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#0C3E59",
         
             
          }}
        >
          <img
            className="image-logout"
            onClick={toggleLogout}
            src={logoutImage}
            alt="logout"
          />
        </Grid>
      </Grid>
    </Grid>
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
