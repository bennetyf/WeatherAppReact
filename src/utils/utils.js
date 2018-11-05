import cldy from '../../static/cloudy.png';
import rain from '../../static/rain.png';
import snow from '../../static/snow.png';
import sunny from '../../static/sunny.png';
import ts from '../../static/thunderStorm.png';
import React from "react";

export const mapWeatherToImage = (des) =>{
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
            return rain;
        case 'Light shower rain':
            return ts;
        default:
            return undefined;
    }
};

export const toDecimal = (num,v) => {
    let vv = Math.pow(10,v);
    return Math.round(num*vv)/vv;
};

export const showForecastWeather = (forecast, index)=>{
    if (forecast.length === 0 || index >= forecast.length)
        return '';
    else
        return mapWeatherToImage(forecast[index].weather);
};

export const showForecastTemp = (forecast, index) => {
    if (forecast.length === 0 || index >= forecast.length)
        return '';
    else
        return forecast[index].temperature;
};

export const checkNull = (data) => {
    return data === null ? '':data + ` \u2103`;
};

export const Loading = ()=>{
    return (
        <div className="d-flex justify-content-center align-items-center h-100">
            <h2 className="text-white h2-responsive"> Loading... </h2>
        </div>
    );
};