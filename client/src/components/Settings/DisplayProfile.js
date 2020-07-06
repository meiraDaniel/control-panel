import React from "react";
import { Grid } from "@material-ui/core";

function DisplayProfile({ data }) {
  return (
    <Grid container direction="column" justify="center" align="center">
      <h1>{`${data.firstname} ${data.lastname}`}</h1>
      <h2>{data.email}</h2>
      <h3>{data.role}</h3>
    </Grid>
  );
}

export default DisplayProfile;
