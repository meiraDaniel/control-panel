import React from "react";
import MenuAdm from "../menuADM/MenuAdm";
import "./employeeInfo.scss";
import mask from "../../../images/welding-mask.svg";
import shoes from "../../../images/shoes.svg";
import doc from "../../../images/portable-document-format.svg";
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import {
  Button,
  Grid,

} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

export default function EmployeeInfo() {
  const history = useHistory();

  return (
    <Grid
      container
      justify="center"
      style={{ height: "100%", background: "#293F71" }}
    >
      <Grid item xs={11} style={{ height: "10%", marginTop: "0%" }}>
        <MenuAdm />
      </Grid>
      <Grid
        item
        xs={9}
        style={{
          height: "87%",
          marginTop: "3%",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Grid
          item
          xs={8}
          sm={4}
          style={{ cursor: "pointer", margin: "1%" }}
          onClick={() => history.push("/adm/employee-hours")}
          className="employeeInfo--row"
        >
          <img src={mask} alt="welding mask" />
          <NavLink
            to="/adm/employee-hours"
            style={{
              color: "white",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Employee Hours
          </NavLink>
        </Grid>

        <Grid
          item
          xs={8}
          sm={4}
          style={{
            cursor: "pointer",
            margin: "1%",
            color: "white",
            textDecoration: "none",
          }}
          className="employeeInfo--row"
        >
          <img id="disable" src={shoes} alt="shoes" />

          <li
       
            style={{
              color: "white",
              textDecoration: "none",
              listStyle: "none",
            }}
          >
            Employee Holidays
          </li>
        </Grid>

        <Grid
          item
          xs={8}
          sm={6}
          style={{ cursor: "pointer", margin: "1%" }}
          onClick={() => history.push("/adm/employee-documents")}
          className="employeeInfo--row"
        >
          <img src={doc} alt="documents" />

          <NavLink
            to="/adm/employee-documents"
            style={{
              color: "white",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Employee Documents
          </NavLink>
        </Grid>
      </Grid>
    </Grid>
  );
}
