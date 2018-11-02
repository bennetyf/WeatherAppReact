import React, {Component} from 'react';
import {connect} from 'dva';

import leftarrow from '../../static/leftArrow.png';
import rightarrow from '../../static/rightArrow.png';

// import './index.css';

const namespace = 'weather';

// Map the general state into the properties sent to the component
// It returns the properties that should be sent to the component
const mapStateToProps = (state)=>{
    let thisstate = state[namespace];
    return {city: thisstate.current, data: thisstate.data[thisstate.current]};
};

// Map the dispatch function into the properties sent to the component
// The name of these functions are the possible onClick functions in the component
// It returns an object containing all the possible functions.
const mapDispatchToProps = (dispatch) => {
  return {
      currentCity: (city) => {
        dispatch({
            type: `${namespace}/queryWeatherData`,
            payload: {curCity: city, action:'current'}
        })
      },

      prevCity: (city) => {
          dispatch({
              type: `${namespace}/queryWeatherData`,
              payload: {curCity: city, action:'previous'}
          })
      },

      nxtCity: (city) => {
          dispatch({
              type: `${namespace}/queryWeatherData`,
              payload: {curCity: city, action:'next'}
          })
      }
  }
};

// Connect these two functions: mapStateToProps and mapDispatchToProps with the component
@connect(mapStateToProps, mapDispatchToProps)
class WeatherApp extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){
        this.props.currentCity(this.props.city);
    }

    render(){
        return(
            <div>
                <div className="row justify-content-center res" style={{height:`35rem`, width:`80%`, margin: 'auto', paddingBottom:`3rem`, borderBottom: `0.1rem solid rgba(255,255,255,0.5)`}}>
                    <div className='col-3 float-left' style={{padding:`0`}}>
                        <img className='img-fluid' onClick={()=>this.props.prevCity(this.props.city)} src={leftarrow} style={{transform: `scale(0.7)`, marginTop:`10rem`, display:'block'}} />
                    </div>

                    <div className='col-6 flex-center'>
                    <div className="d-flex flex-column justify-content-center align-items-center w-75 mt-0">
                        <h1 className='font-weight-bold h1-responsive mb-4'>{this.props.city}</h1>
                        <img className='img-fluid mb-4' src={this.props.data.weather} style={{transform: `scale(1.2)`}}/>
                        <h2 className='font-weight-light mt-3 h2-responsive mb-5'>{this.props.data.temp + `\u2103`}</h2>
                        <div className="w-100">
                            <h5 className='float-left font-weight-light h4-responsive'>{this.props.data.temp + `\u2103`}</h5>
                            <h5 className='float-right font-weight-light h4-responsive'>{this.props.data.temp + `\u2103`}</h5>
                        </div>
                    </div>
                    </div>

                    <div className='col-3 float-right' style={{padding:`0`}}>
                        <img className='img-fluid' onClick={()=>this.props.nxtCity(this.props.city)} src={rightarrow} style={{transform: `scale(0.7)`, marginTop:`10rem`, display:'block'}}/>
                    </div>
                </div>
                <div className="row">

                </div>
            </div>
        );
    }

}

export default WeatherApp;