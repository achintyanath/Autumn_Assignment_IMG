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

import { Grid, Image ,Item, Card, Button,Icon,Comment, Dimmer,Header,List} from 'semantic-ui-react'
import omniportimage from "../images/index.png"
import "../styles/carditem.css";
import makeAnimated from 'react-select/animated';
import Projectitem from "./Projectitem";
import Select from 'react-select'
import CommentItem from "./CommentItem";
const animatedComponents = makeAnimated()


function CardItemUser(props){
  const [active,setActive] =useState(false)
  const [maintainers,setProjectMaintainers] = useState();
  const options = props.carddetails.card_assigned_to.map((maintainer)=>{
    return {
      label : maintainer.name,
      value : maintainer.id
    }
  })
 
    return (
      <Card className="card-item">
        {/* <Card > */}
        <Card.Content className="card-item-content">
          <Card.Header id="card-heading">
            <div className="card-heading-text">
            {props.carddetails.card_title}
            </div>
          </Card.Header>  
          {/* <Card.Meta>Date of assignment</Card.Meta> */}
          <Card.Description className="card-desc" dangerouslySetInnerHTML={{ __html: props.carddetails.card_desc}}>
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <span>
        Assigned to :
        </span>
        <List horizontal>

         { options.map((maintainer)=>{
           return(
            <List.Item>
            <List.Content>
            {maintainer.label}
            </List.Content>
            </List.Item>
           )
         })}
        </List>
        {/* <CommentItem /> */}
        </Card.Content>
      </Card>
    )
}

export default CardItemUser;