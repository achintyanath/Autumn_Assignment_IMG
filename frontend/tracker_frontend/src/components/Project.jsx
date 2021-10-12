import axios from "axios";
import React from "react";
import { useState, useEffect } from 'react';
import Navbar from "./Navbar2";
import { Grid, Image ,Item, Divider,Icon} from 'semantic-ui-react'
import "../styles/project.css";
import logo from "../images/TracKerlogo.png"
import Projectitem from "./Projectitem";
import Loading from "./Loading";
import { Link } from "react-router-dom";


function Project(props){
  const [loading,setLoading] = useState(true)
  const userDetails = props.userDetails
  const [projectDetails,setProjectDetails] = useState([]);

  useEffect(()=>{
    setLoading(false);
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

return(

  loading?<Loading />:
    <div className="bg">
      <Navbar userDetails={userDetails} />
      <div className= "container-project">
        <Grid divided columns="2" className="grid-project">
       
          <Grid.Column className ="grid-left" width={6}>
            <div className="project-heading-icon">
              <div id ="project-heading-grid" >Projects</div>
              <div>
              <Link to ={{pathname : `/addproject`}}>  
                 <Icon name='add' link aria-label="Edit" color="green" size="large"/>
                 </Link>
                 </div>
              </div>
              <Item.Group className="item-group">
                {projectDetails.map((project)=>(
               
                    <Projectitem projectDetails={project} />
                
                )) }
              </Item.Group>
          </Grid.Column>
      
          <Grid.Column className="grid-right">
            <div className="project-tracker-heading">
                  Tracker
            </div>
            <div className="i">
                <Image src={logo} 
                        size="medium" />
            </div>
            <div>
            <p className="">
                  Made for IMG, BY IMG 
            </p>
            </div>
        </Grid.Column>
        <Divider vertical></Divider>
      </Grid>
    </div>
  </div>

    )
  
}
export default Project;

