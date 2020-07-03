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
  Button,
  Grid,
  Paper,
  TextField,
  Box,
  Snackbar,
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
      style={{
        background: "blue",
        height: "100%",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Grid item xs={9} sm={10} style={{ background: "blue", height: "10%" }}>
        {" "}
        <h2 className="page-name">Dashboard</h2>
      </Grid>
      <Grid
        item
        xs={12}
        style={{
          background: "pink",
          height: "45%",
          display: "flex",
          flexWrap: "wrap",
          overflow: "auto",
        }}
      >
        <Grid
          item
          xs={12}
          sm={8}
          style={{ background: "yellow", height: "100%", display:"flex", padding:'1%' }}
        >
          {" "}
          <Grid
          item
          xs={6}
          
        >
          <h1 className="welcome">
            Welcome, <span>{firstname}</span>
          </h1>
          </Grid>
          <Grid
          item
          xs={6}
          
        >
          <img className="image-dash" src={dashboard} alt="dashboard" />
          </Grid>

        </Grid>
        <Grid
          item
          xs={12}
          sm={4}
          style={{ background: "black", height: "100%" , display:"flex", justifyContent:"center"}}
        >
          {" "}
          <p className="hours-worked">
            {" "}
            You worked <span >{totalHours}</span> hours this
            month{" "}
          </p>{" "}
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        style={{
          background: "brown",
          height: "45%",
          display: "flex",
          flexWrap: "wrap",
          overflow: "auto",
        }}
      >
        <Grid
          item
          xs={12}
          sm={4}
          style={{ background: "pink", height: "100%" , display:"flex", justifyContent:"center"}}
        >
          <h3>My Wall</h3>
          {post.map((e, i) => (
            <PostDash key={i} post={e} token={token} />
          ))}
        </Grid>
        <Grid xs={12} sm={4} item style={{ background: "red", height: "100%" , display:"flex", justifyContent:"center"}}>
          <Percentage token={token} account_id={account_id} />
        </Grid>
        <Grid
          xs={12}
          sm={4}
          item
          style={{ background: "white", height: "100%", display:"flex", justifyContent:"center", alignItems:"center" }}
        >
          <img  className="image-logout" onClick={toggleLogout} src={logoutImage} alt="logout" />
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
