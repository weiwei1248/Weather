import React from "react";
import { Row,Col } from 'react-bootstrap';
import {WeatherRefreshDetail} from './WeatherAction.js';

function WeatherDetail(props) {

  function futureList (data) {
    return (
      data.map((d,index) => {
        return (
          <Col className="future-block" key={index}>
            <p>{d.date}</p>
            <p>{d.day}</p>
            <img style={{width:'50%'}} src={d.icon} alt='weather'/>
            <p>{d.tempreture} &#8451;</p>
          </Col>
        );
      })
    );
  }

  return (
    <div className="location-detail">
      <div>
        <Row>
          <Col><h3>{props.weatherDetail.city}</h3></Col>
          <Col md="auto"><WeatherRefreshDetail callRefresh={props.callRefresh} city={props.weatherDetail.city}/></Col>
        </Row>
        <Row>
          <Col className='weather-icon'><img style={{width:'50%'}} src={props.weatherDetail.icon} alt='weather'/></Col>
          <Col>
            <p>{props.weatherDetail.tempreture} &#8451;</p>
            <p>{props.weatherDetail.weather}</p>
            <p>Wind: {props.weatherDetail.wind}</p>
            <p>Pressure: {props.weatherDetail.pressure}</p>
          </Col>
        </Row>
        <Row className="future-panel">
          {props.weatherDetail.days != null ?
            futureList(props.weatherDetail.days)
            :
            null
          }
        </Row>
      </div>
    </div>
  );
}

export default WeatherDetail;
