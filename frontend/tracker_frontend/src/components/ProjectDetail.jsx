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

import { Grid, Image ,Item,List, ListItem} from 'semantic-ui-react'
import omniportimage from "../images/index.png"
import "../styles/projectdetail.css";

import Projectitem from "./Projectitem";
import Loading from "./Loading";

function ProjectDetail(props){

  const [project,setProject]  = useState();
  const [isBusy, setBusy] = useState(true)
  useEffect(()=>{
  axios.get('http://127.0.0.1:8000/TracKer/project/1/',{
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json', //the token is a variable which holds the token
        accept :'application/json',
      }
     })
    .then(function (response) {
      // console.log(response)
      console.log("hi project data")
      console.log(response.data)
      setProject(response.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  },[])



  return(
    <div id = "bg">
    <Navbar userDetails={props.userDetails} />
    <div className="project-detail">
    
    <Grid centered>
    <Grid.Row columns={3}>
      <Grid.Column textAlign="center"> 
        <Image src={omniportimage} size="small" bordered centered />
      </Grid.Column>
      <Grid.Column  verticalAlign="middle" textAlign="center" bordered>
        
        
          <h1>{project&&project.project_name}</h1>
        
      
      </Grid.Column >
      <Grid.Column textAlign="center" verticalAlign="middle" >
      <List>
      
        {project&&project.project_maintained_by.map((maintainer)=>(
              <List.Item>
                <List.Icon name="user" />
              <List.Content>{maintainer.name}</List.Content>
            </List.Item>
        )

        )}
          </List>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row columns={1} className="project-desc">
      <Grid.Column >
       <p>
         {project&&project.project_desc}
       </p>
      </Grid.Column>
    </Grid.Row>
  </Grid>
  <ListItem listdetails={project&&project.lists_in_project} />

  
  </div>
  </div>
  )
}


export default ProjectDetail