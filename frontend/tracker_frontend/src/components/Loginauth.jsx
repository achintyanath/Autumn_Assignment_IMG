import axios from "axios";
import React from "react";


class Loginauth extends React.Component{

    constructor() {
        super();
        const searchParams = new URLSearchParams(window.location.search);
        const code = searchParams.get('code')
        const state = searchParams.get('state')
        this.state = { code :code ,state:state};
      }

    componentDidMount() {
       
      }
    
   render(){
     return (
         <div>
        {console.log(this.state.code)}
        {/* {console.log(state)} */}
             In Login Auth
         </div>
     )  
   } 

    
}
 export default Loginauth;