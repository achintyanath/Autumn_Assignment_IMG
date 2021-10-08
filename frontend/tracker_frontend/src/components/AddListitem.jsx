import axios from "axios";
import React from "react";
import { useState, useEffect } from 'react';
import Navbar from "./Navbar2";
import {
    Button,
    Form,
    Message
  } from 'semantic-ui-react'
import Select from 'react-select'
import { Editor } from "@tinymce/tinymce-react";

function AddListItem(props){

    const [listName,setListName] = useState();
    const [successful,setSuccessfull] = useState(false);

    function handleChangeListName(event){
        setListName(event.target.value)
      }
    function handleSubmit(event){
        event.preventDefault();
        const data = {
            "list_name" : listName,
            "list_mapped_to" : 3, //props.project.id       
        }
        console.log(data);
        axios.post('http://127.0.0.1:8000/TracKer/list/', data,{
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
           window.location = '/projects'}, 2000)
         
           
      }

    return (
    <div className="bg-color">
    {/* <Navbar userDetails={userDetails} /> */}
            <div className="container">
            <Form success>
            {successful? <div><Message
                success
                header='List Created'
                content="List added to Project"
            /></div>:null}

            <Form.Field >
                <label>Card Title</label>
                <input placeholder='Enter List Title' value={listName} onChange={handleChangeListName} name="listTitle"/>              
            </Form.Field>          
            <Button type='submit' onClick={handleSubmit}>Submit</Button>
            </Form>
            </div>
            </div>
    )
}

export default AddListItem;