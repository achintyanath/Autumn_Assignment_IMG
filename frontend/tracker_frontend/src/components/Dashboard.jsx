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

import { Grid, Image ,Item,Segment,Table,Header, Container, List, ListContent} from 'semantic-ui-react'
import omniportimage from "../images/index.png"
import "../styles/projectdetail.css";
import Switch from "react-switch";
import Projectitem from "./Projectitem";


function Dashboard(props){
    const [user,setUser] = useState();
    const [myProject,setMyProject] = useState();
    const [myCard, setMyCard] = useState();
    useEffect(()=>{
      axios.get(`http://127.0.0.1:8000/TracKer/maintainer/${props.userDetails.user_id}`,{
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('access_token'),
          'Content-Type': 'application/json', //the token is a variable which holds the token
          accept :'application/json',
        }
       })
      .then(function (response) {
        let data = response.data
        setUser(data);

      })
      .catch(function (error) {
        console.log(error);
      });
    },[])



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
            var proj =[]
             data.filter((project)=>{
                const users = project.project_maintained_by;
                users.forEach((user)=> {
                    if(user.id === props.userDetails.user_id){
                        proj.push(project)
                    }                    
                });
            })
            setMyProject(proj);
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
            var cards = []
            data.filter((card)=>{
                card.card_assigned_to.forEach((user)=> {
                    if(user.id === props.userDetails.user_id){
                        cards.push(card)
                    }                    
                });
            })
            setMyCard(cards);
          })
          .catch(function (error) {
            console.log(error);
          });
    }, [])

    return(
        <div className="">
          <Navbar userDetails={props.userDetails} />
          <Header>Welcome {user&&user.name}</Header>
          <Container>
            <List>
              <List.Content>
                Year : {user&&user.year}
              </List.Content>
              <List.Content>
                Enrollment Number : {user&&user.enrollment_number}
              </List.Content>
            </List>
          </Container>
          <Item.Group className="item-group">
                {myProject.map((project)=>(
                    <Projectitem projectDetails={project} />
                )) }
          </Item.Group>


      {/* <Dimmer.Dimmable as={Grid} dimmed={active} doubling columns={5}>
      
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
        ))} */}
        {/* </Grid>
         */}
          {/* <Dimmer active={active} onClickOutside={handleHide}>
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
         </Dimmer.Dimmable> */}
          
        

        </div>
    )
}

export default Dashboard;