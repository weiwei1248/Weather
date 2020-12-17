import 'bootstrap/dist/css/bootstrap.min.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import React, { useCallback, useState, useEffect,useRef,useReducer,useContext } from "react";
import { Container,Row,Col,Form } from 'react-bootstrap';
import Location_unit from './location_unit.js';
import Location_detail from './location_detail.js';
import {AppContext} from '../context/AppContext.js';
import axios from "axios";

export default function WeatherIndex() {
  const [search, setSearch] = useState('');
  const appId = 'c51223c219d6aec8cb8c5210449bd859';
  const [state, dispatch] = useContext(AppContext);
  const weatherList = state.list;
  const weatherDetail = state.detail;
  const [refresh, setRefresh] = useState(true);
  const [list, setList] = useState();

  const deleteElement = useCallback((valueID) => {
    dispatch({type: 'LIST_DELETE', payload: {id: valueID}});
    setRefresh(true);
  });

  const refreshElement = useCallback((city) => {
    searchWeather(city,'LIST_UPDATE');
  });

  const getDetail = useCallback((city) => {
    axios.get(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&cnt=6&appid=${appId}`)
    .then((res) => {
      if(res.status == '200') {
        const weekDay = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        const detail = {
          id:res.data.city.id,
          city:res.data.city.name,
          tempreture:res.data.list[0].temp.day,
          weather:res.data.list[0].weather[0].main,
          pressure:res.data.list[0].pressure,
          wind:res.data.list[0].speed + ' ms ' + res.data.list[0].deg,
          days:[],
        }
        for(let i = 1; i < res.data.list.length; i++) {
          let newDay = new Date(new Date().setDate(new Date().getDate() + i))
          const day = weekDay[newDay.getDay()];
          const wea = res.data.list[i].weather[0].main;
          const date = newDay.getDate();
          const tem = res.data.list[i].temp.day;
          detail.days.push({date:date,day:day,weather:wea,tempreture:tem});
        }
        dispatch({type: 'DETAIL_GET', payload: detail});
        setRefresh(true);
      }
    });
  });

  function searchWeather(string,handle) {
    axios.get(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${string}&cnt=1&appid=${appId}`)
    .then((res) => {
      if(res.status == '200') {
        const detail = {
          id:res.data.city.id,
          city:res.data.city.name,
          tempreture:res.data.list[0].temp.day,
          weather:res.data.list[0].weather[0].main,
        }
        dispatch({type: handle, payload: detail});
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
        weather={d.weather}
        deleteElement={deleteElement}
        refreshElement={refreshElement}
        getDetail={getDetail}
        />
      );
    })
  );
}

  useEffect(() => {
    function fetchData() {
      if(refresh && state) {
        setList(locationList(weatherList));
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
                <span className="plus"><Col><FontAwesomeIcon icon={faPlus} onClick={() => {searchWeather(search,'LIST_INSERT');}}/></Col></span>
              </Row>
            </div>
            <div className="location-box">
              <div className="second-title">Recent locations</div>
              {list}
            </div>
          </Col>
          <Col sm={8} className="right-panel">
            <Location_detail weatherDetail={weatherDetail} refresh={refresh}/>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
