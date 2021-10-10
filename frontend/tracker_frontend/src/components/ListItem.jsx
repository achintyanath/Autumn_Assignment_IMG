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

import { Grid, Image ,Item,Card,Button} from 'semantic-ui-react'
import omniportimage from "../images/index.png"
import "../styles/listitem.css";

import Projectitem from "./Projectitem";
import CardItem from "./CardItem";


function ListItem(props){



    return(
        <div>

        <div className = "list-container">
        <Grid doubling columns={5}>
        {props.listdetails.card_in_list.map((card)=>{
             <Grid.Column>
                    <CardItem  cardDetails ={card}/>
             </Grid.Column>
        })}
        </Grid>
        </div>
        </div>

    )


}


export default ListItem;