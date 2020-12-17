import React, { createContext, useReducer } from "react";
import {_weatherList, weatherReducer} from '../reducer/reducer.js';

export const AppContext = createContext();

export function AppProvider(props) {
  const [state, dispatch] = useReducer(weatherReducer, _weatherList);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {props.children}
    </AppContext.Provider>
  );
}
