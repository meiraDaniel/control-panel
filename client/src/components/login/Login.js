import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import loginHelper from "../../services/API/loginHelper";
import { createSession } from "../../store/actions";
import landingpageicon from "../../images/icons/jigsaw.svg";
import MuiAlert from "@material-ui/lab/Alert";
import "./Login.scss";
import {
  Button,
  Grid,
  Paper,
  TextField,
  Box,
  Snackbar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyle = makeStyles((theme) => ({
  root: {
    color:'white'
  }
}))

function Login() {
  const classes = useStyle()

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { register, errors, handleSubmit, control } = useForm();
  const dispatch = useDispatch();
  /**
   * @function onSubmit -
   *  target the values inserted by the user and send it to the server
   *then send the response to the redux store.
   * @param {string} data -Values passed in the Controller
   * @param {*} e - event
   */

  const onSubmit = (value, e) => {
    e.preventDefault();
    loginHelper(value.email, value.password)
      .then((res) =>
        dispatch(
          createSession(
            res.data.id,
            res.data.token,
            res.data.firstname,
            res.data.lastname,
            res.data.adm,
            res.data.role,
            res.data.avatar,
            res.data.email
          )
        )
      )
      .catch((err) => {
        setMessage(err.response.data.message);
        setOpen(true);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  return (
    <Grid
      container
      style={{ height: "100%", background: "#0C3E59" }}
      justify="center"
      alignItems="center"
    >
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="error"> {message}</Alert>
      </Snackbar>

      <Grid item xs={11} sm={8} md={4} style={{ height: "80%" }}>
        <Paper elevation={1} style={{ height: "100%", background: "#0E5072" }}>
          <form
            data-testid="form"
            className="center-form"
            onSubmit={handleSubmit(onSubmit)}
          >
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
                  <img data-testid="image" src={landingpageicon} alt="gloves" />
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
                  className={classes.root}
                  data-testid="Controller-email"
                  as={<TextField />}
                  fullWidth
                  control={control}
                  name="email"
                  label="E-mail"
                  margin="normal"
                  size="medium"
                  color="secondary"
                  autoComplete="email"
                  autoFocus
                />
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
               
                  data-testid="Controller-password"
                  as={<TextField />}
                  fullWidth
                  control={control}
                  name="password"
                  label="password"
                  type="password"
                  margin="normal"
                  color="secondary"
                  size="medium"
                  autoFocus
                />
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
                  LOGIN{" "}
                </Button>
              </Grid>
            </Grid>
          </form>
          <Box mt={5}>
            <p className="copyrigth">
              {" "}
              Copyright © Lígia Souza {new Date().getFullYear()}
            </p>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default Login;
