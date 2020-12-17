import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt,faTimes } from '@fortawesome/free-solid-svg-icons'
import React, { useCallback, useState, useEffect,useContext } from "react";
import { Row,Col,Image } from 'react-bootstrap';

function Location_detail(props) {
  const [pending, setPending] = useState(true);

  useEffect(() => {
    if(props) {
      console.log('yeee',props);
      setPending(false);
    }
  },[props.refresh]);

  function futureList (data) {
    return (
      data.map((d,index) => {
        return (
          <Col className="future-block" key={index}>
            <p>{d.date}</p>
            <p>{d.day}</p>
            <Image src="holder.js/171x180" rounded />
            <p>{d.tempreture}</p>
          </Col>
        );
      })
    );
  }

  return (
    <div className="location-detail">
    {!pending ?
      <div>
        <Row>
          <Col><h3>{props.weatherDetail.city}</h3></Col>
          <Col md="auto"><FontAwesomeIcon className="refresh" icon={faSyncAlt} onClick={() => props.refreshElement(props.city)}/></Col>
        </Row>
        <Row>
          <Col><Image src="holder.js/171x180" rounded /></Col>
          <Col>
            <p>{props.weatherDetail.tempreture}</p>
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
      
      :
      null
    }

    </div>
  );
}

export default Location_detail;
