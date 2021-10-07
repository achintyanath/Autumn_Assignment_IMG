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
import ProjectDetail from './components/ProjectDetail';
import ListItem from './components/ListItem'
import CardItem from './components/CardItem'
import axios from "axios";
import EditProject from './components/EditProject';

function App() {

 const [userDetails, setUserDetails] = useState({
   user_id :null,
   isAdmin  : false,
   user_name : null,
   isLogged : false,
   isAuth :null
 })


 if(userDetails.isAuth==null){
  if(localStorage.getItem('access_token')){
    axios.get('http://127.0.0.1:8000/TracKer/maintainer/check'
    ,{
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json', //the token is a variable which holds the token
        accept :'application/json',
      }
     }
    )
    .then(function (response) {
      // console.log(response)
      console.log(response)
       const data ={
        ...response.data, isLogged: true
      }
      handleLogin(data)
  
    })
    .catch(function (error) {
      console.log(error);
    });
  }
    }


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
          <Route exact path="/project">
              <Project userDetails={userDetails}/>
          </Route>
          <Route exact path="/projectitem">
            <Projectitem />
          </Route>
          <Route exact path="/addproject">
            <Addproject userDetails={userDetails}/>
          </Route>
          <Route exact path="/projectdetail">
            <ProjectDetail/>
          </Route>
          <Route exact path="/listitem">
            <ListItem />
          </Route>
          <Route exact path="/carditem">
            <CardItem />
          </Route>
          <Route path="/project/:id">
            <EditProject />
          </Route>
        <Redirect
             to={{
                pathname: "/project",
            }}
          /> 

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
