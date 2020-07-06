import React, { useState } from "react";
import Edit from "./Edit/Edit";
import deleteDataFromHours from "../../services/API/deleteDataFromHours";
import { connect } from "react-redux";
import edit from "../../images/edit.svg";
import del from "../../images/delete.svg";
import {EditSharp, Delete} from '@material-ui/icons';
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

function Tables({ data, token, account_id, handlemountFlag }) {
  const [popUpEdit, setPopUpEdit] = useState(false);
  const [rowId, setRowid] = useState();
  const [message, setMessage] = useState("");

  const [snackFlag, setSnackFlag] = useState(false);

  const tooglePopUp = () => {
    setPopUpEdit(!popUpEdit);
    handlemountFlag();
  };
  const toggleIdEdit = (rowId) => {
    setRowid(rowId);
    tooglePopUp();
  };
  const toggleIdDelete = (rowId) => {
    if (data.aproved) return setMessage("You cannot delete aproved hour");
    else {
      deleteDataFromHours(parseInt(rowId), token)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
      handlemountFlag();
    }
  };

  return (
    <Grid container 
    style={{
      height: "80%",
      width: "90%",
        overflowY: "auto", marginTop:"2%"}}>

      {popUpEdit ? (
        <Edit rowId={rowId} tooglePopUp={tooglePopUp} />
      ) : (
        <Table className="Table--center-table"     >
          <TableContainer
            style={{
            
              height: "95%",
              width: "100%",
            }}
          >
            <TableHead style={{ background: "#0C3E59", width: "100%" }}>
              <TableRow style={{ width: "100%" }}>
                <TableCell
                  align="left"
                  style={{ color: "white", width: "25%" }}
                  className="table--top-headlines"
                >
                  Day
                </TableCell>
                <TableCell
                  align="left"
                  style={{ color: "white", width: "25%" }}
                  className="table--top-headlines"
                >
                  Hour
                </TableCell>
                <TableCell
                  align="left"
                  style={{ color: "white", width: "25%" }}
                  className="table--top-headlines"
                >
                  Project
                </TableCell>
                <TableCell
                  align="left"
                  style={{ color: "white", width: "25%" }}
                  className="table--top-headlines"
                >
                  Aproved
                </TableCell>
                <TableCell
                  align="left"
                  style={{ color: "white", width: "25%" }}
                  className="table--top-headlines"
                >
                  Edit
                </TableCell>
                <TableCell
                  align="left"
                  style={{ color: "white", width: "25%" }}
                  className="table--top-headlines"
                >
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            {data.map((row, index) => (
              <TableBody key={index}>
                <TableRow style={{ width: "100%" }}>
                  <TableCell  style={{ color: "white"}}>{row.day}</TableCell>
                  <TableCell  style={{ color: "white"}}>{row.hour}</TableCell>
                  <TableCell  style={{ color: "white"}}>{row.project}</TableCell>
                  <TableCell  style={{ color: "white"}}>{row.approved ? "Yes" : "No"}</TableCell>
                  <TableCell>
                    {" "}
                    {row.approved ? (
                      <EditSharp
                      style={{color:"gray"}}
                                          />
                    ) : (
                      <EditSharp
                      style={{color:"#F26628", cursor:'pointer'}}

                        onClick={() => toggleIdEdit(row.id)}
                      />
                    )}
                  </TableCell>
                  <TableCell>
                    {" "}
                    {row.approved ? (
                      <Delete
                      style={{color:"gray"}}
                      
                      />
                    ) : (
                      <Delete
                      style={{color:"#F26628", cursor:'pointer'}}

                        onClick={() => toggleIdDelete(row.id)}
                      />
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}
          </TableContainer>
        </Table>
      )}
    </Grid>
  );
}
function mapToProps(state) {
  return {
    token: state.createSession.token,
    account_id: state.createSession.account_id,
  };
}

export default connect(mapToProps)(Tables);
