import axios from "axios";
import React from "react";
import { useState, useEffect,useLocation } from 'react';
import Navbar from "./Navbar2";
import {
    Button,
    Form,
    Message
  } from 'semantic-ui-react'
import { useParams } from 'react-router-dom'


function EditListitem(){


    const [listName,setListName] = useState();
    const [successful,setSuccessfull] = useState(false);
    const { id } = useParams();


    useEffect(async () => {        
        const fetchList = async() =>{
        await axios.get(`http://127.0.0.1:8000/TracKer/list/${id}`,{
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('access_token'),
              'Content-Type': 'application/json',
              accept :'application/json',
            }
           })
          .then(function (response) {
            console.log(response.data)
            const data = response.data
            setListName(data.list_name)
        })
          .catch(function (error) {
            console.log(error);
          });
        };
        fetchList();
    },[])



  function handleChangeListName(event){
    setListName(event.target.value)
  }

  function handleSubmit(event){
    event.preventDefault();
    const data = {
        "id" : id,
        "list_name" : listName,        
    }
    console.log(data);
    axios.patch(`http://127.0.0.1:8000/TracKer/list/${id}/`, data,{
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          'Content-Type': 'application/json',
          accept :'application/json',
        }
       })
      .then(function(response){
        console.log(response);
        setSuccessfull(true);
        setTimeout(()=> {
        window.location = '/projects'}, 2000)
      })  
  }
  
    return(
        <div className="bg-color">
        {/* <Navbar userDetails={userDetails} /> */}
     <div className="container">
     <Form success>
     {successful? <div><Message
         success
         header='List Edited'
         content="List details were edited"
     /></div>:null}

       <Form.Field >
                <label>List Name</label>
                <input placeholder='Enter List Title' value={listName} onChange={handleChangeListName} name="list_name"/>              
        </Form.Field>
     <Button type='submit' onClick={handleSubmit}>Edit</Button>
   </Form>
   </div>
   </div>
    )
}

export default EditListitem;