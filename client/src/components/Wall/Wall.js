import React, { useState, useEffect, useCallback } from "react";
import getAllMyPosts from "../../services/API/getAllMyPosts";
import { connect } from "react-redux";
import Posts from "./Posts";
import { useForm, Controller } from "react-hook-form";
import postOnWAllHelper from "../../services/API/postOnWallHelper";
import { Button, Grid, TextField, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

import phone from "../../images/phone.svg";
import owner from "../../images/icons/owner.svg";

export function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Wall({ account_id, token, firstname }) {
  const [data, setData] = useState([]);
  const { register, handleSubmit, control } = useForm();
  const [flag, setFlag] = useState(false);
  const [maxCharsTitle, setMaxCharsTitle] = useState(21);
  const [maxCharsPost, setMaxCharsPost] = useState(50);
  const [open, setOpen] = useState(false);
  const [openFalse, setOpenFalse] = useState(false);

  const [message, setMessage] = useState("");

  const getDataFromWall = useCallback(() => {
    getAllMyPosts(account_id, token)
      .then((res) => setData(res.data))
      .catch((err) => {
        setMessage(err.response.data.message);
        setOpenFalse(!openFalse);
      });
  }, [account_id, token, open]);

  useEffect(() => {
    getDataFromWall();
  }, [flag]);

  const onSubmit = (value, e) => {
    e.preventDefault();

    postOnWAllHelper(account_id, value.title, value.message, token)
      .then((res) => {
        setMessage(res.data.message);
        toggleFlag();
        setOpen(true);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        setOpenFalse(!openFalse);
      });
  };
  const toggleFlag = () => {
    setFlag(!flag);
  };
  /*
  const handleChangePost = (e) => {
    const input = e.target.value;
    console.log(input);
       setMaxCharsPost(50 - input.length);
    console.log("here"); 
  };

  const handleChangeTittle = (e) => {
    const input = e.target.value;
    console.log(input);

        setMaxCharsTitle(20 - input.length);
  }; */

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    setOpenFalse(false);
  };
  return (
    <Grid
      container
      justify="center"
      style={{ background: "#0C3E59", height: "100%" }}
    >
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="success"> {message}</Alert>
      </Snackbar>
      <Snackbar open={openFalse} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="error"> {message}</Alert>
      </Snackbar>
      <Grid
        item
        xs={11}
        sm={9}
        style={{
          color: "white",
          height: "10%",
          justifySelf: "flex-end",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <h2 className="page-name">My Wall</h2>
      </Grid>
      <Grid
        item
        xs={12}
        style={{ background: "#0C3E59", height: "90%", display: "flex" }}
      >
        <Grid
          item
          xs={4}
          style={{
            height: "100%",
            justifyContent: "center",
          }}
          className="post-wall"
        >
          <Grid
            item
            xs={12}
            style={{
              height: "55%",
              overflow: "auto",
              display: "flex",
              flexDirection: "column",
              marginTop: "5%",
            }}
          >
            {data.length > 0 ? (
              data.map((post, i) => (
                <Grid
                  item
                  key={i}
                  xs={12}
                  sm={12}
                  md={12}
                  lg={6}
                  style={{
                    height: "60%",
                    padding: "3%",
                    background: "#F26628",
                    margin: "3%",
                    borderRadius: "30px",
                  }}
                >
                  <Posts post={post} i={i} />
                </Grid>
              ))
            ) : (
              <Grid
                item
                xs={12}
                sm={8}
                md={5}
                style={{ height: "50%", margin: "auto" }}
              >
                <h1>Loading ...</h1>
              </Grid>
            )}
          </Grid>
          <Grid item xs={12} style={{ height: "40%" }}>
            <img className="image-employee" src={phone} alt="phone" />
          </Grid>
          <Grid />
        </Grid>

        <Grid
          item
          xs={8}
          style={{
            background: "#F2F0F3",
            height: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <form className="wall--center-form" onSubmit={handleSubmit(onSubmit)}>
            <Grid
              container
              style={{ height: "100%" }}
              justify="center"
              alignContent="center"
            >
              <Grid
                item
                xs={11}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "30%",
                }}
              >
                <div id="gloves-circle">
                  <img data-testid="image" src={owner} alt="gloves" />
                </div>
              </Grid>
              <Grid
                item
                xs={9}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Controller
                  data-testid="Controller-title"
                  as={<TextField />}
                  fullWidth
                  control={control}
                  name="title"
                  label="title"
                  margin="normal"
                  color="secondary"
                  size="medium"
                  autoFocus
                />

                <p id="chars--title" className="lighGreen">
                  {" "}
                  Characters left:{" "}
                  <span className={maxCharsTitle > 10 ? "lighGreen" : "red"}>
                    {" "}
                    {maxCharsTitle}
                  </span>{" "}
                </p>
              </Grid>

              <Grid
                item
                xs={9}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Controller
                  data-testid="Controller-message"
                  as={<TextField />}
                  fullWidth
                  control={control}
                  name="message"
                  label="Message"
                  margin="normal"
                  multiline
                  color="secondary"
                  rows={4}
                  variant="outlined"
                  autoFocus
                />

                <p id="chars--post" className="lighGreen">
                  {" "}
                  Characters left:{" "}
                  <span className={maxCharsPost > 10 ? "lighGreen" : "red"}>
                    {" "}
                    {maxCharsPost}
                  </span>{" "}
                </p>
              </Grid>

              <Grid
                item
                xs={9}
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Button
                  size="large"
                  variant="contained"
                  color="secondary"
                  id="login"
                  type="submmit"
                  style={{ marginTop: "5%" }}
                >
                  {" "}
                  Send{" "}
                </Button>
              </Grid>
            </Grid>
          </form>
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

export default connect(mapToProps)(Wall);
