import axios from "axios";
import React from "react";
import { useState, useEffect } from 'react';
import Navbar from "./Navbar2";
import {Button,Form, Message,Header} from 'semantic-ui-react'
import { useHistory, useParams,useLocation } from 'react-router-dom'
import { Editor } from "@tinymce/tinymce-react";
import makeAnimated from 'react-select/animated';
import Select from 'react-select'

function EditCarditem(props){
  
    const [cardName,setCardName] = useState();
    const [cardDesc, setCardDesc] = useState();
    const userDetails = props.userDetails;
    const [cardAssignedTo,setCardAssignedTo] = useState([]);
    const [successful,setSuccessfull] = useState(false);
    const [errormessage,setErrormessage]  = useState();
    const [error,setError] = useState(false)
    const { id } = useParams();
    const history = useHistory();
    const location  = useLocation();
    const option = location.state.map((user)=>{
      return{
          label : user.name,
          value : user.id
          }
          })

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
        <Header size="huge"className="form-heading" >Edit Card Details</Header>
     <Form success error size={13}>
     {successful? <div><Message
         success
         header='Card Edited'
         content="Card details were edited"
     /></div>:null}
        {error? <div><Message
            error
            header='Request Failed'
            content={errormessage}
        /> </div>:null}

       <Form.Field size={14}>
                <label className="label">Card Title</label>
                <input placeholder='Enter Card Title' value={cardName} onChange={handleChangeCardName}  className="input-field"/>              
        </Form.Field>
        <Form.Field>
        <label className="label">Card Description</label>
                <Editor
                apiKey="b1x6a1rmexpa5pdq8y385l5cami9vtqu5dul5cu4bt7tb2f0"
                value={cardDesc}
                    init={{
                    height: 250,
                    width : 500,
                    menubar: true
                }}
                onEditorChange={handleChangeCardDesc}
                name="card_desc"
                />
        </Form.Field>
        <Form.Field>
            <label className="label">Card Assigned To</label>
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
            styles={customStyles}
            onChange={handleChangeCardAssignedTo}
            placeholder="Select Members"
    />:null}
             
      </Form.Field> 
     <Button type='submit' onClick={handleSubmit}  className="submit-button">Edit</Button>
   </Form>
   </div>
   </div>
    )
}

export default EditCarditem;