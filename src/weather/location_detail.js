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
      console.log('ppp',props);
      setPending(false);
    }
  },[])

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
          <Col className="future-block">
            <p>10</p>
            <p>Mon</p>
            <Image src="holder.js/171x180" rounded />
            <p>15C</p>
          </Col>
          <Col className="future-block">
            <p>10</p>
            <p>Mon</p>
            <Image src="holder.js/171x180" rounded />
            <p>15C</p>
          </Col>
          <Col className="future-block">
            <p>10</p>
            <p>Mon</p>
            <Image src="holder.js/171x180" rounded />
            <p>15C</p>
          </Col>
          <Col className="future-block">
            <p>10</p>
            <p>Mon</p>
            <Image src="holder.js/171x180" rounded />
            <p>15C</p>
          </Col>
          <Col className="future-block">
            <p>10</p>
            <p>Mon</p>
            <Image src="holder.js/171x180" rounded />
            <p>15C</p>
          </Col>
        </Row>
      </div>
      
      :
      null
    }

    </div>
  );
}

export default Location_detail;
