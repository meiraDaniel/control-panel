import React, { useState } from "react";
import { connect } from "react-redux";
import { useEffect } from "react";
import getEmployeeHours from "../../../services/API/getEmployeeHours";
import placeHolder from "../../../images/Butterfly.svg";
import logo from "../../../images/logo.svg";
import "./employeeInfo.scss";
import { useHistory } from "react-router-dom";
import { getMonthName } from "../../../services/services";
import TableAdm from "./TableAdm";


function EmployeeInfo({ account_id, token }) {
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);

  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [tableYear, setTableYear] = useState();
  const [tableMonth, setTableMonth] = useState();

  const [flag, setflag] = useState(false);
  const [tableFlag, setTableFlag] = useState(false);

  const history = useHistory();

  useEffect(() => {
    toggleEmployeeHours();
  }, []);

  const toggleEmployeeHours = () => {
    getEmployeeHours(account_id, token)
      .then((res) => {
        setData(res.data);
        res.data.forEach((item) => setYears([item.year]));
      })
      .catch((err) => setMessage(err.response.data.message));
  };

  const handleYears = async (year) => {
    await setTableYear(year);
    let month = [];
    await data
      .filter((obj) => obj.year === year)
      .forEach((item) => setMonths([item.month]));
    setflag(!flag);
  };

  const showTable = async (e) => {
     const month = e.target.value
     await setTableMonth(month)
    setTableFlag(!tableFlag);
  };

  return (
    <div className="employeeInfo--main">
      <div className="employeeInfo--top">
        <img src={logo} alt="logo" />
        <h2>Employees</h2>
      </div>
      <div className="employeeInto--center-main">
        <div className="employeeInfo--left-selectYear">
          <div className="employeeInfo-left-top-avatar">
            <img src={placeHolder} alt="placeholder" />
            <button onClick={() => history.push("/adm/dashboard")}>BACK</button>
          </div>
          <div className="employeeIndo--left-bottom-yearlist">
            {years ? (
              years
                .filter((v, i) => years.indexOf(v) === i)
                .map((year, i) => (
                  <button onClick={() => handleYears(year)} key={i}>
                    {year}
                  </button>
                ))
            ) : (
              <p>No data Avaible</p>
            )}
          </div>
        </div>
        <div className="employeeInfo--rigth-information">
          <div className="employeeInfo--right-top-select">
            {flag ? (
              <select onChange={showTable} name="months" id="months">
                <option value="none">Select a Month</option>
                {months
                  .filter((v, i) => months.indexOf(v) === i)
                  .map((month, i) => (
                    <option key={i} value={month}>
                      {getMonthName(parseInt(month) + 1)}
                    </option>
                  ))}
              </select>
            ) : null}
          </div>
          <div className="employeeInfo-right-center-table">
          {tableFlag? 
            <div className="employee--bottom-table">
           <TableAdm tableYear={tableYear} tableMonth={tableMonth} account_id={account_id} token={token}/>
          </div>:null}
          </div>
        </div>
      </div>
    </div>
  );
}

function mapToProps(state) {
  return {
    account_id: state.getId.account_id,
    token: state.createSession.token,
  };
}

export default connect(mapToProps)(EmployeeInfo);
