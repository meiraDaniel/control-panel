import React,{useState,useEffect} from "react";
import approveHourHelper from '../../../services/API/approveHourHelper'
import approveAllHourHelper from  '../../../services/API/approveAllHours'
import getEmployeeMonthHours from "../../../services/API/getEmployeeMonthHours";
import PerdentageAdm from './Percentage/PercentageAdm'


function TableAdm({tableYear,tableMonth,token,account_id}) {
const [table,setTable] =useState([])
const [flag,setFlag] =useState(false)
const [message,setMessage] =useState(false)

useEffect(() => {
  showTable();
}, [flag]);


  const showTable = () => {
    getEmployeeMonthHours(account_id,tableYear,tableMonth,token).then(res=>{setTable(res.data)}).catch(err=>setMessage(err.response.data.message))
  };
const[status,setStatus] =useState('')

const handdleApproveHour = (hourId,token)=>{
  approveHourHelper(hourId,token).then(res=>setStatus('Yes'))
  setFlag(!flag)
}
const handdleAllHourApproved = (token)=>{
  approveAllHourHelper(token).then(res=>console.log(res))
  setFlag(!flag)
}
  
  return (
    <div className='tableAdm--main'>
      <div className="tableAdm-top-totalInfo">
       {table.length>0? <PerdentageAdm table={table} />:null}
      </div>
      <div className="tableAdm-bottom-table">

<table>
        <thead>
          <tr>
            <td>Day</td>
            <td>Hour</td>
            <td>Project</td>
            <td>Aproved</td>
            <td>Approve</td>


          </tr>
        </thead>
        {table.map((row, index) => (
          <tbody key={index}>
            <tr>
              <td>{row.day}</td>
              <td>{row.hour}</td>
              <td>{row.project}</td>
              <td>{row.approved? 'Yes': 'No'}</td>
              <td>{row.approved? 'Yes': <button onClick={()=>handdleApproveHour(row.id)}>Aprove</button> }</td> 
             

            </tr>
          </tbody>
        ))}
      </table>
         <button  onClick={handdleAllHourApproved}>Approve All</button>  
         </div>
    </div>

  );
  }


export default TableAdm;