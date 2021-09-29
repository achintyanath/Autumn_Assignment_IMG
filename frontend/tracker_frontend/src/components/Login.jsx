import React from "react";
//import axios from "axios";
class Login extends React.Component {

  // constructor(props) {
  //   super(props);
  //   this.state = {date: new Date()};
  // }
  redirect_url = "http://127.0.0.1:8000/TracKer/login" //will import from baseurl to ensure scalability

  
  redirect =() =>{
    window.location= this.redirect_url;
  }


    render() {
      return (
      <button onClick={this.redirect}>Sign in with Omniport</button> //semantic ui to be addded "SOON"
      );
    }
  }
export default Login;