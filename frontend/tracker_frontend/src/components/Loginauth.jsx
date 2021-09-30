import axios from "axios";
import React from "react";
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

function Loginauth(){


    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code')
    const state = searchParams.get('state')
    useEffect(() => {
    //   axios({
    //     method:'get',
    //     url: "",
    //     // headers:{
    //     //     'Content-Type':'application/json',
    //     // },
    //     //withCredentials: true,
    //     params:{
           
    //     }
    // })
    //   .then(function (response) {
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
      axios.get(`http://127.0.0.1:8000/TracKer/maintainer/home/?code=${code}`)
      .then(function (response) {
        console.log(response);
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
      })
      .catch(function (error) {
        console.log(error);
      }); 
      

    });

     return (
         <div>
        {console.log(code)}
        {/* {console.log(state)} */}
        <button onClick={()=>{window.location= "http://127.0.0.1:3000/project"}}>hi</button> 
         </div>
     )  
   } 

 export default Loginauth;