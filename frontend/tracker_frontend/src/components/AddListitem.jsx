import axios from "axios";
import React from "react";
import { useState, useEffect } from 'react';
import Navbar from "./Navbar2";
import {Button,Form,Message, Header} from 'semantic-ui-react'
import "../styles/addproject.css";
import { useHistory, useParams } from 'react-router-dom'

function AddListItem(props){

    const [listName,setListName] = useState();
    const [successful,setSuccessfull] = useState(false);
    const userDetails = props.userDetails;
    const [errormessage,setErrormessage]  = useState();
    const [error,setError] = useState(false);
    const { id } = useParams();
    function handleChangeListName(event){
        setListName(event.target.value)
      }
    function handleSubmit(event){
        event.preventDefault();
        const data = {
            "list_name" : listName,
            "list_mapped_to" : id 
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
    <div className="addp-container">
          <Navbar userDetails={userDetails}/>
            <div className="add-container">
            <Header size="huge"className="form-heading" >Add a New List</Header>
            <Form success error size={13}>
            {successful? <div><Message
                success
                header='List Created'
                content="List added to Project"
            /></div>:null}
            {error? <div><Message
            error
            header='Request Failed'
            content={errormessage}
        /> </div>:null}

            <Form.Field size={14} >
                <label className="label">List Title</label>
                <input placeholder='Enter List Title' value={listName} onChange={handleChangeListName} className="input-field"/>              
            </Form.Field>          
            <Button type='submit' onClick={handleSubmit} className="submit-button">Submit</Button>
            </Form>
            </div>
            </div>
    )
}

export default AddListItem;