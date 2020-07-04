import React, { useState, useEffect, useCallback } from "react";
import getAllMyPosts from "../../services/API/getAllMyPosts";
import "./Wall.scss";
import { connect } from "react-redux";
import Posts from "./Posts";
import { useForm, Controller } from "react-hook-form";
import postOnWAllHelper from "../../services/API/postOnWallHelper";
import {
  Button,
  Grid,
  Paper,
  TextField,
  Box,
  Snackbar,
} from "@material-ui/core";
import phone from "../../images/phone.svg";

function Wall({ account_id, token, firstname }) {
  const [data, setData] = useState([]);
  const { register, errors, handleSubmit, control } = useForm();
  const [message, setMessage] = useState("");
  const [flag, setFlag] = useState(false);
  const [snackFlag, setSnackFlag] = useState(false);
  const [maxCharsTitle, setMaxCharsTitle] = useState(21);
  const [maxCharsPost, setMaxCharsPost] = useState(50);

  const getDataFromWall = useCallback(() => {
    getAllMyPosts(account_id, token)
      .then((res) => setData(res.data))
      .catch((err) => {
        setMessage(err.response.data.message);
        setSnackFlag(!snackFlag);
      });
  }, [account_id, token, snackFlag]);

  useEffect(() => {
    getDataFromWall();
  }, [flag]);

  const onSubmit = (value, e) => {
    e.preventDefault();

    postOnWAllHelper(account_id, value.title, value.message, token)
      .then((res) => {
        setMessage(res.data.message);
        toggleFlag();
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        setSnackFlag(!snackFlag);
      });
  };
  const toggleFlag = () => {
    setFlag(!flag);
  };

  const handleChangePost = (input) => {
    setMaxCharsPost(50 - input.length);
  };

  const handleChangeTittle = (input) => {
    setMaxCharsTitle(20 - input.length);
  };
  return (
    <Grid container justify="center" style={{ background: "black", height: "100%" }}>
      <Grid
        item
        xs={9}
        sm={10}
        style={{
          display: "flex",
          alignItems: "center",
          height: "10%",
          margin: "0%",
          color: "#293F71",
          background: "pink",
        }}
      >
        <h2 className="page-name">My Wall</h2>
      </Grid>
      <Grid
        item
        xs={12}
        style={{ background: "brown", height: "90%", display: "flex" }}
      >
        <Grid
          item
          xs={6}
          style={{
            background: "purple",
            height: "100%",
            justifyContent: "center",
          }}
        >
          <Grid
            item
            xs={12}
            style={{
              height: "50%",
              overflow: "auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {data.length > 0 ? (
              data.map((post, i) => (
                <Grid item xs={12} stle={{display:"flex", flexWrap:"wrap"}}>
                <Posts firstname={firstname} post={post} i={i} />
                </Grid>
              ))
            ) : (
              <h1>Loading ...</h1>
            )}
          </Grid>
          <Grid item xs={12} style={{ height: "50%" }}>
            <img src={phone} alt="phone" />
          </Grid>
          <Grid />
        </Grid>

        <Grid item xs={6} style={{ background: "blue", height: "100%" }}>
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
                  <img data-testid="image" src="" alt="gloves" />
                </div>
              </Grid>
              <Grid
                item
                xs={9}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
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
                  size="medium"
                  color="secondary"
                  autoComplete="message"
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
          {/* 
              <h1 className="wall--top-circle">Create Post</h1>

 
                <label htmlFor="title">title</label>
                <input
                  onChange={(e) => handleChangeTittle(e.target.value)}
                  className="wall--input"
                  type="text"
                  name="title"
                  ref={register({
                    required: "You must enter a title",
                    maxLength: {
                      value: 21,
                      message: "Your title is too big",
                    },
                  })}
                />
            

                <p id="chars--title" className="lighGreen">
                  {" "}
                  Characters left:{" "}
                  <span className={maxCharsTitle > 10 ? "lighGreen" : "red"}>
                    {" "}
                    {maxCharsTitle}
                  </span>{" "}
                </p>

                <label htmlFor="message">message</label>
                <input
                  onChange={(e) => handleChangePost(e.target.value)}
                  className="wall--input"
                  id="wall--input-textarea"
                  type="text"
                  name="message"
                  ref={register({
                    required: "You must write a post",
                    maxLength: {
                      value: 50,
                      message: "Your post is too big",
                    },
                  })}
                />

          

            

                <input
                  id="wall-button"
                  className="button"
                  type="submit"
                  value="Send"
                />
         
          </form> */}
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
