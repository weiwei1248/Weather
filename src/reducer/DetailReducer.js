export default function DetailReducer(state, {type, payload}) {
  const weekDay = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  switch(type) {
    case 'DETAIL_GET' :{
      state.id = payload.res.city.id;
      state.city = payload.res.city.name;
      state.tempreture = payload.res.list[0].temp.day;
      state.weather = payload.res.list[0].weather[0].main;
      state.pressure = payload.res.list[0].pressure;
      state.wind = payload.res.list[0].speed + ' ms ' + payload.res.list[0].deg + ' deg';
      state.icon = payload.iconList[payload.res.list[0].weather[0].main];
      state.days = [];

      for(let i = 1; i < payload.res.list.length; i++) {
        let newDay = new Date(new Date().setDate(new Date().getDate() + i))
        const day = weekDay[newDay.getDay()];
        const wea = payload.res.list[i].weather[0].main;
        const date = newDay.getDate();
        const tem = payload.res.list[i].temp.day;
        state.days.push({date:date,day:day,weather:wea,tempreture:tem,icon:payload.iconList[wea]});
      }
      break;
    }
    default: break;
  }
  return state;
}
