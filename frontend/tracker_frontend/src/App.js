import logo from './logo.svg';
import './App.css';
import Login from "./components/Login";
import Project from "./components/Project";
import Projectitem from "./components/Projectitem";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Loginauth from './components/Loginauth';
import { useState, useEffect } from 'react';
import NotAllowed from './components/NotAllowed';
import Addproject from './components/Addproject';

function App() {

 const [userDetails, setUserDetails] = useState({
   user_id :null,
   isAdmin  : false,
   user_name : null,
   isLogged : false,
   isAuth :null
 })

 function handleLogin(userdata){
   setUserDetails({
     isAuth:"done",
     user_id : userdata.user_id,
     isAdmin : userdata.isAdmin,
     user_name : userdata.user_name,
     isLogged : userdata.isLogged
   })
 }



if(userDetails.isAuth===null){
  return (
    
     <Router>
       {console.log("here in not auth")}
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/login">
            <Loginauth onLogIn = {handleLogin}/>
          </Route>
          <Route exact path="/addproject">
            <Addproject />
          </Route>
          {/* <Route path="/project">
            <Project userDetails={userDetails}/>
          </Route> */}
        </Switch>
    </Router>
  );
}

if(userDetails.isAuth==="done"){
  if(userDetails.isLogged){
    return(
      <Router>
        <Switch>
          <Route path="/project">
              <Project userDetails={userDetails}/>
          </Route>
          <Route exact path="/projectitem">
            <Projectitem />
          </Route>
        <Redirect
             to={{
                pathname: "/project",
            }}
          /> 
          <Route exact path="/addproject">
            <Addproject userDetails={userDetails}/>
          </Route>
        </Switch>
      </Router>
      
  //     
  //     <Switch>
  //       <Route path="/project">
  //         <Project />
  //       </Route>
  //     </Switch>
  //
    );
  }
  else{
    return(
      <NotAllowed />
  //     <Router>
  //     <Switch>
  //       <Route path="/project">
  //         <Project />
  //       </Route>
  //     </Switch>
  // </Router>
    );
  }
}
}

export default App;
