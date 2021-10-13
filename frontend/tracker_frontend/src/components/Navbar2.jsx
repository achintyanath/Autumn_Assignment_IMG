import React from "react";
import { render } from "react-dom";
import { Container, Icon, Image, Menu, Sidebar,Segment ,Dropdown} from "semantic-ui-react";
import Avatar, { genConfig } from 'react-nice-avatar';
import {Link} from "react-router-dom"
import "../styles/navbar.css"


function Navbar(props){

    return (
    <Segment inverted>
    <Menu inverted pointing secondary>
      <Link to={{pathname : `/project`}}>
      <Menu.Item 
        name='Projects'
      />
      </Link>
      <Link to = {{pathname : `/dashboard`}}>
      <Menu.Item
        name='Dashboard'
      />
      </Link>
      <Link to={{pathname : `/admin`}}>
      <Menu.Item
        name='Admin'
      />
      </Link>
    
    <Menu.Menu position="right">
        <div className = "avatar-navbar">
        <Avatar style={{ width: '2rem', height: '2rem' }} />
        </div>
        <div className ="dropdown">

      <Dropdown text={props.userDetails.user_name}>
        <Dropdown.Menu>
        <Dropdown.Item text='Logout' />
        <Dropdown.Item as={Link} text='My Dashboard' to ={{pathname : `/dashboard`}}/>
       
        </Dropdown.Menu>
  </Dropdown>
  </div>
  
      </Menu.Menu>
    </Menu>

  </Segment>

    )
}

export default Navbar