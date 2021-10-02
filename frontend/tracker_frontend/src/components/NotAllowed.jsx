import React from "react";
import { Message} from 'semantic-ui-react'


function NotAllowed(){

  return (
    <Message negative>
    <Message.Header>Sorry, You dont have access to this app.</Message.Header>
  </Message>
  )
}
export default NotAllowed;