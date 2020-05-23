import React, { useState } from "react";
import { useForm } from "react-hook-form";
import insertHelper from "../../services/API/insertHelper";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";

import "./Insert.scss";

function Insert({ token, account_id }) {
  const [message, setMessage] = useState("");
  const { register, errors, handleSubmit } = useForm();
  const history = useHistory();
  const [flagSnack, setflagSnack] = useState(false);

  const [image, setImage] = useState();

  /**
   * @function onSubmit -
   *  target the values inserted by the user and send it to the server
   *then send the response to the redux store.
   * @param {string} data -Values passed in the input
   * @param {*} e - event
   */

  const onSubmit = (value, e) => {
    e.preventDefault();

    const formData = new FormData();
    const data = [
      image,
      account_id,
      value.day,
      value.hour,
      value.project,
      token,
    ];
    data.forEach((e) => formData.append("file", e));
    insertHelper(formData)
      .then((res) => {
        setMessage(res.data.message);
        setflagSnack(!flagSnack);
      })
      .catch((err) => {
        setMessage(err.response.data.errors.message);
        setflagSnack(!flagSnack);
      });
  };
  const toggleBackMyHours = () => {
    history.push("/myhours");
  };

  const handleChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <main className="Insert-main">
      <p
        onClick={() => setflagSnack(!flagSnack)}
        className={flagSnack ? "snackbar" : "snackclose"}
      >
        {message}
      </p>
      <form className="Insert--center-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="Insert-center-formInput">
          <h1 className="Insert--top-circle">Insert Hours</h1>

          <label htmlFor="day">Day of the month</label>
          <input
            className="Insert--input"
            type="number"
            name="day"
            ref={register({ min: 1, max: 31 })}
          />
          {errors.day && "Day number cannot be greater than 31"}

          <label htmlFor="hour">Hours that you worked</label>
          <input
            className="Insert--input"
            type="number"
            name="hour"
            ref={register({ min: 0, max: 24 })}
          />
          {errors.hour && "Hours number cannot be greater than 24"}
          <label htmlFor="project">Project that you worked</label>
          <input
            className="Insert--input"
            type="text"
            name="project"
            ref={register({ required: false })}
          />
          <label htmlFor="documents">Upload document</label>
          <input
            onChange={handleChange}
            className="Insert--input"
            type="file"
            name="documents"
            ref={register({ required: false })}
          />

          <input className="button" type="submit" value="Send" />

          <button className="button" onClick={toggleBackMyHours}>
            Back
          </button>
        </div>
      </form>
    </main>
  );
}
function mapToProps(state) {
  return {
    token: state.createSession.token,
    account_id: state.createSession.id,
  };
}

export default connect(mapToProps)(Insert);
