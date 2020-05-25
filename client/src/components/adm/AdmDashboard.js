import React, { useEffect, useState } from "react";
import "./AdmDashboard.scss";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { getId } from "../../store/actions";
import displayAllAccounts from "../../services/API/displayAllAccounts";
import { useHistory } from "react-router-dom";
import MenuAdm from "./menuADM/MenuAdm";

function AdmDashboard() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const history = useHistory();
  const[flagSnack, setFlagSnack]= useState(false)
  const[message, setMessage]= useState(false)

  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = () => {
    displayAllAccounts()
      .then((res) => setData(res.data))
      .catch((err) => {setMessage(err);setFlagSnack(!flagSnack)});
  };

  const goEmployeeInformation = (account_id, avatar) => {
    dispatch(getId(account_id, avatar));
    history.push("/adm/employee");
  };
  return (
    <div className="AdmDashboard-main">
            <h1 onClick={()=>setFlagSnack(!flagSnack)} className={flagSnack?'snackbar':'snackclose'}>{message}</h1>

      <div className="AdmDashboard--top-nav">
        <MenuAdm />
      </div>
      <main className="AdmDashboard--display-main">
        <div className="AdmDashboard--top-rows">
          {data.length > 0 ? (
            data.map((employee, i) => (
              <div   onClick={() =>
                goEmployeeInformation(
                  employee.account_id,
                  employee.avatar_name
                )
              }className="AdmDashboard--eachEmployee-row" key={i}>
                <img
                  className="Adm--avatar"
                
                  src={employee.avatar_name}
                  alt="placeholder"
                />
                <h1>
                  {employee.firstname} {employee.lastname}
                </h1>
              </div>
            ))
          ) : (
            <h1>Loading</h1>
          )}
        </div>
      </main>
    </div>
  );
}

function mapToProps(state) {
  return {
    firstname: state.createSession.firstname,
    token: state.createSession.token,
    account_id: state.createSession.id,
  };
}

export default connect(mapToProps)(AdmDashboard);
