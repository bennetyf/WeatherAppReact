import React from 'react';
import produce from 'immer';


const request = async (url, options) => {
    let res= await fetch(url, options);
    return res.json();
};

const raw_url_forecast = 'https://weatherbit-v1-mashape.p.mashape.com/forecast/3hourly?';
const raw_url_current = 'https://weatherbit-v1-mashape.p.mashape.com/current?';

const appkey = {"X-Mashape-Key": "wSo0LRcHZMmsh4rXshasAImNK7Ulp19zkGQjsnUjeMXsnpyilC"};

let urls_current = [
  raw_url_current + 'lat=-33.8688' + '&lon=151.2093',
  raw_url_current + 'lat=-27.4698' + '&lon=153.0251',
  raw_url_current + 'lat=-37.8136' + '&lon=144.9631'
];

let urls_forecast = [
    raw_url_forecast + 'lat=-33.8688' + '&lon=151.2093',
    raw_url_forecast + 'lat=-27.4698' + '&lon=153.0251',
    raw_url_forecast + 'lat=-37.8136' + '&lon=144.9631'
];

const getCurrentTemp = (raw) => {
    return raw.data[0]['app_temp'];
};

const getWeather = (raw) => {
    return raw.data[0].weather.description;
};

const getLowAndHigh = (raw, today, current_temp, current_weather) =>{
  let arr = raw.data;
  let min_temp = current_temp,
      max_temp = current_temp,
      min_weather = current_weather,
      max_weather = current_weather;

  arr.forEach((data) => {
      if(data.datetime.split(":",1)[0] === today){
          if(min_temp > data.app_temp) {
              min_temp = data.app_temp;
              min_weather = data.weather.description;
          }
          if(max_temp < data.app_temp){
              max_temp = data.app_temp;
              max_weather = data.weather.description;
          }
      }
  });
  return {lowest_temp: min_temp, highest_temp: max_temp, lowest_weather: min_weather, highest_weather: max_weather};
};

const getForecast = (raw, today) => {
    let data = raw.data;
    let temp = [];
    let weather = [];
    let res = [];
    data = data.filter((obj)=>(obj.datetime.split(":",1)[0] !== today));
    let pre_date = data[0].datetime.split(":",1)[0], cur_date = pre_date;

    data.forEach((obj) => {
        cur_date = obj.datetime.split(":",1)[0];
        if (cur_date !== pre_date) { // A new day starts
            res.push({date: pre_date,
                      temperature: temp.reduce((acc,val)=>(acc+val),0)/temp.length,
                      weather: weather[weather.length/2]});
            temp = [];
            weather = [];
            pre_date = cur_date;
        }
        temp.push(obj.app_temp);
        weather.push(obj.weather.description);
    });
    return res;
};

export default {
    // namespace: 'weather',

    //Define the state of the global model
    state: {
        data: [
                {
                    id:0,
                    weather: null,
                    temp: null,
                    today_min_temp: null,
                    today_max_temp: null,
                    today_min_weather:null,
                    today_max_weather: null,
                    forecast:[],
                },
                {
                    id:1,
                    weather: null,
                    temp: null,
                    today_min_temp: null,
                    today_max_temp: null,
                    today_min_weather:null,
                    today_max_weather: null,
                    forecast:[]
                },
                {
                    id:2,
                    weather: null,
                    temp: null,
                    today_min_temp: null,
                    today_max_temp: null,
                    today_min_weather:null,
                    today_max_weather: null,
                    forecast:[]
                }
        ],
        city_list: ['Sydney','Brisbane','Melbourne'],
        current: 0
    },

    // Using Redux-sagas for operations with side effects (async operations)
    effects:{
        *queryWeatherData({payload: pld}, {call, put}) {
            //This function should be called when dispatching actions (in the action.type field)
            //It processes async operations after which a new action is dispatched into the reducer for state updates.
            let current_temp, current_weather, raw_data_current, raw_data_forecast, today_min_max, tmp_id, forecast_res, today;
            switch (pld.action){
                case 'current':
                    raw_data_current = yield call(request, urls_current[pld.curCityID], {headers:appkey});
                    raw_data_forecast = yield call(request, urls_forecast[pld.curCityID], {headers:appkey});

                    today = raw_data_current.data[0].datetime.split(":",1)[0];
                    current_temp = getCurrentTemp(raw_data_current);
                    current_weather = getWeather(raw_data_current);
                    today_min_max = getLowAndHigh(raw_data_forecast, today, current_temp, current_weather);
                    forecast_res = getForecast(raw_data_forecast, today);
                    // console.log(forecast_res);
                    yield put({type:'changeCity', payload:{
                            id: pld.curCityID,
                            data:{
                                weather: current_weather,
                                temp: current_temp,
                                today_min_temp: today_min_max.lowest_temp,
                                today_max_temp: today_min_max.highest_temp,
                                today_min_weather:today_min_max.lowest_weather,
                                today_max_weather: today_min_max.highest_weather,
                                forecast: forecast_res
                            }
                            }});
                    break;
                case 'previous':
                    tmp_id = pld.curCityID - 1;
                    if (tmp_id < 0) tmp_id += urls_current.length;

                    raw_data_current = yield call(request, urls_current[tmp_id], {headers:appkey});
                    raw_data_forecast = yield call(request, urls_forecast[tmp_id], {headers:appkey});

                    today = raw_data_current.data[0].datetime.split(":",1)[0];
                    current_temp = getCurrentTemp(raw_data_current);
                    current_weather = getWeather(raw_data_current);
                    today_min_max = getLowAndHigh(raw_data_forecast, today, current_temp, current_weather);
                    forecast_res = getForecast(raw_data_forecast, today);

                    yield put({type:'changeCity', payload:{
                            id: tmp_id,
                            data:{
                                weather: current_weather,
                                temp: current_temp,
                                today_min_temp: today_min_max.lowest_temp,
                                today_max_temp: today_min_max.highest_temp,
                                today_min_weather:today_min_max.lowest_weather,
                                today_max_weather: today_min_max.highest_weather,
                                forecast: forecast_res
                            }
                        }});
                    break;
                case 'next':
                    tmp_id = (pld.curCityID + 1) % urls_current.length;
                    raw_data_current = yield call(request, urls_current[tmp_id], {headers:appkey});
                    raw_data_forecast = yield call(request, urls_forecast[tmp_id], {headers:appkey});

                    today = raw_data_current.data[0].datetime.split(":",1)[0];
                    current_temp = getCurrentTemp(raw_data_current);
                    current_weather = getWeather(raw_data_current);
                    today_min_max = getLowAndHigh(raw_data_forecast, today, current_temp, current_weather);
                    forecast_res = getForecast(raw_data_forecast, today);

                    yield put({type:'changeCity', payload:{
                            id: tmp_id,
                            data:{
                                weather: current_weather,
                                temp: current_temp,
                                today_min_temp: today_min_max.lowest_temp,
                                today_max_temp: today_min_max.highest_temp,
                                today_min_weather:today_min_max.lowest_weather,
                                today_max_weather: today_min_max.highest_weather,
                                forecast: forecast_res
                            }
                        }});
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
                    draft.current = pld.id;
                    draft.data[pld.id] = pld.data;
                    console.log(pld.data);
                    return draft;
                }
            );
        }
    }
};
