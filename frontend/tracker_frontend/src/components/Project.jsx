import axios from "axios";
import React from "react";
import { useState, useEffect } from 'react';


function Project(){
    
    useEffect(() => {
  axios.get('http://127.0.0.1:8000/TracKer/project',{
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      'Content-Type': 'application/json', //the token is a variable which holds the token
      accept :'application/json',
    }
   })
  .then(function (response) {
    console.log(response);
    
  })
  .catch(function (error) {
    console.log(error);
  });
});
return(
    <div>
      {console.log("Hi")}
        hi
    </div>
)
}
export default Project;

