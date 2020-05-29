import React from 'react'
import  './Settings.scss'
import { connect } from "react-redux";
import DisplayProfile from './DisplayProfile'
import FormProfile from "./FormProfile"
import logo from '../../images/logo.svg'
function Settings ({data}) {


    return (
        <div>
        <div className="dashboard--top-nav">
       <h2 className='page-name'>Settings</h2>

          <img src={logo} alt="logo" />
      </div> 
        <div  className='settings-main'>
            <div className='settings-center-main'>
        <div className='settings-left-main'>
            <DisplayProfile data={data}/>
        </div>
<div className='settings-rigth-main'>
    <FormProfile data={data}/>
</div>
</div>
</div>
        </div>
    )
}

function mapToProps(state) {
    return {
      data: state.createSession,
    
    };
  }
  
  export default connect(mapToProps)(Settings);
