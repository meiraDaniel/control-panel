import React from 'react'
import {NavLink} from 'react-router-dom'

export default function Menu (props) {
    const{
        onMenu,
        toggleonMenu
    } = props
    return (
        <div>
        <button className="app--top-menuButton" onClick={toggleonMenu}>menu</button>
        <nav className= {onMenu?'app-show-menu':'app-hidden-menu'}>
        <button className="app--nav-menuButton" onClick={toggleonMenu}>menu</button>
          <NavLink onClick={toggleonMenu}  to='/dashboard'> Dashboard </NavLink>
          <NavLink onClick={toggleonMenu} to='/myhours'> My Hours </NavLink>
          <NavLink onClick={toggleonMenu} to='/wall'> My wall </NavLink>
          <NavLink onClick={toggleonMenu} to='/settings'> Settings </NavLink>
      
        </nav>
        </div>
    )
}
