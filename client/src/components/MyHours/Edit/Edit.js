import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { connect } from "react-redux";
import editHoursHelper from "../../../services/API/editHoursHelper";
import "./Edit.scss";
import MuiAlert from "@material-ui/lab/Alert";

import {
  Button,
  Grid,
  Paper,
  TextField,
  Box,
  Snackbar,
} from "@material-ui/core";
import eye from '../../../images/icons/eye.svg'

export function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Edit({ token, rowId, tooglePopUp }) {
  const { register, errors, handleSubmit, control } = useForm();
  const [message, setMessage] = useState("");
  const [flagSnack, setFlagSnack] = useState(false);
  const onSubmit = (value, e) => {
    e.preventDefault();
    editHoursHelper(rowId, value.newProject, value.newHour, token)
      .then((res) => {
        setMessage(res.data.message);
        setFlagSnack(!flagSnack);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        setFlagSnack(!flagSnack);
      });
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setFlagSnack(false);
  };
  return (
    <Grid
      container
      style={{ height: "100%" }}
      justify="center"
      align="center"
    >
      <Snackbar open={flagSnack} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="error"> {message}</Alert>
      </Snackbar>

      <Grid item xs={12} sm={9} md={5}  style={{ height: "100%" }}>
        <Paper elevation={1} style={{ height: "100%", background: "#F2F0F3" }}>
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
                <img  className="edit-image" src={eye} alt='alt'/>
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
                  data-testid="Controller-newProject"
                  as={<TextField />}
                  fullWidth
                  control={control}
                  name="newProject"
                  label="New project"
                  margin="normal"
                  size="medium"
                  color="secondary"
                  autoComplete="newProject"
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
                  data-testid="Controller-newHour"
                  as={<TextField />}
                  fullWidth
                  control={control}
                  name="newHour"
                  label="New hour"
                  type="number"
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
                  id="send"
                  type="submmit"
                  style={{ margin: "1%" }}
                >
                  {" "}
                  SEND{" "}
                </Button>
                <Button
                  size="large"
                  variant="contained"
                  color="secondary"
                  id="back"
                  type="submmit"
                  style={{margin: "1%" }}
                  onClick={tooglePopUp}
                >
                  {" "}
                  BACK{" "}
                </Button>
              </Grid>
            </Grid>
          </form>
           </Paper>
      </Grid>
      {/* <div className="edit-main">
      <h1 onClick={()=>setFlagSnack(!flagSnack)} className={flagSnack?'snackbar':'snackclose'}>{message}</h1>
      <form className='edit-center-form'onSubmit={handleSubmit(onSubmit)}>
         
         <div className='edit-center-formInput'>
          <label htmlFor="newProject">Project Name</label>
          <input
          className='input'
            type="text"
            name="newProject"
            ref={register({ required: true })}
          />
          {errors.newHour && "Don't forget to enter your project's name"}


          <label htmlFor="newHour">Hours</label>
          <input
                    className='input'

            type="number"
            name="newHour"
            ref={register({required: true, min: 0, max: 24})}
          />
          {errors.newHour && "Add a number between 0 and 24"}

          <input  className='button' type="submit" value="send" />
          <button   className='button' onClick={tooglePopUp}>back</button>

          </div>
        
      </form>
    </div> */}
    </Grid>
  );
}

function mapToProps(state) {
  return {
    token: state.createSession.token,
    account_id: state.createSession.id,
  };
}

export default connect(mapToProps)(Edit);
