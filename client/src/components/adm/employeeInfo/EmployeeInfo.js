import React from 'react'
import MenuAdm from "../menuADM/MenuAdm"
import './EmployeeInfo.scss'
import mask from '../../../images/welding-mask.svg'
import shoes from '../../../images/shoes.svg'
import doc from '../../../images/portable-document-format.svg'
import { NavLink } from "react-router-dom";


 export default function EmployeeInfo ()  {
    return (
        <div className="EmployeeInfo-main">
             <div className="employeeInfo--top-nav">
        <MenuAdm />
      </div>
      <main className="employeeInfo--display-main">
         
              <div className="employeeInfo--row" >
             <img src={mask} alt="welding mask"/>
                <NavLink to="/adm/employee-hours" style={{color:"white", textDecoration:"none", cursor:'pointer'}}>
                 Employee Hours
                </NavLink>
              </div>
              <div className="employeeInfo--row" style={{color:"white", textDecoration:"none", cursor:'pointer'}}>
              <img src={shoes} alt="shoes"/>

             <NavLink to="/adm/employee-documents" style={{color:"white", textDecoration:"none"}}>
              Employee Holidays
             </NavLink>
           </div>
           <div className="employeeInfo--row" >
           <img src={doc} alt="documents"/>

             <NavLink to="/adm/employee-documents" style={{color:"white", textDecoration:"none", cursor:'pointer'}}>
              Employee Documents
             </NavLink>
           </div>
      </main>
        </div>
    )
}
