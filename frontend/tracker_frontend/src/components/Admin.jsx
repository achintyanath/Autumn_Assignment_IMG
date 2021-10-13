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

import { Table,Header} from 'semantic-ui-react'
import omniportimage from "../images/index.png"
import "../styles/admin.css";
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


function Admin(props){


    const [userDetail, setUserDetails]  = useState(memebers)

    return(
      <div className="something">
        {console.log(props)}
      <Navbar userDetails={props.userDetails} />
      <div className="admin-heading">
        <Header as ='h1' className="admin-heading-text">Admin Panel</Header> 
      </div>
      <div className="table-div"> 
        <Table className="user-table" >
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={10}>Name</Table.HeaderCell>
            <Table.HeaderCell width={5}>Year</Table.HeaderCell>
            <Table.HeaderCell width={2}>Admin Status</Table.HeaderCell>
            <Table.HeaderCell width={2}>Ban Status</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
    
        <Table.Body>
        {userDetail.map((user)=>(
        
                    <Userdetails details ={user}/>
                
            ))}

        </Table.Body>
    

      </Table>
      </div>
      </div>

    )

}
export default Admin;