import React, {Component} from 'react';
import {connect} from 'dva';

import leftarrow from '../../static/leftArrow.png';
import rightarrow from '../../static/rightArrow.png';

const namespace = 'weather';

const mapStateToProps = (state)=>{
    let thisstate = state[namespace];
    return {city: thisstate.current, data: thisstate.data[thisstate.current]};
};

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
                <div className="row justify-content-center" style={{height:`25rem`, width:`80%`, margin: 'auto', paddingBottom:`1rem`, borderBottom: `0.1rem solid rgba(255,255,255,0.5)`}}>
                    <div className='col-3 float-left' style={{padding:`0`}}>
                        <img className='embed-responsive' onClick={()=>this.props.prevCity(this.props.city)} src={leftarrow} style={{transform: `scale(0.7)`, marginTop:`10rem`, display:'block'}} />
                    </div>

                    <div className='col-6 flex-center'>
                    <div className="d-flex flex-column justify-content-center align-items-center w-50">
                        <h1 className='font-weight-bold pt-4'>{this.props.city}</h1>
                        <img src={this.props.data.weather} style={{transform: `scale(0.6)`}}/>
                        <h2 className='mt-3'>{this.props.data.temp + `\u2103`}</h2>
                    </div>
                    </div>

                    <div className='col-3 float-right' style={{padding:`0`}}>
                        <img className='embed-responsive' onClick={()=>this.props.nxtCity(this.props.city)} src={rightarrow} style={{transform: `scale(0.7)`, marginTop:`10rem`, display:'block'}}/>
                    </div>
                </div>
                <div className="row">

                </div>
            </div>
        );
    }

}

export default WeatherApp;