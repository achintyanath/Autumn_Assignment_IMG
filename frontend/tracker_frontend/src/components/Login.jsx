import React from "react";
//import axios from "axios";
function Login(){


  const redirect_url = "http://127.0.0.1:8000/TracKer/login" //will import from baseurl to ensure scalability

      return (
      <button onClick={()=>{window.location= redirect_url}}>Sign in with Omniport</button> //semantic ui to be addded "SOON"
      );
    }
  
export default Login;