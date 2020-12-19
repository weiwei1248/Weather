import React, { useCallback, useState, useEffect, useContext } from "react";
import { Container,Row,Col} from 'react-bootstrap';
import {AppContext} from '../../../context/AppContext.js';
import WeatherList from './WeatherList.js';
import WeatherDetail from './WeatherDetail.js';
import {WeatherInsert,WeatherClear} from './WeatherAction.js';

export default function WeatherIndex() {
  const appId = 'c51223c219d6aec8cb8c5210449bd859';
  const [state] = useContext(AppContext);
  const weatherList = state.list;
  const weatherDetail = state.detail;
  const [refresh, setRefresh] = useState(true);
  const [list, setList] = useState();

  const callRefresh = useCallback(() => setRefresh(true),[]);

  function locationList (data) {
    return (
      data.map((d, index) => {
        return (
          <WeatherList
          key={index}
          id={d.id}
          city={d.city}
          tempreture={d.tempreture}
          weather={d.weather}
          icon={d.icon}
          callRefresh={callRefresh}
          appId={appId}
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
  });

  return (
    <div className="weather-index">
      <Container>
        <Row>
          <Col sm={4} className="left-panel">
            <div className="searh-panel">
              <WeatherInsert appId={appId} callRefresh={callRefresh}/>
            </div>
            <div className="location-box">
              <div className="second-title">Recent locations</div>
              {list}
            </div>
            <WeatherClear callRefresh={callRefresh}/>
          </Col>
          <Col sm={8} className="right-panel">
            {weatherDetail.id != undefined ?
              <WeatherDetail weatherDetail={weatherDetail} callRefresh={callRefresh} appId={appId}/>
              :
              null
            }
          </Col>
        </Row>
      </Container>
    </div>
  );
}
