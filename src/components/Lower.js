import {Row} from "antd";
import {ForecastWeather} from "./ForecastWeather";
import React from "react";
import style from './style.scss';

export const LowerComponent = (props) => {
    return (
        <div className={style.lower_component}>
            <Row type="flex" align="start" justify="start">
                <ForecastWeather
                    numCol={props.numCol}
                    forecast={props.foreCast}
                />
            </Row>
        </div>
    )
};
