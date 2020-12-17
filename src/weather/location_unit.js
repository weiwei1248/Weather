import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSyncAlt,faTimes } from '@fortawesome/free-solid-svg-icons'
import React, { useCallback, useState, useEffect,useRef } from "react";
import { ListGroup } from 'react-bootstrap';
import { Row,Col } from 'react-bootstrap';

function Location_unit(props) {
  const [search, setSearch] = useState('');
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
        <Col>
          {props.city} {props.tempreture} {props.weather}
        </Col>
        <Col md="auto"><FontAwesomeIcon className="refresh" icon={faSyncAlt} /></Col>
        <Col md="auto"><FontAwesomeIcon className="delete" icon={faTimes} /></Col>
      </Row>
      :
      null
    }

    </div>
  );
}

export default Location_unit;
