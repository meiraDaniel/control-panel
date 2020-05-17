import React, { useEffect, useState } from "react";
import "./AdmDashboard.scss";
import { connect } from "react-redux";
import logo from '../../images/logo.svg'
import { useDispatch } from "react-redux";
import {logout,getId} from '../../store/actions'
import displayAllAccounts from '../../services/API/displayAllAccounts'
import placeHolder from '../../images/Butterfly.svg'
import {useHistory} from 'react-router-dom'

function AdmDashboard({ firstname, token, account_id }) {

  const dispatch = useDispatch();
const [data,setData]=useState([])
const history= useHistory()


  useEffect(()=>{
    getEmployees()
  },[])

const getEmployees= () =>{
  displayAllAccounts().then(res=> setData(res.data)).catch(err=> console.log(err))
}

  const  toggleLogout =() =>{
    dispatch(logout())
    }

  const goEmployeeInformation = (account_id)=>{
      dispatch(getId(account_id))
      history.push('/adm/employee')
  }
  return (
    <div className="AdmDashboard-main">
      <div className="AdmDashboard--top-nav">
          <img src={logo} alt="logo"/>
        <h2>Employees</h2>
      </div>
      <main className="AdmDashboard--display-main">
{data.length>0? data.map(( employee, i )=>
 <div key={i}>
   <img  onClick={()=>goEmployeeInformation(employee.account_id)} src={placeHolder} alt="placeholder"/>
   <h1>{employee.firstname} {employee.lastname}</h1>
 </div>
):<h1>Loading</h1>}
      </main>
      <button onClick={toggleLogout}>log out</button>

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
