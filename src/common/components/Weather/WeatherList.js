import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Row,Col } from 'react-bootstrap';
import {WeatherDelete,WeatherRefreshList,WeatherGetDetail} from './WeatherAction.js';

function WeatherList(props) {

  return (
    <div className="location-unit">
      <Row>
        <WeatherGetDetail city={props.city} tempreture={props.tempreture} weather={props.weather} callRefresh={props.callRefresh} appId={props.appId}/>
        <Col md="auto"><WeatherRefreshList appId={props.appId} city={props.city} callRefresh={props.callRefresh}/></Col>
        <Col md="auto"><WeatherDelete id={props.id} callRefresh={props.callRefresh}/></Col>
      </Row>
    </div>
  );
}

export default WeatherList;
