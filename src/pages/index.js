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
            <div className="container">
                <div className="row h-50 justify-content-center" style={{margin: '4rem 8rem'}}>
                    <div className='col-3 float-left'>
                        <img className='embed-responsive' onClick={()=>this.props.prevCity(this.props.city)} src={leftarrow} style={{transform: `scale(0.8)`, margin:`8rem auto`, display:'block'}} />
                    </div>

                    <div className='col-6 flex-center'>
                    <div className="d-flex flex-column justify-content-center align-items-center w-50">
                        <h1 className='font-weight-bold pt-4'>{this.props.city}</h1>
                        <img src={this.props.data.weather} style={{transform: `scale(0.6)`}}/>
                        <h2>{this.props.data.temp + `\u2103`}</h2>
                    </div>
                    </div>

                    <div className='col-3 float-right'>
                        <img className='embed-responsive' onClick={()=>this.props.nxtCity(this.props.city)} src={rightarrow} style={{transform: `scale(0.8)`, margin: `8rem auto`, display:'block'}}/>
                    </div>
                </div>
                <div className="row">

                </div>
            </div>
        );
    }

}

export default WeatherApp;