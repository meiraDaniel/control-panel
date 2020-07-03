import React, { useState, useEffect, useCallback } from "react";
import approveHourHelper from "../../../../services/API/approveHourHelper";
import approveAllHourHelper from "../../../../services/API/approveAllHours";
import getEmployeeMonthHours from "../../../../services/API/getEmployeeMonthHours";
import PerdentageAdm from "../Percentage/PercentageAdm";
import "./TableAms.scss";
import check from "../../../../images/check.svg";
import del from "../../../../images/delete.svg";
import {
  Button,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import { RemoveCircle, CheckCircle } from "@material-ui/icons";

function TableAdm({ tableYear, tableMonth, token, account_id }) {
  const [table, setTable] = useState([]);
  const [flag, setFlag] = useState(false);
  const [message, setMessage] = useState(false);
  const [snakflag, setSnackflag] = useState(false);

  const showTable = useCallback(() => {
    getEmployeeMonthHours(account_id, tableYear, tableMonth, token)
      .then((res) => {
        setTable(res.data);
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        setSnackflag(!snakflag);
      });
  }, [account_id, tableYear, tableMonth, token, snakflag]);

  useEffect(() => {
    showTable();
  }, [flag, showTable]);

  const [status, setStatus] = useState();

  const handdleApproveHour = (hourId, token) => {
    approveHourHelper(hourId, token);
    setFlag(!flag);
  };
  const handdleAllHourApproved = (token) => {
    approveAllHourHelper(token).then((res) => setStatus("Yes"));
    setFlag(!flag);
  };

  return (
    <Grid container style={{ height: "100%" }}>
      <Grid item xs={12} style={{ height: "20%" }}>
        {table.length > 0 ? <PerdentageAdm table={table} /> : null}
      </Grid>
      <Grid
        item
        xs={12}
        style={{
          height: "70%",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TableContainer
          style={{
            overflowY: "auto",

            height: "90%",
            width: "90%",
          }}
        >
          <TableHead style={{ background: "#0C3E59", width: "100%" }}>
            <TableRow style={{ width: "100%" }}>
              <TableCell
                align="left"
                style={{ color: "white", width: "25%" }}
                variant="head"
              >
                Day
              </TableCell>
              <TableCell
                align="left"
                style={{ color: "white", width: "25%" }}
                variant="head"
              >
                Hour
              </TableCell>
              <TableCell
                align="left"
                style={{ color: "white", width: "25%" }}
                variant="head"
              >
                Project
              </TableCell>
              <TableCell
                align="left"
                style={{ color: "white", width: "25%" }}
                variant="head"
              >
                Aproved
              </TableCell>
              <TableCell
                align="left"
                style={{ color: "white", width: "25%" }}
                variant="head"
              >
                Approve
              </TableCell>
            </TableRow>
          </TableHead>
          {table.map((row, index) => (
            <TableBody key={index}>
              <TableRow style={{ width: "100%" }}>
                <TableCell align="left">{row.day}</TableCell>
                <TableCell align="left">{row.hour}</TableCell>
                <TableCell align="left">{row.project}</TableCell>
                <TableCell align="left">
                  {row.approved ? (
                    <CheckCircle color="primary" />
                  ) : (
                    <RemoveCircle color="primary" />
                  )}
                </TableCell>
                <TableCell align="left">
                  {row.approved ? (
                    <CheckCircle color="primary" />
                  ) : status ? (
                    status
                  ) : (
                    <Button
                      variant="contained"
                      id="button-approveHour"
                      className="button"
                      onClick={() => handdleApproveHour(row.id)}
                    >
                      Aprove
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </TableContainer>
      </Grid>
      <Grid
        item
        xs={12}
        style={{
          height: "10%",
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <Button
          color="secondary"
          variant="contained"
          className="button"
          onClick={handdleAllHourApproved}
        >
          Approve All
        </Button>
      </Grid>
    </Grid>
  );
}

export default TableAdm;
