import React, { useState, useEffect, useCallback } from "react";
import ProgressBar from "../../../AprovedHours/ProgressBar";
import { Button, Grid } from "@material-ui/core";
function PercentageAdm({ table }) {
  const [percentageDays, setPercentageDays] = useState([]);
  const [percentageMonths, setPercentageMonths] = useState([]);

  const handleWorkDays = useCallback(() => {
    const num = table.length;
    setPercentageDays(Math.round((num * 100) / 20));
  }, [table]);

  const handleMonthWorked = useCallback(() => {
    let month = [];
    table.forEach((item) => month.push(item.month));
    const uniqueMonth = month.filter((v, i) => month.indexOf(v) === i);
    const num = uniqueMonth.length;
    setPercentageMonths(Math.round((num * 100) / 12));
  }, [table]);

  useEffect(() => {
    handleWorkDays();
  }, [handleWorkDays]);

  useEffect(() => {
    handleMonthWorked();
  }, [handleMonthWorked]);

  return (
    <Grid container spacing={2} align="center">
      <Grid item xs={5} style={{ display: "flex" }}>
        <h2 className="name-progress">Days worked </h2>
        <ProgressBar
          size={window.innerWidth<800? 50:100}
          strokeWidth={window.innerWidth<800? 5:9}
          circleOneStroke="#888787"
          circleTwoStroke="#01D3BA"
          percentage={percentageDays}
        />
      </Grid>
      <Grid item xs={5} style={{ display: "flex" }}>
        <h2 className="name-progress">Months worked </h2>
        <ProgressBar
            size={window.innerWidth<800? 50:100}
            strokeWidth={window.innerWidth<800? 5:9}
          circleOneStroke="#888787"
          circleTwoStroke="#01D3BA"
          percentage={percentageMonths}
        />
      </Grid>
    </Grid>
  );
}

export default PercentageAdm;
