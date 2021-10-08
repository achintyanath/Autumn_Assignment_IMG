import axios from "axios";
import React from "react";
import { useState, useEffect } from 'react';
import Navbar from "./Navbar2";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  matchPath
} from "react-router-dom";
import "../styles/addproject.css";
import {
    Button,
    Checkbox,
    Form,
    Input,
    Radio,
    Select,
    TextArea,
    Dropdown,Message
  } from 'semantic-ui-react'

import Projectitem from "./Projectitem";
import { Editor } from "@tinymce/tinymce-react";


function Addproject(props){
    const [user,setUserDetails] = useState([]);
    const userDetails = props.userDetails;
    const [projectName,setProjectName] = useState();
    const [projectDesc, setProjectDesc] = useState();
    const [projectMember,setProjectMember] = useState([]);
    const [successful,setSuccessfull] = useState(false);
    // const arr =[];
    // console.log(typeof(arr))
    
   
  useEffect(() => {
    const fetchUserData = async () => {
        await axios.get('http://127.0.0.1:8000/TracKer/maintainer',{
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('access_token'),
              'Content-Type': 'application/json', //the token is a variable which holds the token
              accept :'application/json',
            }
           })
          .then(function (response) {
               setUserDetails(response.data)
              console.log(user)
          })
          .catch(function (error) {
            console.log(error);
          });
    };
    fetchUserData();
  }, []);

  function handleChange(event){
    setProjectName(event.target.value)
  }

  function handlechange2(event,data){
  setProjectMember(data.value);
  }
  function handleChange3(newValue, editor){
    setProjectDesc(newValue)
  }
  
    
  function handleSubmit(event){
    event.preventDefault();
    const data = {
        "project_name" : projectName,
        "project_desc" : projectDesc,
        "project_maintained_by" : projectMember          
    }
    console.log(data);
    axios.post('http://127.0.0.1:8000/TracKer/project/', data,{
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          'Content-Type': 'application/json', //the token is a variable which holds the token
          accept :'application/json',
        }
       })
      .then(function(response){
        console.log(response);
        setSuccessfull(true);
      })

       setTimeout(function() {
       window.location = '/projects'}, 1000)
     
       
  }
    return(
        <div className="bg-color">
           {/* <Navbar userDetails={userDetails} /> */}
        <div className="container">
        <Form success>
        {successful? <div><Message
            success
            header='Project Created'
            content="Your project is created"
        /> 

       </div>:null}

          <Form.Field >
            <label>Project Name</label>
            <input placeholder='Enter Project Name' value={projectName} onChange={handleChange} name="project_name"/>              
            </Form.Field>
        <Form.Field>
        <Editor
         apiKey="b1x6a1rmexpa5pdq8y385l5cami9vtqu5dul5cu4bt7tb2f0"
         value={projectDesc}
            init={{
            height: 250,
           width : 800,
            menubar: true
            }}
            onEditorChange={handleChange3}
          name="project_desc"
        />
        </Form.Field>
        <Form.Field
                  control={Select}
                  label='Gender'
                  options={user.map((user)=>{
                    return{
                        key : user.id,
                        text : user.name,
                        value : user.id
                    }
                })}
                  placeholder='Gender'
                  multiple ={true}
                  onChange= {handlechange2}
                  name = "project_maintained_by"
             />
            {/* <select multiple={true} onChange={handlechange2} name ="project_maintained_by">
            {user.map((user)=>(
                  <option value={user.id}>{user.name}</option>  
            ))}
          </select> */}
        
        <Button type='submit' onClick={handleSubmit} placeholder="Add Member">Submit</Button>
      </Form>
      </div>
      </div>
    )
}

export default Addproject