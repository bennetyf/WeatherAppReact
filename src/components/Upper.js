import {Col, Row} from "antd";
import {Arrow} from "./Arrow";
import {CurrentWeather} from "./CurrentWeather";
import React from "react";

export const UpperComponent = (props) => {
    return(
            <div style={{margin: `1.5rem 3rem`, paddingBottom: `2rem`, borderBottom: `0.2rem solid rgba(255,255,255,0.3)`}}>
                <Row type="flex" align="center" justify="space-between">
                    <Col span={3}>
                        <Arrow
                            direction={'left'}
                            cityId={props.cityID}
                            changeCity={props.prevCity}
                        />
                    </Col>

                    <Col span={18}>
                        <CurrentWeather
                            city={props.cityName}
                            weather={props.data.weather}
                            temperature={props.data.temp}
                            min_temperature={props.data.today_min_temp}
                            max_temperature={props.data.today_max_temp}
                            min_weather={props.data.today_min_weather}
                            max_weather={props.data.today_max_weather}
                        />
                    </Col>

                    <Col span={3}>
                        <Arrow
                            direction={'right'}
                            cityId={props.cityID}
                            changeCity={props.nxtCity}
                        />
                    </Col>
                </Row>
            </div>
    );
};