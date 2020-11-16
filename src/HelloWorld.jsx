import React, {Component} from 'react'
import api from './api.js'

class HelloWorld extends Component {

    constructor(props) {
        super(props)

        // this.buttonclicked = this.buttonclicked(this)
    }

    render() {
        return (
           <div> Hello World
            <button onClick={() => this.buttonclicked(123)}> Login </button> 
            <FooterComponent/>
            </div>
        )
    }

    buttonclicked = (abcd) => {
        
        api.getImage(abcd)
            .then(response=>console.log(response.data))
            .catch(error => console.log(error.response.data))

    }

    
}


class FooterComponent extends Component {
    render() {
        return (
            <footer>
                <div>@copyright</div>
            </footer>
        )
    }
}


export default HelloWorld;

