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

import { Grid, Image ,Item,Card,Button, Segment,Icon,Dimmer,Header} from 'semantic-ui-react'
import omniportimage from "../images/index.png"
import "../styles/projectdetail.css";
import Projectitem from "./Projectitem";
import CardItem from "./CardItem";


function ListItem(props){
  const [active,setActive] =useState(false)
  function handleDeleteDimmer(){
    setActive(true);
  }
  function handleHide(){
    setActive(false);
  }
  function handleDelete(){
    console.log("in delete")
    axios.delete(`http://127.0.0.1:8000/TracKer/list/${props.listdetails.id}/`,{ 
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      'Content-Type': 'application/json', //the token is a variable which holds the token
      accept :'application/json',
    }
   })
  .then(function (response) {
    props.update();
  })
  .catch(function (error) {
    console.log(error);
  });
  }

    return(   
      <Dimmer.Dimmable as={Grid} dimmed={active} doubling columns={5}>
        {/* <Grid doubling columns={5}> */}
        <Segment className="listdetail-heading">
          <div className="list-heading">
          {props.listdetails.list_name}
          </div>
                 {props.permission?<div className = "list-icon"> 
            <Link to ={{pathname : `/addcard/${props.listdetails.id}`,state:props.projectmain}}>  
                 <Icon name='add' link aria-label="Edit" color="green" size="large"/>
                 </Link>
          <Link to ={{pathname : `/list/edit/${props.listdetails.id}`}}>    
              <Icon name='edit' link aria-label="Edit" color="blue" size="large"/>
          </Link>
          <Icon name='delete' link aria-label="Delete" color="red" size="large"  onClick ={handleDeleteDimmer}/>

          </div>:null}
        </Segment>
        {props.listdetails.card_in_list.map((card)=>(
             <Grid.Column>
               {console.log(card)}
              <CardItem  carddetails ={card} projectmain= {props.projectmain} update = {props.update} permission={props.permission}/>
             </Grid.Column>
        ))}

          <Dimmer active={active} onClickOutside={handleHide}>
            <Header as='h2' icon inverted>
            Are you sure you want to delete this List. This will also delete al its cards.
            </Header>
            <div className='ui two buttons'>
          <Button basic color="red" onClick={handleDelete}>
          Delete
          </Button>
          <Button basic color='green'onClick={handleHide} >
            Cancel
          </Button>
        </div>
          </Dimmer>
         </Dimmer.Dimmable>
    )


}


export default ListItem;