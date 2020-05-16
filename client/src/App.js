import React,{useState}from 'react';
import Login from "./components/login/Login"
import {Route, Switch,Redirect,NavLink} from 'react-router-dom'
import { connect } from "react-redux";
import Dashboard from './components/Dashboard/Dashboard'
import './App.scss'
import MyHours from './components/MyHours/MyHours'
import Insert from './components/InsertHours/Insert'
import Wall from './components/Wall/Wall'
import Settings from './components/Settings/Settings'


function mapToProps(state){
  return(
    {isAuthenticated: state.createSession.token,
    idAdm:state.createSession.adm
   }
  )
}
function App({isAuthenticated,idAdm}) {
const[onMenu,setonMenu] =useState(false)

const toggleonMenu=()=>{
  setonMenu(!onMenu)
}

  return (
    <div className="app--main">
           <button className="app--top-menuButton" onClick={toggleonMenu}>menu</button>
  <nav className= {onMenu?'app-show-menu':'app-hidden-menu'}>
  <button className="app--nav-menuButton" onClick={toggleonMenu}>menu</button>
    <NavLink onClick={()=>setonMenu(!onMenu)}to='/dashboard'> Dashboard </NavLink>
    <NavLink onClick={()=>setonMenu(!onMenu)}to='/myhours'> My Hours </NavLink>
    <NavLink onClick={()=>setonMenu(!onMenu)}to='/wall'> My wall </NavLink>
    <NavLink onClick={()=>setonMenu(!onMenu)}to='/settings'> Settings </NavLink>

  </nav>


    <Switch>
      <Route exact path ='/'> 
      {isAuthenticated && !idAdm? <Redirect to="/dashboard"/>: <Login/>}
      </Route>
       <Route path="/dashboard"> 
       {!isAuthenticated && !idAdm? <Redirect to="/"/>: <Dashboard/>}
       </Route>
       <Route path="/myhours"> 
       {!isAuthenticated && !idAdm? <Redirect to="/"/>: <MyHours/>}
       </Route>
       <Route path="/insert"> 
       {!isAuthenticated && !idAdm? <Redirect to="/"/>: <Insert/>}
       </Route>
       <Route path="/wall"> 
       {!isAuthenticated && !idAdm? <Redirect to="/"/>: <Wall/>}
       </Route>
       <Route path="/settings"> 
       {!isAuthenticated && !idAdm? <Redirect to="/"/>: <Settings/>}
       </Route>
      </Switch> 
    
    
    </div>
  );
}

export default connect(mapToProps)(App);
