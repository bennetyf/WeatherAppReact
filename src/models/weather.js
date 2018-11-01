import React, {Component} from 'react';
import produce from 'immer';
import request from '../utils/ajax';

import cldy from '../../static/cloudy.png';
import rain from '../../static/rain.png';
import snow from '../../static/snow.png';
import sunny from '../../static/sunny.png';
import ts from '../../static/thunderStorm.png';

const raw_url = 'https://weatherbit-v1-mashape.p.mashape.com/forecast/3hourly?';
const appkey = {"X-Mashape-Key": "wSo0LRcHZMmsh4rXshasAImNK7Ulp19zkGQjsnUjeMXsnpyilC"};
const urls = {
  Sydney: raw_url + 'lat=-33.8688' + '&lon=151.2093',
  Brisbane: raw_url + 'lat=-27.4698' + '&lon=153.0251',
  Melbourne: raw_url + 'lat=-37.8136' + '&lon=144.9631'
};

const getWeather = (des) =>{
    console.log(des);
    switch(des){
        case 'Overcast clouds':
           return cldy;
        case 'Clear Sky':
            return sunny;
        default:
            return undefined;
    }
};

export default {
    // namespace: 'weather',
    //Define the state of the global model
    state: {
        data: {
            Sydney: {
                weather: null,
                temp: null
            },
            Brisbane: {
                weather: null,
                temp: null
            },
            Melbourne: {
                weather: null,
                temp: null
            }
        },
        current: 'Sydney'
    },

    effects:{
        *queryWeatherData({payload: pld}, {call, put}) {
            let current_temp, current_weather, raw_data, city;
            switch (pld.action){
                case 'current':
                    raw_data = yield call(request, urls[pld.curCity], {headers:appkey});
                    current_temp = raw_data.data[0]['app_temp'];
                    current_weather = getWeather(raw_data.data[0].weather.description);

                    yield put({type:'changeCity', payload:{name: pld.curCity,
                            temp: current_temp,
                            weather: current_weather}});
                    break;
                case 'previous':
                    switch (pld.curCity){
                        case 'Sydney':
                            city = 'Melbourne';
                            raw_data = yield call(request, urls[city], {headers:appkey});
                            current_temp = raw_data.data[0]['app_temp'];
                            current_weather = getWeather(raw_data.data[0].weather.description);

                            yield put({type:'changeCity',
                                        payload:{name: city,
                                            temp: current_temp,
                                            weather: current_weather}});
                            break;
                        case 'Melbourne':
                            city = 'Brisbane';
                            raw_data = yield call(request, urls[city], {headers:appkey});
                            current_temp = raw_data.data[0]['app_temp'];
                            current_weather = getWeather(raw_data.data[0].weather.description);

                            yield put({type:'changeCity', payload:{name: city,
                                    temp: current_temp,
                                    weather: current_weather}});
                            break;
                        case 'Brisbane':
                            city = 'Sydney';
                            raw_data = yield call(request, urls[city], {headers:appkey});
                            current_temp = raw_data.data[0]['app_temp'];
                            current_weather = getWeather(raw_data.data[0].weather.description);

                            yield put({type:'changeCity', payload:{name: city,
                                    temp: current_temp,
                                    weather: current_weather}});
                            break;
                    }
                    break;
                case 'next':
                    switch(pld.curCity){
                        case 'Sydney':
                            city = 'Brisbane';
                            raw_data = yield call(request, urls[city], {headers:appkey});
                            current_temp = raw_data.data[0]['app_temp'];
                            current_weather = getWeather(raw_data.data[0].weather.description);

                            yield put({type:'changeCity', payload:{name: city,
                                    temp: current_temp,
                                    weather: current_weather}});
                            break;
                        case 'Melbourne':
                            city = 'Sydney';
                            raw_data = yield call(request, urls[city], {headers:appkey});
                            current_temp = raw_data.data[0]['app_temp'];
                            current_weather = getWeather(raw_data.data[0].weather.description);

                            yield put({type:'changeCity', payload:{name: city,
                                    temp: current_temp,
                                    weather: current_weather}});
                            break;
                        case 'Brisbane':
                            city = 'Melbourne';
                            raw_data = yield call(request, urls[city], {headers:appkey});
                            current_temp = raw_data.data[0]['app_temp'];
                            current_weather = getWeather(raw_data.data[0].weather.description);

                            yield put({type:'changeCity', payload:{name: city,
                                    temp: current_temp,
                                    weather: current_weather}});
                            break;
                    }
                    break;
                default:
                    console.log("OutLayer");
                }
            }
        },


    reducers: {
        changeCity(state, {payload:pld}) {
            return produce(state, (draft) => {
                    draft.current = pld.name;
                    draft.data[pld.name].temp = pld.temp;
                    draft.data[pld.name].weather = pld.weather;
                    return draft;
                }
            );
        }
    }
};
