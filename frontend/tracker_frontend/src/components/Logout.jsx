import axios from "axios";
import React,
{useEffect} from "react";
import Loading from "./Loading"

function Logout(props){

    useEffect(() => {

   
    axios.get('http://127.0.0.1:8000/TracKer/logout',{
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      'Content-Type': 'application/json', //the token is a variable which holds the token
      accept :'application/json',
    }
   })
  .then(function (response) {
    const redirect_url = `http://127.0.0.1:3000`
    localStorage.clear();
    window.location= redirect_url
  })
  .catch(function (error) {
    console.log(error);
  });
}, [])



return(

    <div>
        <Loading />
    </div>
)
}

 export default Logout;