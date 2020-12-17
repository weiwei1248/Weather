import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt,faTimes } from '@fortawesome/free-solid-svg-icons'
import React, { useCallback, useState, useEffect,useContext } from "react";
import { ListGroup } from 'react-bootstrap';
import { Row,Col } from 'react-bootstrap';

function Location_unit(props) {
  const [pending, setPending] = useState(true);

  useEffect(() => {
    if(props) {
      setPending(false);
    }
  },[props])

  return (
    <div className="location-unit">
    {!pending ?
      <Row>
        <Col className="cityName" onClick={() => {props.getDetail(props.city)}}>
          {props.city} {props.tempreture} {props.weather}
        </Col>
        <Col md="auto"><FontAwesomeIcon className="refresh" icon={faSyncAlt} onClick={() => props.refreshElement(props.city)}/></Col>
        <Col md="auto"><FontAwesomeIcon className="delete" icon={faTimes} onClick={() => props.deleteElement(props.id)}/></Col>
      </Row>
      :
      null
    }

    </div>
  );
}

export default Location_unit;
