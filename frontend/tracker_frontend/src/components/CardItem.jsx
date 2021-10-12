import axios from "axios";
import React from "react";
import { useState, useEffect } from 'react';
import Navbar from "./Navbar2";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import { Grid, Image ,Item, Card, Button,Icon,Comment, Dimmer,Header} from 'semantic-ui-react'
import omniportimage from "../images/index.png"
import "../styles/carditem.css";
import makeAnimated from 'react-select/animated';
import Projectitem from "./Projectitem";
import Select from 'react-select'
import CommentItem from "./CommentItem";
const animatedComponents = makeAnimated()


function CardItem(props){
  const [active,setActive] =useState(false)
  const options = props.carddetails.card_assigned_to.map((maintainer)=>{
    return {
      label : maintainer.name,
      value : maintainer.id
    }
  })
  const maintainers = props.projectmain.map((project)=>{
    return{
      label : project.name,
      value : project.id
    }
  })

  function handleOnchange(event){
    // console.log(event);
    const data = {
      "id" : props.carddetails.id,
      "card_assigned_to" : event,        
  }

    axios.patch(`http://127.0.0.1:8000/TracKer/list/${props.carddetails.id}/`, data,{
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          'Content-Type': 'application/json',
          accept :'application/json',
        }
       })
      .then(function(response){
        console.log(response);
      }).catch(function(error){
        console.log(error)
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

  function handleEdit(){
    setActive(true);
  }
  function handleHide(){
    setActive(false);
  }
  function handleDelete(){
   
  }

    return (
      <Dimmer.Dimmable as={Card} dimmed={active} className="card-item">
        {/* <Card > */}
        <Card.Content className="card-item-content">
          <Card.Header id="card-heading">
            <div className="card-heading-text">
            {props.carddetails.card_title}
            </div>

          <div className = "card-icon"> 
          <Icon name='delete'link aria-label="Delete" color="red" onClick ={handleEdit}/> 
          <Icon name='edit'link aria-label="Edit" color="blue" />
          </div>
          </Card.Header>

          
          <Card.Meta>Date of assignment</Card.Meta>
          <Card.Description className="card-desc">
           {props.carddetails.card_desc}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <span>
        Assigned to :
        </span>
        <Select
            closeMenuOnSelect={false}
            defaultValue={options}
            isMulti
            isSearchable
            options={maintainers}
            theme={(theme) => ({
              ...theme,
              borderRadius: 1.25,
            })}
            styles={customStyles}
            onChange={handleOnchange}
    />
  
          <CommentItem />

         
        </Card.Content>
        <Dimmer active={active} onClickOutside={handleHide}>
            <Header as='h2' icon inverted>
            Are you sure you want to delete this card
            </Header>
            <div className='ui two buttons'>
          <Button basic color="green" onclick={handleDelete}>
          Delete
          </Button>
          <Button basic color='red'onClick={handleHide} >
            Cancel
          </Button>
        </div>
          </Dimmer>
      {/* </Card> */}
      </Dimmer.Dimmable>
    )
}

export default CardItem;