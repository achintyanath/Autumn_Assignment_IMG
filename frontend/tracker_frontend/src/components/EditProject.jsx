import axios from "axios";
import React from "react";
import { useState, useEffect,useLocation } from 'react';
import Navbar from "./Navbar2";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import {Button,Form,Message,Header} from 'semantic-ui-react'
import "../styles/addproject.css";
import { useHistory, useParams } from 'react-router-dom'
import { Editor } from "@tinymce/tinymce-react";
import makeAnimated from 'react-select/animated';
import Select from 'react-select'
const animatedComponents = makeAnimated();


let option
  const fetchUserData = async() => {
    await axios.get('http://127.0.0.1:8000/TracKer/maintainer',{
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          'Content-Type': 'application/json', //the token is a variable which holds the token
          accept :'application/json',
        }
       })
      .then(function (response) {
          const user1= response.data
          option=user1.map((user)=>{
            return{
                label : user.name,
                value : user.id
                }
                })
      })
      .catch(function (error) {
        console.log(error);
      });
};
fetchUserData();

function EditProject(props){

    const [projectName,setProjectName] = useState();
    const [projectDesc, setProjectDesc] = useState();
    const [projectMember,setProjectMember] = useState([]);
    const [successful,setSuccessfull] = useState(false);
    const [errormessage,setErrormessage]  = useState();
    const [error,setError] = useState(false)
    const userDetails = props.userDetails;
    const { id } = useParams();
    const history = useHistory();
    console.log(id)
    useEffect(async () => {        
        const fetchProject = async() =>{
        await axios.get(`http://127.0.0.1:8000/TracKer/project/${id}`,{
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('access_token'),
              'Content-Type': 'application/json', //the token is a variable which holds the token
              accept :'application/json',
            }
           })
          .then(function (response) {
            console.log(response.data)
            const data = response.data
            setProjectName(data.project_name)
            setProjectDesc(data.project_desc)
            setProjectMember(data.project_maintained_by.map((maintainers)=>{
                    return {
                        label : maintainers.name,
                        value  : maintainers.id
                    }
            })
            )
            console.log(projectMember)
        })
          .catch(function (error) {
            console.log(error);
          });
        };
        fetchProject();
    },[])



  function handleChange(event){
    setProjectName(event.target.value)
  }

  function handlechange2(event){
    console.log(event);
    setProjectMember(event.map((obj)=>(obj.value)))
  }
  function handleChange3(newValue, editor){
    setProjectDesc(newValue)
  }

  function handleSubmit(event){
    event.preventDefault();
    const data = {
        "id" : id,
        "project_name" : projectName,
        "project_desc" : projectDesc,
        "project_maintained_by" : projectMember        
    }
    console.log(data);
    axios.put(`http://127.0.0.1:8000/TracKer/project/${id}/`, data,{
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
  }

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
        <div className="addp-container">
        <Navbar userDetails={userDetails}/>
        <div className="add-container">
        <Header size="huge"className="form-heading" >Edit Project Details</Header>
       
     <Form success error size="13">
            {successful? <div><Message
                success
                header='Project Edited'
                content="Project details were edited"
            /> 
            </div>:null}
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
                    width : 500,
                    menubar: true
                }}
                onEditorChange={handleChange3}
                name="project_desc"
                />
        </Form.Field>
        <Form.Field>
            <label className="label">Select Project Member</label>
            {projectMember.length!==0?<Select
            className="input-field"
            closeMenuOnSelect={false}
            defaultValue={projectMember}
            isSearchable
            isMulti
            options={option}
            theme={(theme) => ({
              ...theme,
              borderRadius: 1.25,
            })}
            styles={customStyles}
            onChange={handlechange2}
            placeholder='Select Project Memebers'
    />:null}
             
   </Form.Field> 

     
     <Button type='submit' onClick={handleSubmit} placeholder="Add Member" className="submit-button">Edit</Button>
   </Form>
   </div>
   </div>
    )
}

export default EditProject;