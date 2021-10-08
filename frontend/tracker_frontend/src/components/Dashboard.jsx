import axios from "axios";
import React from "react";
import { useState, useEffect } from 'react';
import Navbar from "./Navbar2";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import { Grid, Image ,Item,Segment,Table} from 'semantic-ui-react'
import omniportimage from "../images/index.png"
import "../styles/projectdetail.css";
import Switch from "react-switch";
import Projectitem from "./Projectitem";


function Dashboard(props){
    console.log(props)
    const [myProject,setMyProject] = useState();
    const [myCard, setMyCard] = useState();

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/TracKer/project',{
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('access_token'),
              'Content-Type': 'application/json', //the token is a variable which holds the token
              accept :'application/json',
            }
           })
          .then(function (response) {
            let data = response.data
            // console.log(data)
            const proj =[]
             data.filter((project)=>{
                const users = project.project_maintained_by;
                users.forEach((user)=> {
                    if(user.id === props.userDetails.user_id){
                        proj.push(project)
                    }                    
                });
            })
            // console.log(proj)
          })
          .catch(function (error) {
            console.log(error);
          });
    }, [])

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/TracKer/card/',{
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('access_token'),
              'Content-Type': 'application/json', //the token is a variable which holds the token
              accept :'application/json',
            }
           })
          .then(function (response) {
            let data = response.data
            const cards = []
            data.filter((card)=>{
                card.card_assigned_to.forEach((user)=> {
                    if(user.id === props.userDetails.user_id){
                        cards.push(card)
                    }                    
                });
            })

            console.log(cards)
          })
          .catch(function (error) {
            console.log(error);
          });
    }, [])

    return(
        <div>

        {/* ui aayega yahan aaj raat tak */}
        </div>
    )
}

export default Dashboard;