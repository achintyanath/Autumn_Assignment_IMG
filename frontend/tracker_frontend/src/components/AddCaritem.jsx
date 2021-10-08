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
import {
    Button,
    Checkbox,
    Form,
    Input,
    Radio,
    TextArea,
    Dropdown,Message
  } from 'semantic-ui-react'
  import Select from 'react-select'
import Projectitem from "./Projectitem";
import { Editor } from "@tinymce/tinymce-react";

function AddCardItem(props){
    const [Maintainers,setMaintainers] = useState([]);
    const userDetails = props.userDetails;
    const [cardName,setCardName] = useState();
    const [cardDesc, setCardDesc] = useState();
    const [cardAssignedTo,setCardAssignedTo] = useState([]);
    const [successful,setSuccessfull] = useState(false);
    useEffect(() => {
        const fetchMemberData = async () => {
            await axios.get(`http://127.0.0.1:8000/TracKer/card/1`,{
                headers: {
                  Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                  'Content-Type': 'application/json', //the token is a variable which holds the token
                  accept :'application/json',
                }
               })
              .then(function (response) {
                    console.log(response.data.card_assigned_to)
                 setMaintainers(response.data.card_assigned_to)
              })
              .catch(function (error) {
                console.log(error);
              });
        };
        fetchMemberData();
      }, []);

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
            "card_mapped_to" : 3, //props.list.id
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

    return (


    <div className="bg-color">
    {/* <Navbar userDetails={userDetails} /> */}
            <div className="container">
            <Form success>
            {successful? <div><Message
                success
                header='Card Created'
                content="Your Card is added to the List"
            /> 

            </div>:null}

            <Form.Field >
                <label>Card Title</label>
                <input placeholder='Enter Card Title' value={cardName} onChange={handleChangeCardName} name="cardTitle"/>              
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
            name="cardDesc"
           
            />
            </Form.Field>
            <Form.Field>
            <label>Select Members To Assign</label>
            <Select
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
            onChange={handleChangeCardAssignedTo}
            placeholder="Select Members"
            />            
             </Form.Field>            
            <Button type='submit' onClick={handleSubmit} placeholder="Add Member">Submit</Button>
            </Form>
            </div>
            </div>


    )
}

export default AddCardItem;