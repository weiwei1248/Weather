function prepend(arr,item) {
  if(arr != '') {
    if(arr.length == 8) {arr.pop();}
  }
  return [item].concat(arr);
}

function deleteElement(arr,index) {
  arr.splice(index,1);
  return arr;
}

function updateElement(arr,id,item) {
  const objIndex = arr.findIndex((obj => obj.id == id));
  if(objIndex != -1) {
    arr[objIndex] = item;
  }
  return arr;
}

export default function ListReducer(state, {type, payload}) {
  switch (type) {
    case 'LIST_INSERT':{
      const detail = {
        id:payload.city.id,
        city:payload.city.name,
        tempreture:payload.list[0].temp.day,
        weather:payload.list[0].weather[0].main,
      }
      state = prepend(state,detail);
      break;
    }
    case 'LIST_DELETE':{
      state = deleteElement(state, payload.index);
      break;
    }
    case 'LIST_UPDATE':{
      const detail = {
        id:payload.city.id,
        city:payload.city.name,
        tempreture:payload.list[0].temp.day,
        weather:payload.list[0].weather[0].main,
      }
      state = updateElement(state,payload.city.id,detail);
      break;
    }
    case 'LIST_CLEAR':{
      state = [];
      break;
    }
    default: break;
  }
  return state;
}
