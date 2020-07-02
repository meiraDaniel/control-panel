import React from 'react'
import MenuAdm from "../menuADM/MenuAdm"
import './employeeInfo.scss'
import mask from '../../../images/welding-mask.svg'
import shoes from '../../../images/shoes.svg'
import doc from '../../../images/portable-document-format.svg'
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";


 export default function EmployeeInfo ()  {
  const history = useHistory();

    return (
        <div className="EmployeeInfo-main">
             <div className="top-nav">
        <MenuAdm />
      </div>
      <main className="employeeInfo--display-main">
         
              <div onClick={()=>history.push("/adm/employee-hours")} style={{cursor:"pointer"}} className="employeeInfo--row" >
             <img src={mask} alt="welding mask"/>
                <NavLink to="/adm/employee-hours" style={{color:"white", textDecoration:"none", cursor:'pointer'}}>
                 Employee Hours
                </NavLink>
              </div>
              <div  className="employeeInfo--row" style={{color:"white", textDecoration:"none", cursor:'pointer'}}>
              <img id="disable"  src={shoes} alt="shoes"/>

             <li to="/adm/employee-documents" style={{color:"white", textDecoration:"none"}}>
              Employee Holidays
             </li>
           </div>
           <div  onClick={()=>history.push("/adm/employee-hours")} style={{cursor:"pointer"}}className="employeeInfo--row" >
           <img src={doc} alt="documents"/>

             <NavLink to="/adm/employee-documents" style={{color:"white", textDecoration:"none", cursor:'pointer'}}>
              Employee Documents
             </NavLink>
           </div>
      </main>
        </div>
    )
}
