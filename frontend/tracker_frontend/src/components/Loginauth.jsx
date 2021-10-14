import axios from "axios";
import React from "react";
import { useState, useEffect } from 'react';
import {
  Redirect
} from "react-router-dom";
import Loading from "./Loading";
import NotAllowed from "./NotAllowed";

function Loginauth(props){
  const searchParams = new URLSearchParams(window.location.search);
  const code = searchParams.get('code')
  const state = searchParams.get('state')
  // const [status,setStatus]   = useState(null);
  var userstate = {
    user_id : null,
    user_name : null,
    isLogged :false,
    isAdmin  :false,
  } 
  useEffect(() => {
 
    axios.get(`http://127.0.0.1:8000/TracKer/maintainer/home/?code=${code}`)
    .then(function (response) {
      console.log(response);
      if(response.data.status === "verified"){
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
       
        userstate.user_id = response.data.user_id
        userstate.user_name = response.data.user_name
        userstate.isLogged =true
        userstate.isAdmin  =response.data.isAdmin
      // setStatus("verified");
     
      }
      else if (response.data.status==="banned"){
        // setStatus("banned");
        
      }
      else if (response.data.status === "notinimg" ){
        // setStatus("notinimg");
        
      }

      props.onLogIn(userstate)
      })
      .catch(function (error) {
        console.log(error);
      }); 
    
    });

     return (
      
       <div> 
{/* 
        {status === null ? (<Loading />) : status==="verified" ? (
        <Redirect
       to={{
            pathname: "/project",
         }}
       /> 
       
      ) :( <NotAllowed />) } */}
       </div>      
        
        
     )  
   } 

 export default Loginauth;