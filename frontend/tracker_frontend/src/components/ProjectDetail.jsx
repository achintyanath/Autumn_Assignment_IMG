import axios from "axios";
import React from "react";
import { useState, useEffect} from 'react';
import Navbar from "./Navbar2";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import { Grid, Image ,Item,List,Icon} from 'semantic-ui-react'
import omniportimage from "../images/index.png"
import "../styles/projectdetail.css";
import ListItem from"./ListItem"
import Projectitem from "./Projectitem";
import Loading from "./Loading";
import { useHistory, useParams } from 'react-router-dom'

function ProjectDetail(props){
  const { id } = useParams();
  const [project,setProject]  = useState();
  const [isBusy, setBusy] = useState(true)
  const [permission,setPermission] = useState(false)
  useEffect(()=>{
  axios.get(`http://127.0.0.1:8000/TracKer/project/${id}/`,{ //{projectid}
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json', //the token is a variable which holds the token
        accept :'application/json',
      }
     })
    .then(function (response) {
      // console.log(response)
      console.log("hi project data")
      // console.log(response.data)
      setProject(response.data);
      var b = false;
      if(props.userDetails.isAdmin){
        b = true;
      }
      response.data.project_maintained_by.forEach(element => {
          console.log(props.userDetails.user_id)
            if(element.id===props.userDetails.user_id)  {
              b = true;
            }   
      });
      setPermission(b);
      console.log(b)

    })
    .catch(function (error) {
      console.log(error);
    });
  },[]);

  function updateOnDelete(){
    axios.get(`http://127.0.0.1:8000/TracKer/project/${id}/`,{ //{projectid}
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
  };
  function handleDelteProject(){
    console.log("in delete");
    axios.delete(`http://127.0.0.1:8000/TracKer/project/${id}/`,{ 
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      'Content-Type': 'application/json', //the token is a variable which holds the token
      accept :'application/json',
    }
   })
  .then(function (response) {
    window.location= "http://127.0.0.1:3000/project"
  })
  .catch(function (error) {
    console.log(error);
  });
  }


  return(
    <div id = "bg">
    <Navbar userDetails={props.userDetails} />
    <div className="project-detail">
    
    <Grid centered className="projectdetails-upper">
    {permission?<div className="projecticons-conatainer">
      <div className="projecticons" >
              <Link to ={{pathname : `/addlist/${project&&project.id}`}}>  
                 <Icon name='add' link aria-label="Edit" color="green" size="large"/>
                 </Link>
              <Link  to={{ pathname: `/project/edit/${project&&project.id}`}}>
                <Icon name='edit' link aria-label="Edit" color="blue" size="large"/>
              </Link>
              <Icon name='delete' link aria-label="Delete" color="red" size="large" onClick={handleDelteProject} />

    </div>
    </div>:null}
    <Grid.Row columns={3}>
      <Grid.Column textAlign="center"> 
        <Image src={omniportimage} size="small" bordered centered />
      </Grid.Column>
      <Grid.Column verticalAlign="middle" bordered className="projectdetails-heading">
     <div className="pheading">
          {project&&project.project_name}
      </div>
          
      </Grid.Column >
      <Grid.Column verticalAlign="middle" >
      <List>
        {project&&project.project_maintained_by.map((maintainer)=>(
              <List.Item>
               
              <List.Content>  <Icon name="user" color="blue"/>{maintainer.name}</List.Content>
            </List.Item>
        )
        )}
          </List>
      </Grid.Column>
    </Grid.Row>

    <Grid.Row columns={1} className="projectdetail-desc" centered>
      <Grid.Column textAlign="center" className="projectheading-desc" dangerouslySetInnerHTML={{ __html: project&&project.project_desc}}>      
      </Grid.Column>
    </Grid.Row>
  </Grid>
  <Grid className="projectdetail-list-grid" divided>

      {console.log(project&&project.lists_in_project)}
      {project&&project.lists_in_project.map((list)=>(
            <Grid.Row className="projectdetail-list"> 
        <ListItem listdetails={list} projectmain = {project&&project.project_maintained_by} update={updateOnDelete} permission={permission}/>
        </Grid.Row>
      ))}
         
   
  </Grid>
 

  
  </div>
  </div>
  )
}


export default ProjectDetail