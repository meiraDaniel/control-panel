import React,{useState,useEffect} from 'react'
import { connect } from "react-redux";
import  getPostWallHelper from '../../services/API/getAllDataFromHours'
import { getMonthName } from "../../services/services";
import Table from './Table'

import './MyHours.scss'

const MyHours = ({account_id,token}) => {
const [data,setData] =useState([])
const [message,setMessage] =useState('')


useEffect(() => {
  fechData(); 
 },[]);

const fechData = ()=>{
  getPostWallHelper(account_id,token).then(res=> setData(res.data)).catch(err=> setMessage(err.response.data.message))
}
  return (
    <div className='myHours--main'>
      <div className='myHours--top'>
        <button>Add Hours</button>
  {data.length>0? <h2>{getMonthName(data[0].month +1)}</h2>:null}
      </div>
    <main className='myHours--center-table'> 
      <Table data={data}/>
    </main>
    </div>
  )
}
function mapToProps(state) {
  return {
    token: state.createSession.token,
    account_id: state.createSession.id,
  };
}

export default connect(mapToProps)(MyHours)