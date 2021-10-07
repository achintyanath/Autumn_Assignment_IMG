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
import {
    Button,
    Checkbox,
    Form,
    Input,
    Radio,
    TextArea,
    Dropdown,Message
  } from 'semantic-ui-react'
import omniportimage from "../images/index.png"
import "../styles/project.css";
import { useHistory, useParams } from 'react-router-dom'
import Projectitem from "./Projectitem";
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

    // console.log(details)
    // console.log("huehue")
    // console.log(option)
    // console.log("huehue")
    const [projectName,setProjectName] = useState();
    const [projectDesc, setProjectDesc] = useState();
    const [projectMember,setProjectMember] = useState([]);
    const [successful,setSuccessfull] = useState(false);
    const { id } = useParams();
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
      })

      //  setTimeout(function() {
      //  window.location = '/projects'}, 1000)
     
       
  }
  
    return(
        <div className="bg-color">
        {/* <Navbar userDetails={userDetails} /> */}
     <div className="container">
     <Form success>
     {successful? <div><Message
         success
         header='Project Edited'
         content="Project details were edited"
     /> 
    </div>:null}
                {console.log("pr")}
                {console.log(projectMember)}
            {console.log("pr")}
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
        <Form.Field>
            <label>Select Project Member</label>
            {projectMember.length!==0?<Select
            closeMenuOnSelect={false}
            defaultValue={projectMember}
            isMulti
            options={option}
            theme={(theme) => ({
              ...theme,
              borderRadius: 1.25,
            })}
            onChange={handlechange2}
    />:null}
             
   </Form.Field> 

     
     <Button type='submit' onClick={handleSubmit} placeholder="Add Member">Edit</Button>
   </Form>
   </div>
   </div>
    )
}

export default EditProject;