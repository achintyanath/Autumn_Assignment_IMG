import axios from "axios";
import React from "react";
import { useState, useEffect } from 'react';
import { Grid, Image ,Item,Segment} from 'semantic-ui-react'
import logo from "../images/TracKerlogo.png"
import omniportimage from "../images/index.png"

function Projectitem(props){


  console.log("hi")
    return(
   
       <Item>
          <Item.Image src={omniportimage}  size='tiny' rounded/>
          <Item.Content>
          <div className="project-heading">
          <Item.Header as='a'>{props.projectDetails.project_name}</Item.Header>
          </div>
          <div id ="descrption">
          <Item.Meta>{props.projectDetails.project_desc}</Item.Meta>
          </div>
          <Item.Description>
          {/* <Image src='/images/wireframe/short-paragraph.png' /> */}
          </Item.Description>
          {props.projectDetails.project_maintained_by.map((maintainer)=>(
          <Item.Extra>{}</Item.Extra>
        )) }
          
          </Item.Content>
        </Item>
    )
}

export default Projectitem;


