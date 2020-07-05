import React from "react";
import { connect } from "react-redux";
import DisplayProfile from "./DisplayProfile";
import FormProfile from "./FormProfile";
import { Button, Grid, TextField, Snackbar } from "@material-ui/core";
import settings from "../../images/icons/settings.svg";

function Settings({ data }) {
  return (
    <Grid
      container
      justify="center"
      style={{ background: "#0C3E59", height: "100%" }}
    >
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
        <h2 className="page-name">Settings</h2>
      </Grid>

      <Grid item xs={12} style={{ height: "90%", display: "flex" }}>
        <Grid
          item
          xs={4}
          style={{
            background: "#0C3E59",
            height: "100%",
          }}
        >
          <Grid item xs={12} style={{ height: "50%", marginTop: "5%" }}>
            <DisplayProfile data={data} />
          </Grid>
          <Grid item xs={12} style={{ height: "45%" }}>
            <img className="image-employee" src={settings} alt="men" />
          </Grid>
        </Grid>
        <Grid item xs={8} style={{ height: "100%" }}>
          <FormProfile data={data} />
        </Grid>
      </Grid>
    </Grid>
  );
}

function mapToProps(state) {
  return {
    data: state.createSession,
  };
}

export default connect(mapToProps)(Settings);
