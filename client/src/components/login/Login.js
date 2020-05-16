import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import loginHelper from '../../services/API/loginHelper'
import {createSession} from '../../store/actions'
import gloves from '../../images/Gloves.svg'
import './Login.scss'

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
    loginHelper(value.email, value.password).then((res) =>   
   dispatch(
          createSession(
            res.data.id,
            res.data.token,
            res.data.firstname,
            res.data.lastname,
            res.data.adm,
            res.data.role,
            res.data.avatar,
            res.data.email
          ) 
        )).catch((err) => setMessage(err.response.data.message));
      
  };

  return (
    <main className='login-main'>
      
      <form
        className='login--center-form'
        onSubmit={handleSubmit(onSubmit)}
      >
      <div className='login-center-formInput'>
        <div className='login--top-circle'>
          <img src={gloves} alt="gloves"/>
        </div>
  <h1>{message}</h1>
        <label htmlFor="email">
          E-mail
        </label>
        <input
       
          type="text"
          name="email"
          ref={register({ required: true })}
        />
        {errors.email && "This field is required"}
        

        <label  htmlFor="password">
          Password
        </label>
        <input
          
          type="password"
          name="password"
          ref={register({ required: true })}
        />
        {errors.password && "This field is required"}
        
          <input type='submit' value="login"/>
          </div>
      </form>
    
      
    </main>
  );
}

export default Login;