import React, { useEffect, useState } from "react";
import "./AdmDashboard.scss";
import { connect } from "react-redux";
import { useDispatch } from "react-redux";
import { getId } from "../../store/actions";
import displayAllAccounts from "../../services/API/displayAllAccounts";
import placeHolder from "../../images/Butterfly.svg";
import { useHistory } from "react-router-dom";
import MenuAdm from "./menuADM/MenuAdm";

function AdmDashboard() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const history = useHistory();

  useEffect(() => {
    getEmployees();
  }, []);

  const getEmployees = () => {
    displayAllAccounts()
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  const goEmployeeInformation = (account_id, avatar) => {
    dispatch(getId(account_id, avatar));
    history.push("/adm/employee");
  };
  return (
    <div className="AdmDashboard-main">
      <div className="AdmDashboard--top-nav">
        <MenuAdm />
      </div>
      <main className="AdmDashboard--display-main">
        <div className="AdmDashboard--top-rows">
          {data.length > 0 ? (
            data.map((employee, i) => (
              <div className="AdmDashboard--eachEmployee-row" key={i}>
                <img
                  className="Adm--avatar"
                  onClick={() =>
                    goEmployeeInformation(
                      employee.account_id,
                      employee.avatar_name
                    )
                  }
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
