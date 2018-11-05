import React, {Component} from 'react';
import {connect} from 'dva';
import {Row,Col} from 'antd';

import leftarrow from '../../static/leftArrow.png';
import rightarrow from '../../static/rightArrow.png';

import cldy from '../../static/cloudy.png';
import rain from '../../static/rain.png';
import snow from '../../static/snow.png';
import sunny from '../../static/sunny.png';
import ts from '../../static/thunderStorm.png';

const mapWeatherToImage = (des) =>{
    switch(des){
        case 'Broken clouds':
        case 'Overcast clouds':
        case 'Scattered clouds':
        case 'Few clouds':
            return cldy;
        case 'Clear sky':
            return sunny;
        case 'Drizzle':
        case 'Light rain':
        case 'Moderate rain':
        case 'Light shower rain':
            return rain;
        default:
            return undefined;
    }
};

const toDecimal = (num,v) => {
    let vv = Math.pow(10,v);
    return Math.round(num*vv)/vv;
};

const showForecastWeather = (forecast, index)=>{
  if (forecast.length === 0 || index >= forecast.length)
      return '';
  else
      return mapWeatherToImage(forecast[index].weather);
};

const showForecastTemp = (forecast, index) => {
    if (forecast.length === 0 || index >= forecast.length)
        return '';
    else
        return forecast[index].temperature;
};

const showForecast = (forecast,numCol) => {
  if (forecast.length === 0)
      return null;
  else{
      return forecast.map((obj,index)=>(
                <Col span={numCol} key={index} className="d-flex flex-column align-items-center justify-content-start">
                    <div style={{height:`50%`,textAlign:`center`}}>
                        <img src={mapWeatherToImage(obj.weather)} style={{width:`50%`}}/>
                    </div>
                    <p className="mt-3 mb-1 text-white">{toDecimal(obj.temperature,1) + `\u2103`}</p>
                    <p className="mt-0 text-white">{obj.date}</p>
                </Col>
      ));
  }
};

const namespace = 'weather';

// Map the general state into the properties sent to the component
// It returns the properties that should be sent to the component
const mapStateToProps = (state)=>{
    let thisstate = state[namespace];
    return {cityID: thisstate.current,
            cityName: thisstate.city_list[thisstate.current],
            data: thisstate.data[thisstate.current]};
};

// Map the dispatch function into the properties sent to the component
// The name of these functions are the possible onClick functions in the component
// It returns an object containing all the possible functions.
const mapDispatchToProps = (dispatch) => {
  return {
      currentCity: (city) => {
        dispatch({
            type: `${namespace}/queryWeatherData`,
            payload: {curCityID: city, action:'current'}
        })
      },

      prevCity: (city) => {
          dispatch({
              type: `${namespace}/queryWeatherData`,
              payload: {curCityID: city, action:'previous'}
          })
      },

      nxtCity: (city) => {
          dispatch({
              type: `${namespace}/queryWeatherData`,
              payload: {curCityID: city, action:'next'}
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
        this.props.currentCity(this.props.cityID);
    }

    render(){
        return(
            <div>
                <Row type="flex" align="center" justify="space-around" style={{height:`100%`,margin:`1.5rem 3rem`, paddingBottom:`2rem`, borderBottom:`0.2rem solid rgba(255,255,255,0.3)`}}>

                    <Col span={3}>
                        <div className='d-flex flex-column flex-center'>
                            <img onClick={()=>this.props.prevCity(this.props.cityID)} src={leftarrow} style={{width:`100%`,display:`block`}}/>
                        </div>
                    </Col>

                    <Col span={18}>
                        <div className="mt-5">
                            <div className="text-center">
                                <h1 className='font-weight-bold h1-responsive text-white'>{this.props.cityName}</h1>
                            </div>

                            <div className="text-center mt-5 embed-responsive">
                                <img src={mapWeatherToImage(this.props.data.weather)} style={{width:`45%`}}/>
                            </div>

                            <div className="text-center mt-5">
                                <h3 className='h3-responsive text-white'>{this.props.data.temp + `\u2103`}</h3>
                            </div>

                            <div className="mt-5 d-flex justify-content-between align-items-center">
                                <div className="text-center flex-fill">
                                    <h6 className='h6-responsive text-white mb-4'>{this.props.data.today_min_temp + `\u2103`}</h6>
                                    <h6 className='h6-responsive text-white'>{this.props.data.today_min_weather}</h6>
                                </div>
                                <div className="text-center flex-fill">
                                    <h6 className='h6-responsive text-white mb-4'>{this.props.data.today_max_temp + `\u2103`}</h6>
                                    <h6 className='h6-responsive text-white'>{this.props.data.today_max_weather}</h6>
                                </div>
                            </div>
                        </div>
                    </Col>

                    <Col span={3}>
                        <div className="d-flex flex-column flex-center">
                            <img className="embed-responsive" onClick={()=>this.props.nxtCity(this.props.cityID)} src={rightarrow} style={{width:`100%`}}/>
                        </div>
                    </Col>
                </Row>

                <Row type="flex" align="start" justify="space-between" style={{margin:`2rem 3rem`,padding:`0`}}>
                    {showForecast(this.props.data.forecast,8)}
                </Row>

            </div>
        );
    }

}

export default WeatherApp;