import React, { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import getAllUploads from "../../../../services/API/getAllUploads";
import { getMonthName } from "../../../../services/services";
import { useHistory } from "react-router-dom";
import "./employeeDocuments.scss";
import { Button, Grid, Select, MenuItem, InputLabel } from "@material-ui/core";

import office from "../../../../images/icons/office.svg";

function EmployeeDocuments({ account_id, token }) {
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);
  const [data, setData] = useState([]);
  const [tableYear, setTableYear] = useState();
  const [documents, setDocuments] = useState([]);

  const history = useHistory();

  const handleAllUploads = useCallback(() => {
    getAllUploads(account_id, token)
      .then((res) => {
        setData(res.data);
        res.data.forEach((item) => setYears([item.year]));
      })
      .catch((err) => console.log(err));
  }, [account_id, token]);

  useEffect(() => {
    handleAllUploads();
  }, [handleAllUploads]);

  const handleYears = async (year) => {
    await setTableYear(year);
    data
      .filter((obj) => obj.year === year)
      .forEach((item) => setMonths([item.month]));
  };

  const displayDocuments = (selectedMonth) => {
    setDocuments(
      data.filter(
        (obj) => obj.year === tableYear && obj.month === parseInt(selectedMonth)
      )
    );
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
                id="employeeHours--button-back"
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
          height: "90%",
        }}
      >
        <Grid
          item
          xs={12}
          style={{ height: "9%", width: "100%", marginTop: "1%" }}
        >
          {tableYear ? (
            <div>
              <InputLabel
                style={{ width: "30%", marginLeft: "5%" }}
                id="months"
              >
                Month
              </InputLabel>
              <Select
                labelId="months"
                className="employeeHours--select"
                onChange={(e) => displayDocuments(e.target.value)}
                name="months"
                value="Month"
                style={{ width: "30%", marginLeft: "5%" }}
              >
                {months
                  .filter((v, i) => months.indexOf(v) === i)
                  .map((month, i) => (
                    <MenuItem key={i} value={month}>
                      {getMonthName(parseInt(month) + 1)}
                    </MenuItem>
                  ))}
              </Select>
            </div>
          ) : null}
        </Grid>
        <Grid item xs={12} style={{ margin:"5%",overflowY:"auto",height: "90%",display:'flex', flexWrap:"wrap" }}>
          {documents.length > 0
            ? documents.map((doc) => (
              <Grid item xs={3} style={{ height: "30%", boxShadow:"-6px 6px 10px black",margin:"1%", display:"flex", alignItems:"center", justifyContent:"center"}}>
              <a href={doc.upload} id='doc'><img  key={doc.id} src={doc.upload} alt={doc.upload_name} /> </a>  
                </Grid>
              ))
            : null}
        </Grid>
      </Grid>
         </Grid>
  );
}

function mapToProps(state) {
  return {
    account_id: state.getId.account_id,

    token: state.createSession.token,
  };
}

export default connect(mapToProps)(EmployeeDocuments);
