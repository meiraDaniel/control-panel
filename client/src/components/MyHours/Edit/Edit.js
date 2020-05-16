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
            <h1>Edit Hours</h1>
          </div>
          <h4>{message}</h4>
          <label htmlFor="newProject">Project Name</label>
          <input
            type="text"
            name="newProject"
            ref={register({ required: true })}
          />

          {errors.newProject && "This field is required"}

          <label htmlFor="newHour">Hours</label>
          <input
            type="number"
            name="newHour"
            ref={register({ required: true })}
          />
          {errors.newHour && "This field is required"}

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
