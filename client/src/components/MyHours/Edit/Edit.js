import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import editHoursHelper from "../../../services/API/editHoursHelper";
import './Edit.scss'

function Edit({ token, rowId, tooglePopUp }) {
  const { register, errors, handleSubmit } = useForm();
  const [message, setMessage] = useState("");
const[flagSnack,setFlagSnack] =useState(false)
  const onSubmit = (value, e) => {
    e.preventDefault();
  editHoursHelper(rowId, value.newProject, value.newHour, token)
      .then((res) => {setMessage(res.data.message);setFlagSnack(!flagSnack)})
      .catch((err) => {setMessage(err.response.data.message);setFlagSnack(!flagSnack)}); 
  };
  return (
    <div className="edit-main">
      <h1 onClick={()=>setFlagSnack(!flagSnack)} className={flagSnack?'snackbar':'snackclose'}>{message}</h1>
      <form className='edit-center-form'onSubmit={handleSubmit(onSubmit)}>
         
         <div className='edit-center-formInput'>
          <label htmlFor="newProject">Project Name</label>
          <input
          className='input'
            type="text"
            name="newProject"
            ref={register({ required: true })}
          />
          {errors.newHour && "Don't forget to enter your project's name"}


          <label htmlFor="newHour">Hours</label>
          <input
                    className='input'

            type="number"
            name="newHour"
            ref={register({required: true, min: 0, max: 24})}
          />
          {errors.newHour && "Add a number between 0 and 24"}

          <input  className='button' type="submit" value="send" />
          <button   className='button' onClick={tooglePopUp}>back</button>

          </div>
        
      </form>
    </div>
  );
}

function mapToProps(state) {
  return {
    token: state.createSession.token,
    account_id: state.createSession.id,
  };
}

export default connect(mapToProps)(Edit);
