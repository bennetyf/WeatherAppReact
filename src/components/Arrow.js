import leftarrow from '../../static/leftArrow.png';
import rightarrow from '../../static/rightArrow.png';
import React from "react";
import style from './style.scss';

export const Arrow = (props) => {
    if (props.direction === 'left') {
        return (
            <div className={style.arrow}>
                <img onClick={() => props.changeCity(props.cityId)} src={leftarrow}
                     style={{width: `100%`, display: `block`}}/>
            </div>);
    }
    if (props.direction === 'right'){
        return (
            <div className={style.arrow}>
                <img onClick={() => props.changeCity(props.cityId)} src={rightarrow}
                     style={{width: `100%`, display: `block`}}/>
            </div>);
    }
};