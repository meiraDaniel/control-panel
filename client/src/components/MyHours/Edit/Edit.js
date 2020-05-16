import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import editHoursHelper from "../../../services/API/editHoursHelper";

function Edit({ token, rowId, tooglePopUp }) {
  const { register, errors, handleSubmit } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = (value, e) => {
    e.preventDefault();
  editHoursHelper(rowId, value.newProject, value.newHour, token)
      .then((res) => setMessage(res.data.message))
      .catch((err) => setMessage(err.response.data.message)); 
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div className="login--top-circle">
  {message?<h1>{message}</h1>:<h1>Edit Hours</h1>}
          </div>
          
          <label htmlFor="newProject">Project Name</label>
          <input
            type="text"
            name="newProject"
            ref={register({ required: false })}
          />


          <label htmlFor="newHour">Hours</label>
          <input
            type="number"
            name="newHour"
            ref={register({ min: 0, max: 24})}
          />
          {errors.newHour && "Add a number between 0 and 24"}

          <input type="submit" value="send" />
        </div>
      </form>
      <button onClick={tooglePopUp}>back</button>
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
