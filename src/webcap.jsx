import React, {Component} from 'react';
import Webcam from "react-webcam";
import { connect } from 'react-redux';
import axios from 'axios' 

class Webcap extends Component {

    constructor(props){
        super(props)
        this.state = {
            imageData: null,
            image_name: "",
            saveimage: false,
            class: null,
            probability: null,
            predFlag: true,
            timeInSec:0
    
        }
    }
    
    setRef = (webcam) => {
        this.webcam = webcam;}

    capture = () => {
        let interval = null;

        if (this.state.predFlag) {
        interval = setInterval(() => {
            if (this.state.predFlag) {
                const imageSrc = this.webcam.getScreenshot();
                this.setState({
                    imageData : imageSrc,
                    timeInSec: this.state.timeInSec+1})
                axios.post('http://127.0.0.1:5000/getPrediction',this.state).
                then(response => {
                    console.log(response)
                })
                .catch(error =>{
                    console.log(error)})

          }}, 1000);
        }
        
    };


    stopcapture = () => {

        this.setState({
            predFlag : false
        })
        
    };


    render() {
        const videoConstraints = {
            width: 480,
            height: 360,
            facingMode: 'user',
        };
        return (
            <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
              }}>
                <Webcam 
                audio = {false}
                screenshotFormat="image/jpeg"
                height={800}
                width={600}
                ref={this.setRef}
                videoConstraints={videoConstraints}/>
                <button onClick={() => this.capture()}>Start Predicting</button>
                <button onClick={() => this.stopcapture()}>Stop Predicting</button>
                <img src={this.state.imageData} />
            </div>
            
        )
    }

}

export default Webcap;