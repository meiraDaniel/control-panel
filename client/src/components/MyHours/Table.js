import React,{useState} from "react";
import Edit from'./Edit/Edit'
import deleteDataFromHours from '../../services/API/deleteDataFromHours'
import { connect } from "react-redux";
import edit from '../../images/edit.svg'
import del from '../../images/delete.svg'
import './Table.scss'


function Table({ data,token,account_id,handlemountFlag}) {
const[popUpEdit,setPopUpEdit]=useState(false)
const[popUpDelete,setPopUpDelete]=useState(false)
const[rowId, setRowid]=useState()
const[message,setMessage]=useState('')
const tooglePopUp=()=>{
  setPopUpEdit(!popUpEdit)
  handlemountFlag()

}
  const toggleIdEdit=(rowId)=>{
    setRowid(rowId)
   tooglePopUp()

  }
  const toggleIdDelete=(rowId)=>{
    if(data.aproved) return setMessage('You cannot delete aproved hour');
   else{ deleteDataFromHours(parseInt(rowId),token).then(res=>console.log(res)).catch(err=>console.log(err))
    handlemountFlag()}
   }

   

  
  return (
    <div className='Table--main'>

    {popUpEdit||popUpDelete?
    popUpEdit?<Edit rowId={rowId} tooglePopUp={tooglePopUp}/>:<h1>Delete</h1>:
<table className='Table--center-table'>
        <thead>
          <tr>
            <td className='table--top-headlines'>Day</td>
            <td className='table--top-headlines'>Hour</td>
            <td className='table--top-headlines'>Project</td>
            <td className='table--top-headlines'>Aproved</td>
            <td className='table--top-headlines'>Edit</td>
            <td className='table--top-headlines'>Delete</td>


          </tr>
        </thead>
        {data.map((row, index) => (
          <tbody key={index}>
            <tr>
              <td>{row.day}</td>
              <td>{row.hour}</td>
              <td>{row.project}</td>
              <td>{row.approved? 'Yes': 'No'}</td>
              <td>< img className='icons' src={edit} alt='delete' onClick={()=>toggleIdEdit(row.id)}/></td>
              <td><img  className='icons' src={del} ald='edit' onClick={()=>toggleIdDelete(row.id)}/></td>

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