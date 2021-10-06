import React from "react";
import { render } from "react-dom";
import { Container, Icon, Image, Menu, Sidebar,Segment ,Dropdown} from "semantic-ui-react";
import Avatar, { genConfig } from 'react-nice-avatar';
import "../styles/navbar.css"


function Navbar(props){


  
  
    return (
    <Segment inverted>
    <Menu inverted pointing secondary>
      <Menu.Item
        name='Projects'
        //active={activeItem === 'home'}
        //onClick={this.handleItemClick}
      />
      <Menu.Item
        name='Dashboard'
        //active={activeItem === 'messages'}
        //onClick={this.handleItemClick}
      />
      <Menu.Item
        name='Users'
        //active={activeItem === 'friends'}
        //onClick={this.handleItemClick}
      />
    
    <Menu.Menu position="right">
        <div className = "avatar-navbar">
        <Avatar style={{ width: '2rem', height: '2rem' }} />
        </div>
        <div className ="dropdown">

      <Dropdown text={props.userDetails.user_name}>
        <Dropdown.Menu>
        <Dropdown.Item text='Logout' />
        <Dropdown.Item text='My DashBoard' />
        </Dropdown.Menu>
  </Dropdown>
  </div>
  
      </Menu.Menu>
    </Menu>

  </Segment>

    )
}

export default Navbar