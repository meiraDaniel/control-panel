import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";


function Login() {
  const [message, setMessage] = useState("");
  const { register, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();

  /**
   * @function onSubmit -
   *  target the values inserted by the user and send it to the server
   *then send the response to the redux store.
   * @param {string} data -Values passed in the input
   * @param {*} e - event
   */

  const onSubmit = (value, e) => {
    e.preventDefault();
    loginHelper(value.email, value.password)
      .then((res) =>
        dispatch(
          createSession(
            res.data.account_id,
            res.data.message,
            res.data.token,
            res.data.firstname,
            res.data.lastname
          )
        )
      )
      .catch((err) => setMessage(`${err.response.data.message.message}`));
  };

  return (
    <main className="main_login">
      <div className='centrilized-content'>
      <img src={secure} alt="secure" id="image-login-secure"/>
      <form
        className="form-login"
        data-testid="form-component"
        onSubmit={handleSubmit(onSubmit)}
      >
        <p>{message}</p>
        <div className='input-component'>
        <label data-testid="test-label" htmlFor="email">
          E-mail
        </label>
        <input
          data-testid="input-form-email"
          type="text"
          name="email"
          ref={register({ required: true })}
        />
        {errors.email && "This field is required"}
        

        <label data-testid="test-label" htmlFor="password">
          Password
        </label>
        <input
          data-testid="input-form-password"
          type="password"
          name="password"
          ref={register({ required: true })}
        />
        {errors.password && "This field is required"}
        </div>
        <div className='buttonsDiv-login'>
          <button
            data-testid="submit-button"
            type="submit"
          >
            {" "}
            Login{" "}
          </button>
          <button
            onClick={() =>
              (window.location = "http://localhost:5000/auth/google")
            }
          >
            {" "}
            Google +
          </button>
        </div>
      </form>
      </div>
      
    </main>
  );
}

export default Login;