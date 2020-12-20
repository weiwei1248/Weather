import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt,faPlus,faTimes } from '@fortawesome/free-solid-svg-icons'
import React, { useContext, useState } from "react";
import { Row,Col,Form,Button } from 'react-bootstrap';
import axios from "axios";
import {AppContext} from '../../../context/AppContext.js';
import Rainy from '../../assets/images/rainy-5.svg';
import Cloudy from '../../assets/images/cloudy.svg';
import Snowy from '../../assets/images/snowy-3.svg';
import Sun from '../../assets/images/day.svg';
import Thunder from '../../assets/images/thunder.svg';

const iconList = {
    Rain: Rainy,
    Clouds: Cloudy,
    Snow:Snowy,
    Clear:Sun,
    Extreme:Thunder
  }

//insert
export function WeatherInsert(props) {
    const [state, dispatch] = useContext(AppContext);
    const [search, setSearch] = useState('');

    function searchWeather(string) {
        axios.get(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${string}&cnt=1&units=Metric&appid=${props.appId}`)
        .then((res) => {
          dispatch({type: 'LIST_INSERT', payload: res.data});
          props.callRefresh();
        })
        .catch((error) => {
          console.log(error);
          window.alert('The city is not exist!');
        });
      }

    return (
        <Row>
            <Col xs={10}><Form.Control id="searchInput" onChange={(value) => {setSearch(value.target.value)}} value={search} type="text" placeholder="Type city name" /></Col>
            <span className="plus"><Col><FontAwesomeIcon icon={faPlus} onClick={() => searchWeather(search)}/></Col></span>
        </Row>
    );
}
//delete
export function WeatherDelete(props) {
    const [state, dispatch] = useContext(AppContext);
    function deleteElement() {
        dispatch({type: 'LIST_DELETE', payload: {index:props.index}});
        props.callRefresh();
    }

    return (
        <FontAwesomeIcon className="delete" icon={faTimes} onClick={() => deleteElement()}/>
    );
}

//refresh detail
export function WeatherRefreshDetail(props) {
    const [state, dispatch] = useContext(AppContext);

    function refreshDetail() {
        axios.get(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${props.city}&cnt=6&units=metric&appid=${props.appId}`)
        .then((res) => {
          dispatch({type: 'DETAIL_GET', payload: {res:res.data,iconList:iconList}});
          props.callRefresh();
        })
        .catch((error) => {
          console.log(error);
          window.alert('The city is not exist!');
        });
      }

    return (
        <FontAwesomeIcon className="refresh" icon={faSyncAlt} onClick={() => refreshDetail()}/>
    );
}

//refresh list
export function WeatherRefreshList(props) {
    const [state, dispatch] = useContext(AppContext);

    function refreshElement() {
        axios.get(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${props.city}&cnt=1&units=Metric&appid=${props.appId}`)
        .then((res) => {
          dispatch({type: 'LIST_UPDATE', payload: res.data});
          props.callRefresh();
        })
        .catch((error) => {
          console.log(error);
          window.alert('The city is not exist!');
        });
      }

    return (
        <FontAwesomeIcon className="refresh" icon={faSyncAlt} onClick={() => refreshElement()}/>
    );
}

//get detail
export function WeatherGetDetail(props) {
    const [state, dispatch] = useContext(AppContext);

    function getWeatherDetail() {
        axios.get(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${props.city}&units=metric&cnt=6&appid=${props.appId}`)
        .then((res) => {
            dispatch({type: 'DETAIL_GET', payload: {res:res.data,iconList:iconList}});
            props.callRefresh();
        })
        .catch((error) => {
        console.log(error);
        window.alert('The city is not exist!');
        })
      }

    return (
        <Col className="cityName" onClick={() => {getWeatherDetail()}}>
          {props.city} {props.tempreture} &#8451; <img style={{width:'20%'}} src={iconList[props.weather]} alt='weather'/>
        </Col>
    );
}

//clear
export function WeatherClear(props) {
    const [state, dispatch] = useContext(AppContext);

    return (
        <div className="clear-btn">
            <Button onClick={() => {
                dispatch({type: 'LIST_CLEAR'});
                props.callRefresh();}}
            >Clear</Button>
        </div>
    );
}