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
    Dropdown,Message, Header
  } from 'semantic-ui-react'

import Projectitem from "./Projectitem";
import { Editor } from "@tinymce/tinymce-react";
import Loading from "./Loading";


function Addproject(props){
  const [loading,setLoading] = useState(true);
    const [user,setUserDetails] = useState([]);
    const userDetails = props.userDetails;
    const [projectName,setProjectName] = useState();
    const [projectDesc, setProjectDesc] = useState();
    const [projectMember,setProjectMember] = useState([]);
    const [successful,setSuccessfull] = useState(false);
    const [errormessage,setErrormessage]  = useState();
    const [error,setError] = useState(false)
    
   
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
          })
          .catch(function (error) {

            console.log(error.response.status);
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
    axios.post('http://127.0.0.1:8000/TracKer/project/1/', data,{
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          'Content-Type': 'application/json', //the token is a variable which holds the token
          accept :'application/json',
        }
       })
      .then(function(response){
        console.log(response);
        setSuccessfull(true);

       setTimeout(function() {
        window.location = '/projects'}, 1000)
      })
      .catch(function (error) {
     
        switch(error.response.status) {
          case 400:
            setErrormessage("Please try again")
            break;
          case 401:
            setErrormessage("You are not authorised")
            break;
          case 403:
            setErrormessage("You cannot add project")
                break;
          case 404:
              setErrormessage("Sorry, the page doesn't exist")
                break;  
          case 405:
          setErrormessage("Not allowed")
          break;
          
          default:
            setErrormessage("Something went wrong. Please try again")

        }
        setError(true);
        console.log(error.response.status);
      }); 

     
       
  }
  useEffect(()=>{
    setLoading(false)
  },[]);

    return(
      loading?<Loading />:
        <div className="addp-conatiner">
        <Navbar userDetails={userDetails}/>
        <div className="add-container">
          <Header size="large">Add a New Project</Header>
        <Form success error size="13">
        {successful? <div><Message
            success
            header='Project Created'
            content="Your project is created"
        /> </div>:null}
        {error? <div><Message
            error
            header='Request Failed'
            content={errormessage}
        /> </div>:null}
        

          <Form.Field size={14}>
            <label className="label">Project Name</label>
            <input placeholder='Enter Project Name' value={projectName} onChange={handleChange} name="project_name"/>              
            </Form.Field>
        <Form.Field>
        <label className="label">Project Description</label>
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
        <Button type='submit' onClick={handleSubmit} placeholder="Add Member">Submit</Button>
      </Form>
      </div>
      </div>
    )
}

export default Addproject