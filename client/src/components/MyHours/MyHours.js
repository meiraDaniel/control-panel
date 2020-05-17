import React,{useState,useEffect} from 'react'
import { connect } from "react-redux";
import  getAllDataFromHours from '../../services/API/getAllDataFromHours'
import { getMonthName } from "../../services/services";
import Table from './Table'
import {useHistory} from 'react-router-dom'

import './MyHours.scss'

const MyHours = ({account_id,token}) => {
const [data,setData] =useState([])
const [message,setMessage] =useState('')
const history =useHistory()
const[mountFlag,setmountFlag] =useState(true)

useEffect(() => {
  fechData(); 
  
 },[mountFlag]);

const fechData = ()=>{
  getAllDataFromHours(account_id,token).then(res=> setData(res.data)).catch(err=> setMessage(err.response.data.message))
}
const toggleInsert=()=>{
  history.push('/insert')
}
const handlemountFlag =()=>{
  setmountFlag(!mountFlag)
}
  return (
    <div className='myHours--main'>
      <div className='myHours--top'>
        <button onClick={toggleInsert}>Add Hours</button>
  {data.length>0? <h2>{getMonthName(data[0].month +1)}</h2>:null}
      </div>
    <main className='myHours--center-table'> 
      <Table data={data} handlemountFlag={handlemountFlag}/>
    </main>
  {message?<p>{message}</p>:null}
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