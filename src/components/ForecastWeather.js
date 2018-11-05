import {Col} from "antd";
import React from "react";
import {Loading, mapWeatherToImage, toDecimal} from "../utils/utils";

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
                <div className="d-flex flex-column align-items-center justify-content-start h-100">
                    <div style={{height: `50%`, textAlign: `center`}}>
                        <img src={mapWeatherToImage(obj.weather)} style={{width: `50%`}}/>
                    </div>
                    <p className="mt-3 text-white text-default">{toDecimal(obj.temperature, 1) + `\u2103`}</p>
                    <p className="mt-1 text-white text-default">{obj.date}</p>
                </div>
            </Col>
        ));
    }
};