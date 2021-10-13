import axios from "axios";
import React from "react";
import { useState, useEffect } from 'react';
import Navbar from "./Navbar2";
import { Grid, Item,Header, List,Segment} from 'semantic-ui-react'
import "../styles/dashboard.css";
import Projectitem from "./Projectitem";
import CardItemUser from "./CardItemUser";


function Dashboard(props){
    const [user,setUser] = useState();
    const [myProject,setMyProject] = useState([]);
    const [myCard, setMyCard] = useState([]);
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

          <div className="dashboard-userdetails">
          <Header className="dashboard-heading">Welcome {user&&user.name}</Header>
        
            <List>
              <List.Content className="dashboard-list-details">
                Year : {user&&user.year}
              </List.Content>
              <List.Content className="dashboard-list-details">
                Enrollment Number : {user&&user.enrollment_number}
              </List.Content>
            </List>
            </div>
            <div className="dashboard-border">
            <Segment className = "dashboard-card-grid">
          <div className="list-heading">
                My Projects
          </div>
        </Segment>
          <Grid className="dashboard-project-grid" >
              <Grid.Row>
            <Item.Group className="item-group" className="user-dashboard-grid">
                {myProject.map((project)=>(
                    <Projectitem projectDetails={project} />
                )) }
          </Item.Group>
          </Grid.Row>
  
          </Grid>
          </div>
          <div className="dashboard-border">
          <Segment className = "dashboard-card-grid">
          <div className="list-heading">
                My Assigned Cards
          </div>
        </Segment>
          <Grid className = "dashboard-card-grid" doubling columns={5}>
          {myCard.map((card)=>(
             <Grid.Column>
               {console.log(card)}
              <CardItemUser  carddetails ={card} />
             </Grid.Column>
                ))}
            </Grid>
            </div>

        </div>
    )
}

export default Dashboard;