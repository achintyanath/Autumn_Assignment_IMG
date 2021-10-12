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





function Userdetails(props){


  
    const [year,setUserYear]  = useState();
    const [isAdmin,setIsAdmin] = useState( props.details.admin);
    const[isBan,setisBan] = useState(props.details.disable);


//     useEffect(() => {

//     }, [])

// //     useEffect(() => {

// // }, [])

    useEffect(()=>{

    axios.get(`http://127.0.0.1:8000/TracKer/maintainer/${props.details.id}`)
    .then(function (response) {
      console.log(response.data.year);
        setUserYear(response.data.year);
      })
      .catch(function (error) {
        console.log(error);
      }); 
    },[]);

    function handleAdminChange(checked){
        setIsAdmin(checked);
        axios.get(`http://127.0.0.1:8000/TracKer/maintainer/${props.details.id}/changeadmin/`,{
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('access_token'),
              'Content-Type': 'application/json', //the token is a variable which holds the token
              accept :'application/json',
            }
           })
        .then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
            console.log(error);
        }); 
       
    }

    function handleBanChange(checked){
        setisBan(checked);
        axios.get(`http://127.0.0.1:8000/TracKer/maintainer/${props.details.id}/ban/`,{
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('access_token'),
              'Content-Type': 'application/json', //the token is a variable which holds the token
              accept :'application/json',
            }
           })
        .then(function (response) {
            console.log(response)
        })
        .catch(function (error) {
            console.log(error);
        }); 

    }

    return(

         <Table.Row>
            <Table.Cell>{props.details.name}</Table.Cell>
            <Table.Cell>{year}</Table.Cell>
            <Table.Cell><Switch onChange={handleAdminChange}checked={isAdmin}/></Table.Cell>
            <Table.Cell><Switch onChange={handleBanChange} checked={isBan} /></Table.Cell>
          </Table.Row>

    )

}

export default Userdetails;