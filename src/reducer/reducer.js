let _weatherList = [];

function prepend(arr,item) {
  if(arr.length == 8) {arr.pop();}
  return [item].concat(arr);
}

const weatherReducer = (state, {type, payload}) => {
  // console.log(state,type,payload)
  switch (type) {
    case 'insert':
    {
      const _weatherUnit = {
        id:payload.id,
        city:payload.city,
        tempreture:payload.tempreture,
        weather:payload.weather
      }
      _weatherList = prepend(_weatherList,_weatherUnit)
      console.log('ccccccc',_weatherList)
      return _weatherList;
      break;
    }
  }
}

export {
  _weatherList, weatherReducer
}
