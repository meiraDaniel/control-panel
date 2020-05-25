import React, { useState,useCallback } from "react";
import { connect } from "react-redux";
import { useEffect } from "react";
import getEmployeeHours from "../../../../services/API/getEmployeeHours";
import "./employeeHours.scss";
import { useHistory } from "react-router-dom";
import { getMonthName } from "../../../../services/services";
import TableAdm from "./TableAdm";


function EmployeeHours({ account_id, token,avatar }) {
  const [years, setYears] = useState([]);
  const [months, setMonths] = useState([]);

  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [tableYear, setTableYear] = useState();
  const [tableMonth, setTableMonth] = useState();

  const [flag, setflag] = useState(false);
  const [tableFlag, setTableFlag] = useState(false);
const[snakflag, setSnackflag]= useState(false)

  const history = useHistory();

  const toggleEmployeeHours =  useCallback(() => {
    getEmployeeHours(account_id, token)
      .then((res) => {
        setData(res.data);
        res.data.forEach((item) => {setYears([item.year]);setSnackflag(!snakflag)});
      })
      .catch((err) => {setMessage(err.response.data.message);setSnackflag(!snakflag)});
  },[account_id, token,snakflag]);

  useEffect(() => {
    toggleEmployeeHours();
  }, [toggleEmployeeHours]);

  

  const handleYears = async (year) => {
    await setTableYear(year);
   
     data
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
    <div className="employeeHours--main">
      <p onClick={()=>setSnackflag(!snakflag)} className={snakflag?"snackbar":"snackclose"} >{message}</p>
      <div className="employeeHours--top">
        <h2>Employees</h2>
      </div>
      <div className="employeeHours--center-main">
        <div className="employeeHours--left-selectYear">
          <div className="employeeHours-left-top-avatar">
            <img src={avatar} alt="placeholder" />
          </div>
          <div className="employeeHours--left-bottom-yearlist">
            {years ? (
              years
                .filter((v, i) => years.indexOf(v) === i)
                .map((year, i) => (
                  <button className='button' onClick={() => handleYears(year)} key={i}>
                    {year}
                  </button>
                ))
            ) : (
              <p>No data Avaible</p>
            )}
          </div>
          <button id='employeeHours--button-back'className='button' onClick={() => history.push("/adm/dashboard")}>BACK</button>

        </div>
        <div className="employeeHours--rigth-information">
          <div className="employeeHours--right-top-select">
            {flag ? (
              <select  className="employeeHours--select" onChange={showTable} name="months" id="months">
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
          <div className="employeeHours-right-center-table">
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
    avatar: state.getId.avatar,

    token: state.createSession.token,
  };
}

export default connect(mapToProps)(EmployeeHours);
