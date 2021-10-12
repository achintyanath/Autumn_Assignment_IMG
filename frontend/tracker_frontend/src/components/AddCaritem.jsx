import axios from "axios";
import React from "react";
import { useState, useEffect } from 'react';
import Navbar from "./Navbar2";
import {
  BrowserRouter as Router,useParams,useLocation} from "react-router-dom";
import {Button,Form,Message,Header} from 'semantic-ui-react'
import Select from 'react-select'
import { Editor } from "@tinymce/tinymce-react";

function AddCardItem(props){
    let location = useLocation();
    const [Maintainers,setMaintainers] = useState(location.state);
    const userDetails = props.userDetails;
    const [cardName,setCardName] = useState();
    const [cardDesc, setCardDesc] = useState();
    const [cardAssignedTo,setCardAssignedTo] = useState([]);
    const [successful,setSuccessfull] = useState(false);
    const [errormessage,setErrormessage]  = useState();
    const [error,setError] = useState(false)
    const { id } = useParams();
  
    function handleChangeCardName(event){
        setCardName(event.target.value)
      }
   
    function handleChangeCardAssignedTo(event){
        console.log(event)
        setCardAssignedTo(event.map((obj)=>(obj.value)));
      }
    function handleChangeCardDesc(newValue, editor){
        setCardDesc(newValue)
      }


    function handleSubmit(event){
        event.preventDefault();
        const data = {
            "card_title" : cardName,
            "card_desc" : cardDesc,
            "card_mapped_to" : id, 
            "card_assigned_to" : cardAssignedTo          
        }
        console.log(data);
        axios.post('http://127.0.0.1:8000/TracKer/card/', data,{
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

    return (


    <div className="addp-container">
            <Navbar userDetails={userDetails}/>
            <div className="add-container">
            <Header size="huge"className="form-heading" >Add a New Card</Header>
            <Form success error size={13}>
            {successful? <div><Message
                success
                header='Card Created'
                content="Your Card is added to the List"
            /> </div>:null}
            {error? <div><Message
            error
            header='Request Failed'
            content={errormessage}
        /> </div>:null}

            <Form.Field size={14}>
                <label className="label">Card Title</label>
                <input placeholder='Enter Card Title' value={cardName} onChange={handleChangeCardName} className="input-field"/>              
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
            name="cardDesc"
           
            />
            </Form.Field>
            <Form.Field>
            <label className="label">Select Members To Assign</label>
            <Select
             className="input-field"
            closeMenuOnSelect={false}
            isMulti
            isSearchable
            options={Maintainers.map((maintainer)=>{
                return{
                    label : maintainer.name,
                    value : maintainer.id
                }
            })}
            theme={(theme) => ({
              ...theme,
              borderRadius: 1.25,
            })}
            styles={customStyles}
            onChange={handleChangeCardAssignedTo}
            placeholder="Select Members"
            />            
             </Form.Field>            
            <Button type='submit' onClick={handleSubmit}  className="submit-button">Submit</Button>
            </Form>
            </div>
            </div>


    )
}

export default AddCardItem;