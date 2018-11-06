import React from 'react';
import {Loading, mapWeatherToImage, checkNull} from "../utils/utils";
import style from './style.scss';
// import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

const Display = (props)=>{
    return(
        <div>
            <div className={style.main_cityname}>
                {props.city}
            </div>

            <div className={style.main_image}>
                <img src={mapWeatherToImage(props.weather)}/>
            </div>

            <div className={style.main_temperature}>
                {checkNull(props.temperature)}
            </div>

            <div className={style.secondary_temperature_box}>
                <div className={style.box}>
                    <div className={style.temperature}>
                        {checkNull(props.min_temperature)}
                    </div>
                    <div className={style.weather}>
                        {props.min_weather}
                    </div>
                </div>
                <div className={style.box}>
                    <div className={style.temperature}>
                        {checkNull(props.max_temperature)}
                    </div>
                    <div className={style.weather}>
                        {props.max_weather}
                    </div>
                </div>
            </div>
        </div>
    );
};

// Define an HOC to decide which
export const CurrentWeather = (props) => {
    if (checkNull(props.temperature) === '') {
        return Loading();
    } else {
        return Display(props);
    }
};