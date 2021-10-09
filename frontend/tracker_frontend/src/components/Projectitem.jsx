import React from "react";
import {Item,List,Divider} from 'semantic-ui-react'
import omniportimage from "../images/index.png"
import "../styles/project.css";

function Projectitem(props){

  console.log("hi")
    return(

       <Item id="item-container"> 
          <Item.Image src={omniportimage}  size='tiny' rounded/>
          <Item.Content>
          {/* <div className="project-heading"> */}
          <Item.Header as='a' className="item-heading">{props.projectDetails.project_name}</Item.Header>
          {/* </div> */}
          {/* <div id ="descrption"> */}
          <Item.Meta></Item.Meta>
          {/* </div> */}
          <Item.Description>
            {props.projectDetails.project_desc}
          </Item.Description>
          <Item.Extra >
          <List horizontal>
          {props.projectDetails.project_maintained_by.map((maintainer)=>(
            <List.Item>
            <List.Content>
                  <List.Header className="item-extra"> {maintainer.name}</List.Header>
                 
            </List.Content>
            </List.Item>
            )) }
            </List>

          </Item.Extra>

        
          
          </Item.Content>
        </Item>
        
      )
}

export default Projectitem;


