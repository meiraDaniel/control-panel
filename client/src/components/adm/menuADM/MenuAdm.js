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
            
            <NavLink to ='/adm/dashboard' style={{color:"white", marginLeft:"3%", fontSize:"4vh",fontWeight:"700" ,textDecoration:"none"}}> Employees </NavLink>

            <NavLink to ='/adm/employee-add'activeStyle={{color:"#01D3BA"}} style={{color:"white", marginLeft:"3%", textDecoration:"none"}}> New employee </NavLink>
            <img data-testid='menuadm-image' id='logout' onClick={toggleLogout} src={logoutIcon} alt="logout"/>

        </div>
    )
}
export default MenuAdm