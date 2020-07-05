import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import PostAddIcon from "@material-ui/icons/PostAdd";
import SettingsIcon from "@material-ui/icons/Settings";
import DashboardIcon from "@material-ui/icons/Dashboard";
import WorkIcon from "@material-ui/icons/Work";
import { useHistory } from "react-router-dom";

export default function LabelBottomNavigation() {
  const history = useHistory();
  const [value, setValue] = React.useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleChange}
      style={{
        background: "transparent",
        position: "absolute",
      }}
      className="navegation"
    >
      <BottomNavigationAction
        onClick={() => history.push("/dashboard")}
        label="Dashboard"
        value="folder"
        icon={<DashboardIcon />}
      />
      <BottomNavigationAction
        onClick={() => history.push("/wall")}
        label="My wall"
        value="nearby"
        icon={<PostAddIcon />}
      />
      <BottomNavigationAction
        onClick={() => history.push("/myhours")}
        label="My hours"
        value="recents"
        icon={<WorkIcon />}
      />
      <BottomNavigationAction
        onClick={() => history.push("/settings")}
        label="Settings"
        value="favorites"
        icon={<SettingsIcon />}
      />
    </BottomNavigation>
  );
}
