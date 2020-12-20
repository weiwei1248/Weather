import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Row,Col } from 'react-bootstrap';
import {WeatherDelete,WeatherRefreshList,WeatherGetDetail} from './WeatherAction.js';

function WeatherList(props) {

  return (
    <div className="location-unit">
      <Row>
        <WeatherGetDetail city={props.city} tempreture={props.tempreture} weather={props.weather} callRefresh={props.callRefresh} appId={props.appId}/>
        <Col md="auto" className="small-btn"><WeatherRefreshList appId={props.appId} city={props.city} callRefresh={props.callRefresh}/></Col>
        <Col md="auto" className="small-btn"><WeatherDelete id={props.id} callRefresh={props.callRefresh} index={props.index}/></Col>
      </Row>
    </div>
  );
}

export default WeatherList;
