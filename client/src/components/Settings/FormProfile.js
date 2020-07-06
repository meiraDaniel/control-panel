import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import editProfile from "../../services/API/editProfile";
import { createSession } from "../../store/actions";
import { useDispatch } from "react-redux";
import formSettigHelper from "../../services/API/formSettigHelper";
import {
  Button,
  Grid,
  Paper,
  TextField,
  Box,
  Snackbar,
  Icon,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";

export function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function FormProfile({ data }) {
  const { register, errors, handleSubmit, control } = useForm();
  const [message, setMessage] = useState("");
  const [notification, setNotification] = useState(false);
  const [snackFlag, setSnackFlag] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = (value, e) => {
    e.preventDefault();
    let newEmail, newRole, newPassword;

    if (!value.email) {
      newEmail = data.email;
    }
    if (!value.role) {
      newRole = data.role;
    }

    if (value.email) {
      newEmail = value.email;
    }
    if (value.role) {
      newRole = value.role;
    }
    if (value.password) {
      newPassword = value.password;
    }

    editProfile(
      data.id,
      newRole,
      newEmail,
      data.token,
      notification,
      newPassword
    )
      .then((res) => {
        setMessage(res.data.message);
        handleDispach();
        setSnackFlag(!snackFlag);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        setSnackFlag(!snackFlag);
      });
  };

  const handleDispach = () => {
    formSettigHelper(data.id, data.token)
      .then((res) => {
        dispatch(
          createSession(
            res.data.id,
            data.token,
            res.data.password,
            res.data.role,
            res.data.adm,
            res.data.role,
            res.data.avatar,
            res.data.email
          )
        );
      })
      .catch((err) => {
        setMessage("Something is wrong");
        setSnackFlag(!snackFlag);
      });
  };

  return (
    <Grid
      container
      style={{ height: "100%", background: "#F4A471" }}
      justify="center"
      alignItems="center"
    >
      <Snackbar
        open={snackFlag}
        autoHideDuration={6000}
        onClose={() => setSnackFlag(false)}
      >
        <Alert severity="error"> {message}</Alert>
      </Snackbar>

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
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Controller
                  data-testid="Controller-email"
                  as={<TextField />}
                  fullWidth
                  control={control}
                  name="email"
                  label="E-mail"
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
                }}
              >
                <Controller
                  data-testid="Controller-password"
                  as={<TextField />}
                  fullWidth
                  control={control}
                  name="password"
                  label="Password"
                  margin="normal"
                  color="primary"
                  size="medium"
                  autoComplete="password"
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
                  data-testid="Controller-role"
                  as={<TextField />}
                  fullWidth
                  control={control}
                  name="role"
                  label="Role"
                  margin="normal"
                  size="medium"
                  color="primary"
                  autoComplete="role"
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
                <Button variant="contained" color="primary" type="submmit">
                  Send
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default FormProfile;
