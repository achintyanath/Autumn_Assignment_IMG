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
import CardItem from "./CardItem";

function CommentItem(){

  return(
 <Comment.Group>
 <Comment>
   <Comment.Avatar src='/images/avatar/small/matt.jpg' />
   <Comment.Content>
     <Comment.Author as='a'>Matt</Comment.Author>
     <Comment.Metadata>
       <div>Today at 5:42PM</div>
     </Comment.Metadata>
     <Comment.Text>How artistic!</Comment.Text>
     <Comment.Actions>
       <Comment.Action>Reply</Comment.Action>
     </Comment.Actions>
   </Comment.Content>
 </Comment>

 <Comment>
   <Comment.Avatar src='/images/avatar/small/elliot.jpg' />
   <Comment.Content>
     <Comment.Author as='a'>Elliot Fu</Comment.Author>
     <Comment.Metadata>
       <div>Yesterday at 12:30AM</div>
     </Comment.Metadata>
     <Comment.Text>
       <p>This has been very useful for my research. Thanks as well!</p>
     </Comment.Text>
     <Comment.Actions>
       <Comment.Action>Reply</Comment.Action>
     </Comment.Actions>
   </Comment.Content>
   <Comment.Group>
     <Comment>
       <Comment.Avatar src='/images/avatar/small/jenny.jpg' />
       <Comment.Content>
         <Comment.Author as='a'>Jenny Hess</Comment.Author>
         <Comment.Metadata>
           <div>Just now</div>
         </Comment.Metadata>
         <Comment.Text>Elliot you are always so right :)</Comment.Text>
         <Comment.Actions>
           <Comment.Action>Reply</Comment.Action>
         </Comment.Actions>
       </Comment.Content>
     </Comment>
   </Comment.Group>
 </Comment>

 <Comment>
   <Comment.Avatar src='/images/avatar/small/joe.jpg' />
   <Comment.Content>
     <Comment.Author as='a'>Joe Henderson</Comment.Author>
     <Comment.Metadata>
       <div>5 days ago</div>
     </Comment.Metadata>
     <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
     <Comment.Actions>
       <Comment.Action>Reply</Comment.Action>
     </Comment.Actions>
   </Comment.Content>
 </Comment>

</Comment.Group>
  )
}
export default CommentItem;