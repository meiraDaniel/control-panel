import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import insertHelper from "../../services/API/insertHelper";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import "./Insert.scss";
import {
  Button,
  Grid,
  Paper,
  TextField,
  Snackbar,
  Input,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import report from "../../images/icons/report.svg";

export function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function Insert({ token, account_id }) {
  const [message, setMessage] = useState("");
  const { register, errors, handleSubmit, control } = useForm();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [openFailed, setOpenFailed] = useState(false);

  const [image, setImage] = useState();

  /**
   * @function onSubmit -
   *  target the values inserted by the user and send it to the server
   *then send the response to the redux store.
   * @param {string} data -Values passed in the input
   * @param {*} e - event
   */

  const onSubmit = (value, e) => {
    e.preventDefault();

    const formData = new FormData();
    const data = [
      image,
      account_id,
      value.day,
      value.hour,
      value.project,
      token,
    ];
    data.forEach((e) => formData.append("file", e));
    insertHelper(formData)
      .then((res) => {
        setMessage(res.data.message);
        setOpen(!open);
      })
      .catch((err) => {
        setMessage(err.response.data.errors.message);
        setOpenFailed(!openFailed);
      });
  };
  const toggleBackMyHours = () => {
    history.push("/myhours");
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenFailed(false);
    setOpen(false);
  };

  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <Grid
      container
      style={{ height: "100%", background: "#F2F0F3" }}
      justify="center"
      alignItems="center"
    >
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="success"> {message}</Alert>
      </Snackbar>
      <Snackbar open={openFailed} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="warning"> {message}</Alert>
      </Snackbar>
    
            <Grid item xs={11} sm={9} style={{           color: "#F26628",
height: "10%", justifySelf:"flex-end",display:'flex',justifyContent:"flex-end" }}>

        <h1 className="page-name">Insert Hours</h1>
      </Grid>
      <Grid item xs={12} sm={8} md={5} style={{ height: "90%" }}>
        <Paper
          elevation={3}
          style={{ height: "90%", background: "#F26628", padding: "1%" }}
        >
          <form
            data-testid="form"
            className="center-form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Grid
              container
              style={{ height: "95%" }}
              justify="center"
              alignContent="center"
            >
              <Grid
                item
                xs={9}
                style={{
                  height: "20%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img className="insert-image" src={report} alt="report" />
              </Grid>

              <Grid
                item
                xs={9}
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Controller
                  
                  data-testid="Controller-day"
                  as={<TextField />}
                  fullWidth
                  control={control}
                  name="day"
                  label="Day"
                  type="number"
                  margin="normal"
                  color="primary"
                  size="medium"
                  autoComplete="day"
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
                <Controller
                  
                  data-testid="Controller-hour"
                  as={<TextField />}
                  fullWidth
                  control={control}
                  name="hour"
                  type="number"
                  label="Hour"
                  margin="normal"
                  size="medium"
                  color="primary"
                  autoComplete="hour"
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
                <Controller
                  
                  data-testid="Controller-project"
                  as={<TextField />}
                  fullWidth
                  control={control}
                  name="project"
                  label="Project"
                  margin="normal"
                  color="primary"
                  size="medium"
                  autoFocus
                />
              </Grid>
              <Grid
                item
                xs={9}
                style={{
                  heigth: "25%",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Controller
                  
                  data-testid="Controller-hour"
                  as={<Input />}
                  fullWidth
                  control={control}
                  name="documents"
                  label="documents"
                  type="file"
                  margin="normal"
                  color="primary"
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
                  marginTop: "4%",
                }}
              >
                <Button
                  style={{ margin: "1%" }}
                  variant="contained"
                  color="primary"
                  type="submmit"
                >
                  SEND
                </Button>
                <Button
                  style={{ margin: "1%" }}
                  onClick={toggleBackMyHours}
                  variant="contained"
                  color="primary"
                  type="submmit"
                >
                  BACK
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}
function mapToProps(state) {
  return {
    token: state.createSession.token,
    account_id: state.createSession.id,
  };
}

export default connect(mapToProps)(Insert);
