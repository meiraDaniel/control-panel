import React, { useState, useEffect, useCallback } from "react";
import { connect } from "react-redux";
import getAllDataFromHours from "../../services/API/getAllDataFromHours";
import { getMonthName } from "../../services/services";
import Table from "./Table";
import { useHistory } from "react-router-dom";
import { Grid, Button, Paper } from "@material-ui/core";

const MyHours = ({ account_id, token }) => {
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const history = useHistory();
  const [mountFlag, setmountFlag] = useState(true);

  const fechData = useCallback(() => {
    getAllDataFromHours(account_id, token)
      .then((res) => setData(res.data))
      .catch((err) => setMessage(err.response.data.message));
  }, [account_id, token]);

  useEffect(() => {
    fechData();
  }, [fechData, mountFlag]);

  const toggleInsert = () => {
    history.push("/insert");
  };
  const handlemountFlag = () => {
    setmountFlag(!mountFlag);
  };
  return (
    <Grid
      container
      justify="center"
      style={{
        height: "100vh",
        background: "#F2F0F3",
        width: "100%",
        oveflow: "hidden",
        color: "white",
      }}
    >
      <Grid item xs={9} sm={10} style={{ color: "#F26628", height: "10%" }}>
        {" "}
        <h2 className="page-name">My Hours</h2>
      </Grid>

      <Grid
        item
        sx={9}
        style={{
          height: "85%",
          width: "90%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Paper
          elevation={3}
          style={{ width: "95%", height: "100%", background: "#293F71" }}
        >
          <Grid
            item
            xs={12}
            style={{
              height: "15%",
              display: "flex",
              borderBottom: "0.5px solid #F2F0F3",
            }}
          >
            <Grid
              item
              xs={6}
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "#02B2DB",
              }}
            >
              {data.length > 0 ? (
                <h2>{getMonthName(data[0].month + 1)}</h2>
              ) : (
                <h2>Month</h2>
              )}
            </Grid>
            <Grid
              item
              xs={6}
              style={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button
                size="small"
                variant="contained"
                color="secondary"
                id="myHours--top-button"
                className="button"
                onClick={toggleInsert}
              >
                Add Hours
              </Button>
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            style={{
              height: "85%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Table data={data} handlemountFlag={handlemountFlag} />
          </Grid>
        </Paper>
      </Grid>
    </Grid>
  );
};
function mapToProps(state) {
  return {
    token: state.createSession.token,
    account_id: state.createSession.id,
  };
}

export default connect(mapToProps)(MyHours);
