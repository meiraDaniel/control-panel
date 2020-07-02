import React, { useState } from "react";
import { useForm,ErrorMessage } from "react-hook-form";
import MenuAdm from "../menuADM/MenuAdm";
import "./registerEmployee.scss";
import registerEmployeeHelper from "../../../services/API/registerEmployeeHelper";

function RegisterEmployee({ token, account_id }) {
  const { register, errors, handleSubmit } = useForm();
  const [image, setImage] = useState({ preview: "", raw: "" });
  const[message, setMessage]= useState("")
  const[snackBarFlag,setSnackBarFlag]=useState(false)

  const onSubmit = async (value, e) => {
    e.preventDefault();

    const formData = new FormData();
    const data = [
      image.raw,
      value.firstname,
      value.lastname,
      value.email,
      value.role,
      value.password,

    ];
    data.forEach((e) => formData.append("file", e));

    registerEmployeeHelper(formData).then(response=> {setMessage(response.data);setSnackBarFlag(true)}).catch(err=>{setMessage(err.response.data.message);setSnackBarFlag(true)});
  };

  const handleChange = (e) => {
    setImage({
      preview: URL.createObjectURL(e.target.files[0]),
      raw: e.target.files[0],
    });
  };

  return (
    <main className="register--main">
              <h1 data-testid='snackbar' onClick={()=>setSnackBarFlag(!snackBarFlag)} className={snackBarFlag?'snackbar':'snackclose'}>{message}</h1>

      <div className="top-nav">
        <MenuAdm />
      </div>
      <div className="bottom">
        <form
          data-testid="register-employee-form"
          className="center-form-big"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-wrapper">
            {image.preview ? (
              <div className="register--wrapper-avatar">
                <img
                 
                  src={image.preview}
                  id="avatar"
                  alt="avatar"
                />
              </div>
            ) : (
              <div className="register--wrapper-avatar">
                <input
                 
                  className="register--center-avatar"
                  onChange={handleChange}
                  type="file"
                  name="avatar"
                />
              </div>
            )}
            <div className="center-inputs-big">
              <label aria-labelledby='firstname' data-testid="register-employee-label-name" htmlFor="firstname">
                First Name
              </label>
              <input
                data-testid="register-employee-input-name"
                className="input-big"
                type="text"
                name="firstname"
                ref={register({ required: true })}
              />
              {errors.firstname && "Name field is required"}
            </div>
            <div className="center-inputs-big">
              <label aria-labelledby='lastname' data-testid="register-employee-label" htmlFor="lastname">
                Last Name
              </label>
              <input
                data-testid="register-employee-input-last"
                className="input-big"
                type="text"
                name="lastname"
                ref={register({ required: true })}
              />
              {errors.lastname && "Lastname field is required"}
            </div>
            <div className="center-inputs-big">
              <label  aria-labelledby='email' data-testid="register-employee-label" htmlFor="email">
                Email
              </label>
              <input
                data-testid="register-employee-input-email"
                className="input-big"
                type="text"
                name="email"
                ref={register({ required: true })}
              />
              {errors.email && "Email field is required"}
            </div>
            <div className="center-inputs-big">
              <label  aria-labelledby='password' data-testid="register-employee-label" htmlFor="email">
              Password
              </label>
              <input
                data-testid="register-employee-input-password"
                className="input-big"
           
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
      </ErrorMessage>            </div>
            <div className="center-inputs-big">
              <label aria-labelledby='role' data-testid="register-employee-label" htmlFor="role">
                Role
              </label>
              <input
                data-testid="register-employee-input-role"
                className="input-big"
                type="text"
                name="role"
                ref={register({ required: false })}
              />
         
            </div>
            <input
              data-testid="register-employee-button"
              className="button"
              type="submit"
              value="SEND"
            />
          </div>
        </form>
      </div>
    </main>
  );
}

export default RegisterEmployee;
