import React from "react";
import { NavLink } from "react-router-dom";
import "./Menu.scss";
import welding from "../../images/welding-mask.svg";
import dashboard from "../../images/dashboard.svg";
import wrench from "../../images/wrench.png";

export default function Menu(props) {
  const { onMenu, toggleonMenu } = props;
  return (
    <div>
      <div className="app--top-menuButton" onClick={toggleonMenu}>
        <span className="app--hamburguerMenu-span"></span>
        <span className="app--hamburguerMenu-span"></span>
        <span className="app--hamburguerMenu-span"></span>
      </div>
      <nav className={onMenu ? "app-show-menu" : "app-hidden-menu"}>
        <div className="menu--top-navLinks">
          <div className="menu--linkImage">
            <img src={dashboard} alt="dashboard" className="menu--icons" />
            <NavLink
              onClick={toggleonMenu}
               activeStyle={{
                color:'#02B2DB'
              }}

              style={{
                fontfamily: "Titillium Web",
                color: "#888787",
                textDecoration: "none",
               
                fontSize: "3vh",
              }}
            
              to="/dashboard"
            >
              {" "}
              Dashboard{" "}
            </NavLink>
          </div>
          <div className="menu--linkImage">
          <img src={welding} alt="dashboard" className="menu--icons" />

            <NavLink
              onClick={toggleonMenu}
               activeStyle={{
                color:'#02B2DB'
              }}

              style={{
                fontfamily: "Titillium Web",
                color: "#888787",
                textDecoration: "none",
               
                fontSize: "3vh",
              }}
              to="/myhours"
            >
              {" "}
              My Hours{" "}

            </NavLink>
          </div>
          <div className="menu--linkImage">
          <img src={dashboard} alt="dashboard" className="menu--icons" />

            <NavLink
              onClick={toggleonMenu}
               activeStyle={{
                color:'#02B2DB'
              }}

              style={{
                fontfamily: "Titillium Web",
                color: "#888787",
                textDecoration: "none",
               
                fontSize: "3vh",
              }}
              to="/wall"
            >
              {" "}
              My wall{" "}
            </NavLink>
          </div>
          <div className="menu--linkImage">
          <img src={wrench} alt="dashboard" className="menu--icons" />

            <NavLink
              onClick={toggleonMenu}
               activeStyle={{
                color:'#02B2DB'
              }}

              style={{
                fontfamily: "Titillium Web",
                color: "#888787",
                textDecoration: "none",
               
                fontSize: "3vh",
              }}
              to="/settings"
            >
              {" "}
              Settings{" "}
            </NavLink>
          </div>
        </div>
      </nav>
    </div>
  );
}
