import React, { useState } from "react";
import { useForm,ErrorMessage } from "react-hook-form";
import editProfile from '../../services/API/editProfile'
import {createSession} from '../../store/actions'
import { useDispatch } from "react-redux";
import formSettigHelper from '../../services/API/formSettigHelper'
import './FormProfile.scss'

function FormProfile({ data}) {
  const { register, errors, handleSubmit } = useForm();
  const [message, setMessage] = useState("");
  const [notification, setNotification] = useState(false);
  const[snackFlag,setSnackFlag]=useState(false)

  const dispatch = useDispatch();

  const onSubmit = (value, e) => {
    e.preventDefault();
 let newEmail, newRole,newPassword

 if(!value.email){newEmail=data.email} 
 if(!value.role){ newRole=data.role} 

if(value.email){newEmail =value.email}
if(value.role){ newRole =value.role}
if(value.password){ newPassword=value.password} 

  editProfile(data.id,newRole,newEmail,data.token,notification,newPassword)
 .then(res=> {setMessage(res.data.message);handleDispach();setSnackFlag(!snackFlag)}).catch(err=> {setMessage(err.response.data.message);setSnackFlag(!snackFlag)}) 
};
const toggleNotification =() =>{
  setNotification(!notification)
}
const handleDispach=()=>{
  formSettigHelper(data.id,data.token).then((res) =>{  dispatch(
        createSession(
          res.data.id,
          data.token,
          res.data.firstname,
          res.data.lastname,
          res.data.adm,
          res.data.role,
          res.data.avatar,
          res.data.email
        ))  
}).catch(err=>{setMessage('Something is wrong');setSnackFlag(!snackFlag)})}
  return (
    <div className='formProfile--main'>
      <form className='center-form' onSubmit={handleSubmit(onSubmit)}>
        <div>

          <div className="center-formInput">
          
          <label htmlFor="role">Role</label>
          <input
          className='input'
            type="text"
            name="role"
            ref={register({ required: false })}
          />
</div>
<div className="center-formInput">

          <label htmlFor="role">email</label>
          <input
                    className='input'

            type="email"
            name="email"
            ref={register({ required: false })}
          />
          </div>
          <div className="center-formInput">

           <label htmlFor="role">password</label>

          <input
                    className='input'

            type="password"
            name="password"
            ref={register({
              minLength: {
                value: 8,
                message: 'Your password is too short'
              },
              pattern: {
                value: /(?=.*[A-Z])/,
                message: 'The string must contain at least 1 uppercase alphabetical character' 
              }
            })}
          />
             <ErrorMessage errors={errors} name="password">
        {({ message }) => <p>{message}</p>}
      </ErrorMessage>
          </div>        
            <div className="switch--input">
<p>OFF</p>
          <label className="switch">
  <input onClick={toggleNotification} type="checkbox" name="notification"/>
  <span className="slider round"></span>
</label>
<p>ON</p>
</div>


          <input id="formProfile--buton" className='button' type="submit" value="send" />
        </div>
      </form>
 <p onClick={()=> setSnackFlag(!snackFlag)} className={snackFlag?'snackbar':'snackclose'}>{message}</p>

    </div>
  );
}



export default FormProfile;