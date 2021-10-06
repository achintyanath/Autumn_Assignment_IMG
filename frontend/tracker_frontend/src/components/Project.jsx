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

import { Grid, Image ,Item} from 'semantic-ui-react'
import omniportimage from "../images/index.png"
import "../styles/project.css";

import Projectitem from "./Projectitem";


function Project(props){
    
  const userDetails = props.userDetails
  const [projectDetails,setProjectDetails] = useState([]);

    useEffect(() => {
     axios.get('http://127.0.0.1:8000/TracKer/project',{
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('access_token'),
      'Content-Type': 'application/json', //the token is a variable which holds the token
      accept :'application/json',
    }
   })
  .then(function (response) {
    // console.log(response)
    console.log(typeof(response.data))
    let data = response
    setProjectDetails(response.data)
     console.log(projectDetails);
  })
  .catch(function (error) {
    console.log(error);
  });
},[projectDetails.detailarray]);

function handleClick(){
    axios.patch('http://127.0.0.1:8000/TracKer/project/2/', { project_name: "Changed" },{
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('access_token'),
        'Content-Type': 'application/json', //the token is a variable which holds the token
        accept :'application/json',
      }
     })
    .then(function(response){
      console.log(response);
    })
}

return(
    <div>
      {console.log("here1")}
      {console.log("Hi")}
      <Navbar userDetails={userDetails} />
      <div className= "container">
      <div className = "left">
      <Grid>
        <Grid.Column width={15}>
        <Item.Group>


        {projectDetails.map((project)=>(
          //console.log(project)
           <Projectitem projectDetails={project} />
          )) }


          <Item>
          <Item.Image size='tiny' src={omniportimage}  rounded/>

       <Item.Content>
          <Item.Header as='a'>Header</Item.Header>
          <Item.Meta>Description</Item.Meta>
          <Item.Description>
          <Image src='/images/wireframe/short-paragraph.png' />
          </Item.Description>
          <Item.Extra>Additional Details</Item.Extra>
          </Item.Content>
          </Item>
        </Item.Group>
        </Grid.Column>
        <Grid.Column width={9}>
        {/* <Image src='/images/wireframe/paragraph.png' /> */}
        </Grid.Column>
  </Grid>
     </div>
     <div className="right">
     <div>hi</div>
      <Link to="/projectitem">hi</Link>
     </div>
      </div>
      <button onClick={handleClick}>Post</button>
    </div>
    )
    

//     else{
//     return(

//     <div>
//     {console.log("Here")}
//     <Navbar userDetails={userDetails} />
//     <div className= "container">
//     <div className = "left">
//     <Grid>
//       <Grid.Column width={15}>
//       {/* <Item.Group> */}
//       {/* {projectDetails.detailarray.map((project)=>(
//         <Projectitem projectDetails={project} />
//       )) } */}
//         {/* <Item>
//         <Item.Image size='tiny' src={omniportimage}  rounded/>

//      <Item.Content>
//         <Item.Header as='a'>Header</Item.Header>
//         <Item.Meta>Description</Item.Meta>
//         <Item.Description>
//         <Image src='/images/wireframe/short-paragraph.png' />
//         </Item.Description>
//         <Item.Extra>Additional Details</Item.Extra>
//         </Item.Content>
//         </Item> */}
//       {/* </Item.Group> */}
//       </Grid.Column>
//       <Grid.Column width={9}>
//       {/* <Image src='/images/wireframe/paragraph.png' /> */}
//       </Grid.Column>
// </Grid>
//    </div>
//    <div className="right">
//    <div>hi</div>
//     <Link to="/projectitem">hi</Link>
//    </div>
//     </div>
//   </div>
//     )
//     }
}
export default Project;

