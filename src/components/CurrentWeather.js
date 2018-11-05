import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {Loading, mapWeatherToImage, checkNull} from "../utils/utils";

const Display = (props)=>{
    return(
        <div>
            <div className="text-center mt-5 embed-responsive">
                <img src={mapWeatherToImage(props.weather)} style={{width:`45%`}}/>
            </div>

            <div className="text-center mt-5">
                <h3 className='h3-responsive text-white'>{checkNull(props.temperature)}</h3>
            </div>

            <div className="mt-5 d-flex justify-content-between align-items-center h-100">
                <div className="text-center flex-fill">
                    <h6 className='h6-responsive text-white mb-4'>{checkNull(props.min_temperature)}</h6>
                    <h6 className='h6-responsive text-white'>{props.min_weather}</h6>
                </div>
                <div className="text-center flex-fill">
                    <h6 className='h6-responsive text-white mb-4'>{checkNull(props.max_temperature)}</h6>
                    <h6 className='h6-responsive text-white'>{props.max_weather}</h6>
                </div>
            </div>
        </div>
    );
};

export const CurrentWeather = (props) => {
    return(
        <div className="mt-5">
            <div className="text-center">
                <h1 className='font-weight-bold text-white h1-responsive'>{props.city}</h1>
            </div>

            {
                (()=>{
                        if (checkNull(props.temperature) === '') {
                            return Loading();
                        } else {
                            return Display(props);
                    }})()
            }

        </div>
    );
};