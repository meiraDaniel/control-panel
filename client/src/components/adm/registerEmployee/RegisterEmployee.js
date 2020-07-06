import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import MenuAdm from "../menuADM/MenuAdm";
import "./registerEmployee.scss";
import registerEmployeeHelper from "../../../services/API/registerEmployeeHelper";
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

function RegisterEmployee({ token, account_id }) {
  const { register, errors, handleSubmit, control } = useForm();
  const [image, setImage] = useState({ preview: "", raw: "" });
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  const onSubmit = async (value, e) => {
    e.preventDefault();

    const formData = new FormData();
    const data = [
      image.raw,
      value.firstname,
      value.lastname,
      value.email,
      value.role,
      value.password,
    ];
    data.forEach((e) => formData.append("file", e));

    registerEmployeeHelper(formData)
      .then((response) => {
        setMessage(response.data);
        setOpen(true);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        setOpen(true);
      });
  };

  const handleChange = (e) => {
    setImage({
      preview: URL.createObjectURL(e.target.files[0]),
      raw: e.target.files[0],
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
      style={{ height: "100%", background: "#F2F0F3" }}
      justify="center"
      alignItems="center"
    >
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert severity="error"> {message}</Alert>
      </Snackbar>
      <Grid item xs={11} style={{ height: "10%", margin: "0%" }}>
        <MenuAdm />
      </Grid>
      <Grid item xs={12} sm={8} md={5} style={{ height: "90%" }}>
        <Paper elevation={3} style={{ height: "90%", background: "#0E5072",padding:'1%' }}>
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
                xs={11}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: "20%",
                  width:"100%",
             
                
                }}
              >
                  {image.preview ? (
                    <div className="register--wrapper-avatar">
                      <img src={image.preview} id="avatar" alt="avatar" />
                    </div>
                  ) : (
                    <div className="register--wrapper-avatar">
                      <label>
                        Select avatar
                      <input
                        className="register--center-avatar"
                        onChange={handleChange}
                        type="file"
                        name="avatar"
                      />
                      </label>
                    </div>
                  )}{" "}
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
                  data-testid="Controller-firstname"
                  as={<TextField />}
                  fullWidth
                  control={control}
                  name="firstname"
                  label="First name"
                  margin="normal"
                  color="secondary"
                  size="medium"
                  autoComplete="firstname"
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
                  data-testid="Controller-lastname"
                  as={<TextField />}
                  fullWidth
                  control={control}
                  name="lastname"
                  label="Last name"
                  margin="normal"
                  size="medium"
                  color="secondary"
                  autoComplete="lastname"
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
                  data-testid="Controller-email"
                  as={<TextField />}
                  fullWidth
                  control={control}
                  name="email"
                  label="email"
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
                <Controller
                  data-testid="Controller-role"
                  as={<TextField />}
                  fullWidth
                  control={control}
                  name="role"
                  label="role"
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
                  variant="contained"
                  color="secondary"
                  type="submmit"
                 >
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

export default RegisterEmployee;
