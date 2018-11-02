import React, {Component} from 'react';
import produce from 'immer';
import request from '../utils/ajax';

import cldy from '../../static/cloudy.png';
import rain from '../../static/rain.png';
import snow from '../../static/snow.png';
import sunny from '../../static/sunny.png';
import ts from '../../static/thunderStorm.png';

const raw_url = 'https://weatherbit-v1-mashape.p.mashape.com/current?';
const appkey = {"X-Mashape-Key": "wSo0LRcHZMmsh4rXshasAImNK7Ulp19zkGQjsnUjeMXsnpyilC"};
const urls = {
  Sydney: raw_url + 'lat=-33.8688' + '&lon=151.2093',
  Brisbane: raw_url + 'lat=-27.4698' + '&lon=153.0251',
  Melbourne: raw_url + 'lat=-37.8136' + '&lon=144.9631'
};

const getWeather = (des) =>{
    // console.log(des);
    // console.log(typeof (cldy));
    switch(des){
        case 'Broken clouds':
        case 'Overcast clouds':
        case 'Scattered clouds':
           return cldy;
        case 'Clear sky':
            return sunny;
        case 'Drizzle':
        case 'Light rain':
        case 'Moderate rain':
            return rain;
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

    // Using Redux-sagas for operations with side effects (async operations)
    effects:{
        *queryWeatherData({payload: pld}, {call, put}) {
            //This function should be called when dispatching actions (in the action.type field)
            //It processes async operations after which a new action is dispatched into the reducer for state updates.
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

    // Reducers for changing the states in the store
    // (must be pure functions and return a new object instead of just a reference)
    reducers: {
        changeCity(state, {payload:pld}) { //parameters are state and action, we only need the payload in the action object here.
            return produce(state, (draft) => {  //produce from immerjs returns a new object and can be used as the new state.
                    draft.current = pld.name;
                    draft.data[pld.name].temp = pld.temp;
                    draft.data[pld.name].weather = pld.weather;
                    return draft;
                }
            );
        }
    }
};
