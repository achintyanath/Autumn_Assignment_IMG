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
  function handleDelete(){
    setActive(true);
  }
  function handleHide(){
    setActive(false);
  }
  function handleEdit(){
   
  }

    return(
        
      <Dimmer.Dimmable as={Grid} dimmed={active} doubling columns={5}>
        {/* <Grid doubling columns={5}> */}
        <Segment className="listdetail-heading">
          <div className="list-heading">
          {props.listdetails.list_name}
          </div>
                 <div className = "list-icon"> 
          <Icon name='edit'link aria-label="Edit" color="blue" size="large"/>
          <Icon name='delete'link aria-label="Delete" color="red" size="large"  onClick ={handleDelete}/>

          </div>
        </Segment>
        {props.listdetails.card_in_list.map((card)=>(
             <Grid.Column>
               {console.log(card)}
              <CardItem  carddetails ={card} projectmain= {props.projectmain}/>
             </Grid.Column>
        ))}
        {/* </Grid>
         */}
          <Dimmer active={active} onClickOutside={handleHide}>
            <Header as='h2' icon inverted>
            Are you sure you want to delete this List. This will also delete al its cards.
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
         </Dimmer.Dimmable>

        

    )


}


export default ListItem;