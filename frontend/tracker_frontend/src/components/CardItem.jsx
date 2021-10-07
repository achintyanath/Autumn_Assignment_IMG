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

import { Grid, Image ,Item, Card, Button,Icon,Comment} from 'semantic-ui-react'
import omniportimage from "../images/index.png"
import "../styles/carditem.css";
import makeAnimated from 'react-select/animated';
import Projectitem from "./Projectitem";
import Select from 'react-select'
const animatedComponents = makeAnimated()

const options =[
  {
  label : "Astha Nath",
  value : 1
  },
  {
    label : "Achintya Nath",
    value : 2
    },
    {
      label : "Antra Nath",
      value : 3
    }
]


function CardItem(){

  const [maintainers,setMaintainers] = useState();


  function handleOnchange(event,data){
    console.log(event);
  }

    return (
        <Card>
        <Card.Content>
          <Card.Header id="card-heading">
            <div className="card-heading-text">
            Card Heading
            </div>

          <div className = "card-icon"> 
          <Icon name='delete'link aria-label="Delete" color="red"/>
          <Icon name='edit'link aria-label="Edit" color="blue" />
          </div>
          </Card.Header>

          
          <Card.Meta>Date of assignment</Card.Meta>
          <Card.Description>
           Lorem ipsum, dolor sit amet consectetur adipisicing elit. Animi ipsam aspernatur dolores inventore cumque veniam consequuntur dolorum eos quod, accusantium, assumenda incidunt nostrum neque, perferendis esse eaque aut eius excepturi.
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
        <span>
        Assigned to :
        </span>
        <Select
            closeMenuOnSelect={false}
            defaultValue={[]}
            isMulti
            options={options}
            theme={(theme) => ({
              ...theme,
              borderRadius: 1.25,
              colors: {
                ...theme.colors,
                primary25: 'browm',
                primary: 'cyan',
              }
            })}
            onChange={handleOnchange}
    />
       
        </Card.Content>
      </Card>
    )
}

export default CardItem;