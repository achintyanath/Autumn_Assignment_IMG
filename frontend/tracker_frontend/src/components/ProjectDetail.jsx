import axios from "axios";
import React from "react";
import { useState, useEffect } from 'react';
import Navbar from "./Navbar2";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import { Grid, Image ,Item} from 'semantic-ui-react'
import omniportimage from "../images/index.png"
import "../styles/projectdetail.css";

import Projectitem from "./Projectitem";

function ProjectDetail(){
  var option
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/TracKer/project/1',{
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json', //the token is a variable which holds the token
        accept :'application/json',
      }
     })
    .then(function (response) {
      // console.log(response)
      console.log(response.data)
      option = response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  }, [])



  return(
    <div className="project-detail">
    <Grid centered>
    <Grid.Row columns={3}>
      <Grid.Column textAlign="center"> 
        <Image src={omniportimage} size="small" bordered centered />
      </Grid.Column>
      <Grid.Column  verticalAlign="middle" textAlign="center" bordered>
        
        
          <h1>Project Name</h1>
        
      
      </Grid.Column >
      <Grid.Column textAlign="center" verticalAlign="middle" >
        <li>Achintya Nath</li>
        <li>Astha Nath</li>
        <li>Antra </li>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row columns={1} className="project-desc">
      <Grid.Column >
       <p>
         project description
         <Link
                to={{
                    pathname: "/project/1",
                    state: {
                        projectdetails: "hello"
                    }
                }}>
                Press Me
</Link>
       </p>
      </Grid.Column>
    </Grid.Row>
  </Grid>
  </div>
  )
}


export default ProjectDetail