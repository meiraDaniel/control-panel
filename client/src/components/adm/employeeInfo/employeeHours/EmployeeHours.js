import React, { useState, useCallback } from "react";
import { connect } from "react-redux";
import { useEffect } from "react";
import getEmployeeHours from "../../../../services/API/getEmployeeHours";
import "./employeeHours.scss";
import { useHistory } from "react-router-dom";
import { getMonthName } from "../../../../services/services";
import TableAdm from "./TableAdm";
import office from "../../../../images/icons/office.svg";
import { Button, Grid, Select,MenuItem,InputLabel  } from "@material-ui/core";

function EmployeeHours({ account_id, token, avatar }) {
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);

  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [tableYear, setTableYear] = useState();
  const [tableMonth, setTableMonth] = useState();

  const [flag, setflag] = useState(false);
  const [tableFlag, setTableFlag] = useState(false);
  const [snakflag, setSnackflag] = useState(false);

  const history = useHistory();

  const toggleEmployeeHours = useCallback(() => {
    getEmployeeHours(account_id, token)
      .then((res) => {
        setData(res.data);
        res.data.forEach((item) => {
          setYears([item.year]);
          setSnackflag(!snakflag);
        });
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        setSnackflag(!snakflag);
      });
  }, [account_id, token, snakflag]);

  useEffect(() => {
    toggleEmployeeHours();
  }, [flag]);

  const handleYears = async (year) => {
    await setTableYear(year);

    data
      .filter((obj) => obj.year === year)
      .forEach((item) => setMonths([item.month]));
    setflag(!flag);
  };

  const showTable = async (e) => {
    const month = e.target.value;
    await setTableMonth(month);
    setTableFlag(!tableFlag);
  };

  return (
    <Grid container style={{ height: "100%", background: "#305D7A" }}>
      <Grid
        item
        xs={12}
        style={{
          height: "10%",
          background: "#305D7A",
          borderBottom: "1px solid #F2F0F3",
          paddingLeft: "5%",
        }}
      >
        <h2>Employees Hours</h2>
      </Grid>
      <Grid item xs={3} style={{ height: "90%", background: "#305D7A" }}>
        <Grid
          item
          xs={12}
          style={{
            height: "45%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: "5%",
            justifyContent: "center",
            overflow: "auto",
          }}
        >
          {years ? (
            years
              .filter((v, i) => years.indexOf(v) === i)
              .map((year, i) => (
                <Button
                  color="secondary"
                  variant="contained"
                  style={{ height: "15%", width: "50%", margin: "2%" }}
                  onClick={() => handleYears(year)}
                  key={i}
                >
                  {year}
                </Button>
              ))
          ) : (
            <p>No data Avaible</p>
          )}
          <Button
            color="secondary"
            variant="contained"
            id="employeeHours--button-back"
            className="button"
            style={{ height: "15%", width: "50%", margin: "2%" }}
            onClick={() => history.push("/adm/dashboard")}
          >
            BACK
          </Button>
        </Grid>
        <Grid
          item
          xs={12}
          style={{
            height: "50%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img className="image-employee" src={office} alt="placeholder" />
        </Grid>
      </Grid>
      <Grid
        item
        xs={9}
        style={{
          background: "#F2F0F3",
           height: "90%"
        }}
      >
        <Grid item xs={12} style={{  height: "9%",width:'100%', marginTop:"1%"}}>
          {flag ? (
            <div>
           <InputLabel  style={{ width:"30%", marginLeft:"5%"}} id="months">Month</InputLabel>
           <Select
            labelId="months"
              className="employeeHours--select"
              onChange={showTable}
              name="months"
              value="Month"
              style={{ width:"30%", marginLeft:"5%"}}
            >
             
              {months
                .filter((v, i) => months.indexOf(v) === i)
                .map((month, i) => (
                  <MenuItem  key={i} value={month}>
                    {getMonthName(parseInt(month) + 1)}
                  </MenuItem>
                ))}
            </Select>
            </div>
          ) : null}
        </Grid>
        <Grid item xs={12} style={{  height: "90%" }}>
          {tableFlag ? (
            <TableAdm
              tableYear={tableYear}
              tableMonth={tableMonth}
              account_id={account_id}
              token={token}
            />
          ) : null}
        </Grid>
      </Grid>
    </Grid>
  );
}

function mapToProps(state) {
  return {
    account_id: state.getId.account_id,
    avatar: state.getId.avatar,

    token: state.createSession.token,
  };
}

export default connect(mapToProps)(EmployeeHours);
