const _weatherDetail = {
  id:'',
  tempreture:'',
  city:'',
  weather:'',
  pressure:'',
  wind:'',
  days:[]
}
const detailReducer = (state, {type, payload}) => {
  switch(type) {
    case 'DETAIL_GET' :{
      state.id = payload.id;
      state.tempreture = payload.tempreture;
      state.wind = payload.wind;
      state.pressure = payload.pressure;
      state.city = payload.city;
      state.weather = payload.weather;
      state.days = payload.days;
      break;
    }
  }
  return state;
}

export {
  _weatherDetail, detailReducer,
}
