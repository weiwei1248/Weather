import React, { createContext, useReducer } from "react";
import {_weatherList, listReducer} from '../reducer/ListReducer.js';
import {_weatherDetail, detailReducer} from '../reducer/DetailReducer.js';
import useCombinedReducer from '../reducer/useCombinedReducer.js';
// import listReducer from '../reducer/ListReducer.js';
// import detailReducer from '../reducer/DetailReducer.js';

export const AppContext = createContext();

export function AppProvider(props) {
  // const [state, dispatch] = useReducer(weatherReducer, _weatherList);
  const [state, dispatch] = useCombinedReducer({
    list: useReducer(listReducer,_weatherList),
    detail: useReducer(detailReducer,[])
  });

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {props.children}
    </AppContext.Provider>
  );
}
