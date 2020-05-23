import React, { useState } from "react";
import { useForm } from "react-hook-form";
import editProfile from '../../services/API/editProfile'
import {createSession} from '../../store/actions'
import { useDispatch } from "react-redux";
import formSettigHelper from '../../services/API/formSettigHelper'
import './FormProfile.scss'

function FormProfile({ data}) {
  const { register, errors, handleSubmit } = useForm();
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const onSubmit = (value, e) => {
    e.preventDefault();
    let newEmail, newRole

 if(!value.email){newEmail=data.email} 
 if(!value.role){ newRole=data.role} 
if(value.email){newEmail =value.email}
if(value.role){ newRole =value.role}

console.log(newRole,newEmail)
  editProfile(data.id,newRole,newEmail,data.token)
 .then(res=> {setMessage(res.data.message);handleDispach()}).catch(err=> setMessage(err.response.data.message)) 
};

const handleDispach=()=>{
  formSettigHelper(data.id,data.token).then((res) =>{  console.log(res);  dispatch(
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
}).catch(err=>console.log(err))}

  return (
    <div className='formProfile--main'>
      <form className='formProfile--center-form' onSubmit={handleSubmit(onSubmit)}>
        <div>
          
  <h1>Settings</h1>
          <div className="formprofile--center-inputs">
          
          <label htmlFor="role">Role</label>
          <input
          className='formProfile--input'
            type="text"
            name="role"
            ref={register({ required: false })}
          />

          <label htmlFor="role">email</label>
          <input
                    className='formProfile--input'

            type="email"
            name="email"
            ref={register({ required: false })}
          />
</div>

          <input id="formProfile--buton" className='button' type="submit" value="send" />
        </div>
      </form>
    </div>
  );
}



export default FormProfile;