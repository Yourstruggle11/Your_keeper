import Navbar from "./components/Navbar"
import Login from './components/Login'
import Signup from './components/Signup'
import Home from './components/Home'
import Notfound from "./components/Notfound"
import AddNote from "./components/AddNote"
import EditNote from "./components/EditNote"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import React from 'react';
import { useSelector } from "react-redux";



function App() {
   const {userInfo} = useSelector((state)=> state.userLogin);
  //  console.log(userInfo);
  //const userInfo = false;
  return (
    <Router>
      <Switch>
      {!userInfo && <Redirect exact from="/" to="/login" />}
        <Route exact path="/Login" component={Login}/>
        <Route exact path="/Signup" component={Signup}/>
        
        
        <>
          {userInfo?<Navbar /> : ""}
          <Route exact path="/" component={Home} />
          {userInfo? <Route exact path="/addNote/" component={AddNote}/>: <Redirect to="/404" />}
          {userInfo? <Route exact path="/editNote/:id" component={EditNote} />: <Redirect to="/404" />}
          {!userInfo?<Route exact path="/404" component={Notfound} /> :""}
        </>
      </Switch>
      
    </Router>

  );
}

export default App;
