import axios from "axios";
import React from "react";
import { useState, useEffect } from 'react';
import Navbar from "./Navbar2";
import { Grid, Image ,Item, Segment,Divider} from 'semantic-ui-react'
import "../styles/project.css";
import logo from "../images/TracKerlogo.png"
import bg from "../images/index1.jpeg"
import Projectitem from "./Projectitem";
import Loading from "./Loading";


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
              <span id ="project-heading-grid" >Projects</span>
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

