import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import React, { useCallback, useState, useEffect,useRef,useReducer,useContext } from "react";
import { Container,Row,Col,Form } from 'react-bootstrap';
import Location_unit from './location_unit.js';
import {AppContext} from '../context/AppContext.js';
import axios from "axios";

export default function WeatherIndex() {
  const [search, setSearch] = useState('');
  const appId = 'c51223c219d6aec8cb8c5210449bd859';
  const [state, dispatch] = useContext(AppContext);
  const [refresh, setRefresh] = useState(true);
  const [list, setList] = useState();

  function searchWeather(string) {
    axios.get(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${string}&cnt=5&appid=${appId}`)
    .then((res) => {
      console.log(res);
      if(res.status == '200') {
        dispatch({type: 'insert', payload: {id:res.data.city.id,city:res.data.city.name,tempreture:res.data.list[0].temp.day,weather:res.data.list[0].weather[0].main}});
      }
      setRefresh(true);
    });
  }

function locationList (data) {
  return (
    data.map((d, index) => {
      return (
        <Location_unit
        key={index}
        id={d.id}
        city={d.city}
        tempreture={d.tempreture}
        weather={d.weather}/>
      );
    })
  );
}

  useEffect(() => {
    function fetchData() {
      if(refresh && state) {
        setList(locationList(state));
        setRefresh(false);
      }
    }
    fetchData();
  })

  return (
    <div className="weather-index">
      <Container>
        <Row>
          <Col sm={4} className="left-panel">
            <div className="searh-panel">
              <Row>
                <Col xs={10}><Form.Control onChange={(value) => {setSearch(value.target.value)}} value={search} type="text" placeholder="Type city name" /></Col>
                <span className="plus"><Col><FontAwesomeIcon icon={faPlus} onClick={() => {searchWeather(search);}}/></Col></span>
              </Row>
            </div>
            <div className="location-box">
              <div className="second-title">Recent locations</div>
              {list}
            </div>
          </Col>
          <Col sm={8}>sm=8</Col>
        </Row>
      </Container>
    </div>
  )
}
