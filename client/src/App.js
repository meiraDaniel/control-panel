import React,{useState}from 'react';
import Login from "./components/login/Login"
import {Route, Switch,Redirect,NavLink} from 'react-router-dom'
import { connect } from "react-redux";
import Dashboard from './components/Dashboard/Dashboard'
import './App.scss'
import MyHours from './components/MyHours/MyHours'

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
    <NavLink to='/myhours'> Dashboard </NavLink>
    <NavLink to='/myhours'> My Hours </NavLink>
    <NavLink to='/myhours'> My wall </NavLink>
    <NavLink to='/myhours'> Settings </NavLink>

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
      
      </Switch> 
    
    
    </div>
  );
}

export default connect(mapToProps)(App);
