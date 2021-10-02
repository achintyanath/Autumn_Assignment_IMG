import React from "react";
import { Segment, Dimmer, Image, Loader} from 'semantic-ui-react'
import logo from "../images/TracKerlogo.png"
import omniportimage from "../images/index.png"


function Loading(){


    return (
    <div>
        <Segment>
        <Dimmer active>
        <Loader>Loading</Loader>
        </Dimmer>
        <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
        </Segment>

    </div>
    )
}


export default Loading;