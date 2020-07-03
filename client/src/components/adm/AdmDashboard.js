import React, { useEffect, useState } from "react";
import "./AdmDashboard.scss";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { getId } from "../../store/actions";
import displayAllAccounts from "../../services/API/displayAllAccounts";
import { useHistory } from "react-router-dom";
import MenuAdm from "./menuADM/MenuAdm";
import placeholder from "../../images/icons/presentation.svg";
import {
  Button,
  Grid,

} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function AdmDashboard() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const history = useHistory();
  const [flagSnack, setFlagSnack] = useState(false);
  const [message, setMessage] = useState(false);

  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = () => {
    displayAllAccounts()
      .then((res) => setData(res.data))
      .catch((err) => {
        setMessage(err);
        setFlagSnack(!flagSnack);
      });
  };

  const goEmployeeInformation = (account_id, avatar) => {
    dispatch(getId(account_id, avatar));
    history.push("/adm/employee");
  };
  return (
    <Grid
      container
      justify="center"
      style={{ height: "100%", background: "#293F71" }}
    >
      <Grid item xs={11} style={{ height: "10%", margin: "0%" }}>
        <MenuAdm />
      </Grid>
      <Grid
        item
        xs={11}
        style={{
          height: "80%",
          marginTop: "3%",
          overflow: "auto",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {data.length > 0 ? (
          data.map((employee, i) => (
            <Grid
              item
              xs={6}
              sm={4}
              md={3}
              style={{
                boxShadow: "-6px 10px 10px #080808a4",
                heigth: "20%",
                margin: "1%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={() =>
                goEmployeeInformation(employee.account_id)
              }
              className="AdmDashboard--eachEmployee-row"
              key={i}
            >
              <img
                className="Adm--avatar"
                src={employee.avatar_name ? employee.avatar_name : placeholder}
                alt="avatar"
              />
              <h1>
                {employee.firstname} {employee.lastname}
              </h1>
            </Grid>
          ))
        ) : (
          <Grid
            item
            sx={12}
            style={{
              display: "flex",

              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h1 className="loading">Loading...</h1>
          </Grid>
        )}
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

export default connect(mapToProps)(AdmDashboard);
