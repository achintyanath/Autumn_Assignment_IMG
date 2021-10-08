import axios from "axios";
import React from "react";
import { useState, useEffect,useLocation } from 'react';
import Navbar from "./Navbar2";
import {
    Button,
    Form,
    Message
  } from 'semantic-ui-react'
import { useHistory, useParams } from 'react-router-dom'
import { Editor } from "@tinymce/tinymce-react";
import makeAnimated from 'react-select/animated';
import Select from 'react-select'
const animatedComponents = makeAnimated();


function EditCarditem(){
  var option //this options will pass by props, checking here is done by forcefully by project_id

    const [cardName,setCardName] = useState();
    const [cardDesc, setCardDesc] = useState();
    const [cardAssignedTo,setCardAssignedTo] = useState([]);
    const [successful,setSuccessfull] = useState(false);
    const { id } = useParams();
    console.log(id)

    const fetchProjectMember = async() => {
      await axios.get(`http://127.0.0.1:8000/TracKer/project/3/`,{
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            'Content-Type': 'application/json',
            accept :'application/json',
          }
         })
        .then(function (response) {
            const user1= response.data.project_maintained_by
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

  fetchProjectMember();



    useEffect(async () => {        
        const fetchCard = async() =>{
        await axios.get(`http://127.0.0.1:8000/TracKer/card/${id}`,{
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('access_token'),
              'Content-Type': 'application/json', //the token is a variable which holds the token
              accept :'application/json',
            }
           })
          .then(function (response) {
            console.log(response.data)
            const data = response.data
            setCardName(data.card_title)
            setCardDesc(data.card_desc)
            setCardAssignedTo(data.card_assigned_to.map((maintainers)=>{
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
        fetchCard();
    },[])



  function handleChangeCardName(event){
    setCardName(event.target.value)
  }

  function handleChangeCardAssignedTo(event){
    setCardAssignedTo(event.map((obj)=>(obj.value)))
  }
  function handleChangeCardDesc(newValue, editor){
    setCardDesc(newValue)
  }

  function handleSubmit(event){
    event.preventDefault();
    const data = {
        "id" : id,
        "card_title" : cardName,
        "card_desc" : cardDesc,   //no need for list_id => patch request
        "card_assigned_to" : cardAssignedTo          
    }
    console.log(data);
    axios.patch(`http://127.0.0.1:8000/TracKer/card/${id}/`, data,{
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          'Content-Type': 'application/json', //the token is a variable which holds the token
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
         header='Card Edited'
         content="Card details were edited"
     /></div>:null}

       <Form.Field >
                <label>Card Title</label>
                <input placeholder='Enter Card Title' value={cardName} onChange={handleChangeCardName} name="card_name"/>              
        </Form.Field>
        <Form.Field>
                <Editor
                apiKey="b1x6a1rmexpa5pdq8y385l5cami9vtqu5dul5cu4bt7tb2f0"
                value={cardDesc}
                    init={{
                    height: 250,
                    width : 800,
                    menubar: true
                }}
                onEditorChange={handleChangeCardDesc}
                name="card_desc"
                />
        </Form.Field>
        <Form.Field>
            <label>Card Assigned To</label>
            {cardAssignedTo.length!==0?<Select
            closeMenuOnSelect={false}
            defaultValue={cardAssignedTo}
            isMulti
            isSearchable
            options={option} 
            theme={(theme) => ({
              ...theme,
              borderRadius: 1.25,
            })}
            onChange={handleChangeCardAssignedTo}
    />:null}
             
      </Form.Field> 
     <Button type='submit' onClick={handleSubmit}>Edit</Button>
   </Form>
   </div>
   </div>
    )
}

export default EditCarditem;