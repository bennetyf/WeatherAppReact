import {Row} from "antd";
import {ForecastWeather} from "./ForecastWeather";
import React from "react";

export const LowerComponent = (props) => {
    return (
        <div style={{margin: `2rem 3rem`, padding: `0`}}>
            <Row type="flex" align="start" justify="space-between">
                <ForecastWeather
                    numCol={props.numCol}
                    forecast={props.foreCast}
                />
            </Row>
        </div>
    )
};
