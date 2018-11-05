import React, {Component} from 'react';
import {connect} from 'dva';

import {UpperComponent} from "../components/Upper";
import {LowerComponent} from "../components/Lower";

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
                <UpperComponent
                    cityID={this.props.cityID}
                    prevCity={this.props.prevCity}
                    nxtCity={this.props.nxtCity}
                    cityName={this.props.cityName}
                    data={this.props.data}
                />

                <LowerComponent
                    numCol={4}
                    foreCast={this.props.data.forecast}
                />

            </div>
        );
    }

}

export default WeatherApp;