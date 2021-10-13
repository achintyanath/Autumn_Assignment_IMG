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
  matchPath,useHistory
} from "react-router-dom";
import "../styles/addproject.css";
import {
    Button, Form,Message, Header} from 'semantic-ui-react'
import Select from 'react-select'
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
    const history = useHistory();
    
   
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

  function handlechange2(event){
  setProjectMember(event);
  }
  function handleChange3(newValue, editor){
    setProjectDesc(newValue)
  }
  
    
  function handleSubmit(event){
    event.preventDefault();
    const data = {
        "project_name" : projectName,
        "project_desc" : projectDesc,
        "project_maintained_by" : projectMember.map((main)=>main.value)         
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
        setTimeout(function() {
        history.goBack()}, 2000)
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
  const customStyles = {

    multiValue: (styles) => {
      
      const borderRadius=5;
      const opacity = 0.5;
      const transition = 'opacity 300ms';
  
      return {...styles, borderRadius,opacity, transition };
    },
    input:(styles)=>{
      const borderRadius =5;
      return{...styles, borderRadius}
    }
  }

    return(
      loading?<Loading />:
        <div className="addp-container">
        <Navbar userDetails={userDetails}/>
        <div className="add-container">
          <Header size="huge"className="form-heading" >Add a New Project</Header>
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
            <input placeholder='Enter Project Name' value={projectName} onChange={handleChange} className="input-field"/>              
            </Form.Field>
        <Form.Field>
        <label className="label">Project Description</label>
        <Editor
        
         apiKey="b1x6a1rmexpa5pdq8y385l5cami9vtqu5dul5cu4bt7tb2f0"
         value={projectDesc}
            init={{
            height: 250,
            width: 500,
            menubar: true
            }}
            onEditorChange={handleChange3}
          name="project_desc"
        />
        </Form.Field>
        <Form.Field>
        <label className="label">Members</label>

            <Select
            className="input-field"
            closeMenuOnSelect={false}
            isSearchable
            isMulti
            options={user.map((user)=>{
              return{
                  label : user.name,
                  value : user.id
              }
          })}
            theme={(theme) => ({
              ...theme,
              borderRadius: 1.25,
            })}
            styles={customStyles}
            onChange={handlechange2}
            placeholder='Select Project Memebers'
            />
            </Form.Field>
        <Button type='submit' onClick={handleSubmit} className="submit-button">Submit</Button>
      </Form>
      </div>
      </div>
    )
}

export default Addproject