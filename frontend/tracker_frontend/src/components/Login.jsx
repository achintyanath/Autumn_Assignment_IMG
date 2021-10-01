import React from "react";
import "../styles/login.css"
import { Button,Image ,Header} from 'semantic-ui-react'
import logo from "../images/TracKerlogo.png"
import omniportimage from "../images/index.png"


function Login(){

  const redirect_url = "http://127.0.0.1:8000/TracKer/login" //will import from baseurl to ensure scalability

      return (
        <div className="container">
          <div className ="container-subpart-left">
            <div>

        {/* <Button color='teal'> */}
          <button className="ui red button" id ="login-button" onClick={()=>{window.location= redirect_url}}>
          <Image src={omniportimage} size='mini' verticalAlign='middle' spaced />
            <span>  Sign in with Omniport</span>
          </button>
          {/* </Button> */}
          </div>
          </div>
          <div className ="container-subpart-right">
          <div className="heading">
          Tracker
          </div>
          <div className="image">
          <Image src={logo} 
                size='large' />
          </div>
          <div>
          <p className="description">
          Made for IMG, BY IMG 
          </p>
          </div>
          </div>
        </div>
      // <button >Sign in with Omniport</button> //semantic ui to be addded "SOON"
      );
    }
  
export default Login;