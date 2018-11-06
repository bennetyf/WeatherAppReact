import cldy from '../../static/cloudy.png';
import rain from '../../static/rain.png';
import snow from '../../static/snow.png';
import sunny from '../../static/sunny.png';
import ts from '../../static/thunderStorm.png';
import React from "react";
import style from './style.scss';

export const mapWeatherToImage = (des) =>{
    switch(des){
        case 'Broken clouds':
        case 'Overcast clouds':
        case 'Scattered clouds':
        case 'Few clouds':
            return cldy;
        case 'Clear sky':
        case 'Clear Sky':
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

export const checkNull = (data) => {
    return data === null ? '':data + ` \u2103`;
};

export const Loading = ()=>{
    return (
        <div className={style.loading}>
            <div className={style.text}>
                Loading...
            </div>
        </div>
    );
};