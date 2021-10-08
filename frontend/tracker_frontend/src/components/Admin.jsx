import axios from "axios";
import React from "react";
import { useState, useEffect } from 'react';
import Navbar from "./Navbar2";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import { Grid, Image ,Item,Segment,Table} from 'semantic-ui-react'
import omniportimage from "../images/index.png"
import "../styles/projectdetail.css";
import Switch from "react-switch";
import Projectitem from "./Projectitem";
import Userdetails from "./Userdetails";


var memebers ;
axios.get(`http://127.0.0.1:8000/TracKer/maintainer/`,{
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      'Content-Type': 'application/json', //the token is a variable which holds the token
      accept :'application/json',
    }
   })
.then(function (response) {
  console.log(response);    
  memebers = response.data;
  })
  .catch(function (error) {
    console.log(error);
  }); 


function Admin(){


    const [userDetails, setUserDetails]  = useState(memebers)

    return(

        <Table>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={10}>Name</Table.HeaderCell>
            <Table.HeaderCell width={2}>Admin Status</Table.HeaderCell>
            <Table.HeaderCell width={2}>Ban Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
    
        <Table.Body>
        {userDetails.map((user)=>(
        
                    <Userdetails details ={user}/>
                
            ))}

        </Table.Body>
    

      </Table>

    )

}
export default Admin;