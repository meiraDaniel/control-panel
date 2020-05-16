import React,{useState} from "react";
import Edit from'./Edit/Edit'
import deleteDataFromHours from '../../services/API/deleteDataFromHours'
import { connect } from "react-redux";


function Table({ data,token,account_id}) {
const[popUpEdit,setPopUpEdit]=useState(false)
const[popUpDelete,setPopUpDelete]=useState(false)
const[rowId, setRowid]=useState()

const tooglePopUp=()=>{
  setPopUpEdit(!popUpEdit)
}
  const toggleIdEdit=(rowId)=>{
    setRowid(rowId)
   tooglePopUp()

  }
  const toggleIdDelete=(rowId)=>{
    deleteDataFromHours(parseInt(rowId),token).then(res=>console.log(res)).catch(err=>console.log(err))

   }

   const handleAproved=(isAproved)=>{
     if(isAproved) return "Yes"
     return "No"

   }

  
  return (
    <div>

    {popUpEdit||popUpDelete?
    popUpEdit?<Edit rowId={rowId} tooglePopUp={tooglePopUp}/>:<h1>Delete</h1>:
<table>
        <thead>
          <tr>
            <td>Day</td>
            <td>Hour</td>
            <td>Project</td>
            <td>Aproved</td>
            <td></td>


          </tr>
        </thead>
        {data.map((row, index) => (
          <tbody key={index}>
            <tr>
              <td>{row.day}</td>
              <td>{row.hour}</td>
              <td>{row.project}</td>
              <td>{handleAproved(row.aproved)}</td>
              <td><button onClick={()=>toggleIdEdit(row.id)}>Edit</button></td>
              <td><button onClick={()=>toggleIdDelete(row.id)}>Delete</button></td>

            </tr>
          </tbody>
        ))}
      </table>
            
    }
    </div>
  );
}
function mapToProps(state) {
  return {
    token: state.createSession.token,
    account_id: state.createSession.account_id,

  };
}

export default connect(mapToProps)(Table);