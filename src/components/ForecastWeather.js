import {Col} from "antd";
import React from "react";
import {Loading, mapWeatherToImage, toDecimal} from "../utils/utils";
import style from './style.scss';

export const ForecastWeather = (props) => {
    let colWidth = 24 / props.numCol;

    if (props.forecast.length === 0)
        return (
            <Col span={24}>
                {Loading()}
            </Col>
        );
    else {
        return props.forecast.map((obj, index) => (
            <Col span={colWidth} key={index}>
                <div className={style.forecast_item_box}>
                    <div className={style.box}>
                        <img src={mapWeatherToImage(obj.weather)}/>
                    </div>
                    <div className={style.temperature}>{toDecimal(obj.temperature, 1) + `\u2103`}</div>
                    <div className={style.date}>{obj.date}</div>
                </div>
            </Col>
        ));
    }
};