import React,{useState,useEffect,useCallback} from "react";
import approveHourHelper from '../../../../services/API/approveHourHelper'
import approveAllHourHelper from  '../../../../services/API/approveAllHours'
import getEmployeeMonthHours from "../../../../services/API/getEmployeeMonthHours";
import PerdentageAdm from '../Percentage/PercentageAdm'
import './TableAms.scss'
import check from '../../../../images/check.svg'
import del from "../../../../images/delete.svg"

function TableAdm({tableYear,tableMonth,token,account_id}) {
const [table,setTable] =useState([])
const [flag,setFlag] =useState(false)
const [message,setMessage] =useState(false)
const[snakflag, setSnackflag]= useState(false)


const showTable =  useCallback(() => {
  getEmployeeMonthHours(account_id,tableYear,tableMonth,token).then(res=>{setTable(res.data)}).catch(err=>{setMessage(err.response.data.message);setSnackflag(!snakflag)})
},[account_id,tableYear,tableMonth,token,snakflag]);

useEffect(() => {
  showTable();
}, [flag,showTable]);



const[status,setStatus] =useState()

const handdleApproveHour = (hourId,token)=>{
  approveHourHelper(hourId,token)
  setFlag(!flag)
}
const handdleAllHourApproved = (token)=>{
  approveAllHourHelper(token).then(res=>setStatus('Yes'))
  setFlag(!flag)
}
  
  return (
    <div className='tableAdm--main'>
            <p onClick={()=>setSnackflag(!snakflag)} className={snakflag?"snackbar":"snackclose"} >{message}</p>

      <div className="tableAdm-top-totalInfo">
       {table.length>0? <PerdentageAdm table={table} />:null}
      </div>
      <div className="tableAdm-bottom-table">

<table>
        <thead>
          <tr className='tableAdm---header'>
            <td>Day</td>
            <td>Hour</td>
            <td>Project</td>
            <td>Aproved</td>
            <td>Approve</td>


          </tr>
        </thead>
        {table.map((row, index) => (
          <tbody key={index}>
            <tr className='tableAdm--table-main'>
              <td>{row.day}</td>
              <td>{row.hour}</td>
              <td>{row.project}</td>
              <td>{row.approved? <img src={check} alt='yes'/>: <img src={del} alt='no'/>}</td>
              <td>{row.approved? <img src={check} alt='yes'/>: status? status : <button id='button-approveHour'className='button' onClick={()=>handdleApproveHour(row.id)}>Aprove</button> }</td> 
             

            </tr>
          </tbody>
        ))}
      </table>
         <button id='tableadm--buton-approveall' className='button' onClick={handdleAllHourApproved}>Approve All</button>  
         </div>
    </div>

  );
  }


export default TableAdm;