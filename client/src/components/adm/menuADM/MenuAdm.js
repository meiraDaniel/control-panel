import React from 'react'
import { NavLink } from "react-router-dom";
import './MenuAdm.scss'
import logoutIcon from  '../../../images/logout.svg'
import {logout} from '../../../store/actions'
import { useDispatch } from "react-redux";

 function MenuAdm  () {
    const dispatch = useDispatch();

    const  toggleLogout =() =>{
        dispatch(logout())
        }
    
    return (
        <div className='menuAdm--main'>
            <h2>Employees</h2>
            <NavLink to ='/adm/employee-add' style={{color:"white", marginLeft:"3%", textDecoration:"none"}}> New employee </NavLink>
            <img id='logout' onClick={toggleLogout} src={logoutIcon} alt="logout"/>

        </div>
    )
}
export default MenuAdm