import React, { useState } from "react";
import { useForm } from "react-hook-form";
import MenuAdm from "../menuADM/MenuAdm";
import "./registerEmployee.scss";
import registerEmployeeHelper from "../../../services/API/registerEmployeeHelper";

function RegisterEmployee({ token, account_id }) {
  const { register, errors, handleSubmit } = useForm();
  const [image, setImage] = useState({ preview: '', raw: '' })

  const onSubmit = async  (value, e) => {
    e.preventDefault();

    const formData = new FormData();
    const data = [image.raw, value.firstname,value.lastname,value.email,value.role,value.password];
    data.forEach((e) => formData.append("file", e));

   registerEmployeeHelper(formData)
  }
 
  const handleChange = (e) => {
    setImage({
     preview: URL.createObjectURL(e.target.files[0]),
     raw: e.target.files[0]
    })
   }
 

  return (
    <main>
      {/* <div className="AdmDashboard--top-nav">
      <MenuAdm/>
      </div> */}

      <form className="register--main" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h1>Add new Employee</h1>
          <label htmlFor="avatar">Avatar</label>
          <input onChange={handleChange} type="file" name="avatar" />
       {image.preview ?<img src={image.preview}/>:null}
        <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            name="firstname"
            ref={register({ required: true })}
          />
          {errors.day && "This field is required"}
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            name="lastname"
            ref={register({ required: true })}
          />
          {errors.day && "This field is required"}
          <label htmlFor="email">Email</label>
          <input type="text" name="email" ref={register({ required: true })} />
          {errors.day && "This field is required"}

          

          <label htmlFor="role">Role</label>
          <input type="text" name="role" ref={register({ required: true })} />
          {errors.day && "This field is required"}
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            ref={register({ required: true })}
          />
          {errors.day && "This field is required"}

          <input type="submit" value="send" />
        </div>
      </form>
    </main>
  );
}

export default RegisterEmployee;
