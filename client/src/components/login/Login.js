import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import loginHelper from '../../services/API/loginHelper'
import {createSession} from '../../store/actions'
import gloves from '../../images/Gloves.svg'
import './Login.scss'
import logo from '../../images/logo.svg'
function Login() {
  const [message, setMessage] = useState("");
  const { register, errors, handleSubmit } = useForm();
  const dispatch = useDispatch();
const[snackBarFlag,setSnackBarFlag]=useState(false)
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
        )).catch((err) =>{ setMessage(err.response.data.message); setSnackBarFlag(!snackBarFlag)});
      
  };

  return (
    <main className='login-main'>
        <h1 onClick={()=>setSnackBarFlag(!snackBarFlag)} className={snackBarFlag?'snackbar':'snackclose'}>{message}</h1>

      <img src={logo} alt="logo" className='logo'/>
      
      <form
        className='center-form'
        onSubmit={handleSubmit(onSubmit)}
      >
      <div className='center-formInput'>
        <div id="gloves-circle" className='top-circle'>
          <img src={gloves} alt="gloves"/>
        </div>
       
        <input
         className='input'
          type="text"
          name="email"
          ref={register({ required: true })}
          placeholder="E-mail"
        />
        {errors.email && "Ops, don't forget to enter your email"}
        

      
        <input
                   className='input'

          type="password"
          name="password"
          ref={register({ required: true })}
          placeholder="password"
        />
        {errors.password && "Ops, don't forget to enter your password"}
        
          <input id='login' className='button' type='submit' value="LOGIN"/>
          </div>
      </form>
    
      
    </main>
  );
}

export default Login;