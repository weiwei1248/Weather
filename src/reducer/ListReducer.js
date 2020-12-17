let _weatherList = [];

function prepend(arr,item) {
  if(arr != '') {
    if(arr.length == 8) {arr.pop();}
  }
  return [item].concat(arr);
}

function deleteElement(arr,item) {
  for(let i = 0; i < arr.length; i++) {
    if(arr[i].id == item) {
      arr.splice(i,1);
    }
  }
  return arr;
}

function updateElement(arr,id,item) {
  const objIndex = arr.findIndex((obj => obj.id == id));
  if(objIndex != -1) {
    arr[objIndex] = item;
  }
  return arr;
}

const listReducer = (state, {type, payload}) => {
  switch (type) {
    case 'LIST_INSERT':{
        const weatherUnit = {
          id:payload.id,
          city:payload.city,
          tempreture:payload.tempreture,
          weather:payload.weather
        }
        state = prepend(state,weatherUnit);
        break;
      }
    case 'LIST_DELETE':{
        state = deleteElement(state, payload.id);
        break;
      }
    case 'LIST_UPDATE':{
        const weatherUnit = {
          id:payload.id,
          city:payload.city,
          tempreture:payload.tempreture,
          weather:payload.weather
        }
        state = updateElement(state,payload.id,weatherUnit);
        break;
      }
  }
  return state;
}

export {
  _weatherList, listReducer,
}
