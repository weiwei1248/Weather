import React, { createContext, useReducer } from "react";
import ListReducer from '../reducer/ListReducer.js';
import DetailReducer from '../reducer/DetailReducer.js';
import useCombinedReducer from '../reducer/useCombinedReducer.js';

//define public context and commbine all reducers
export const AppContext = createContext();

export function AppProvider(props) {
  const [state, dispatch] = useCombinedReducer({
    list: useReducer(ListReducer,[]),
    detail: useReducer(DetailReducer,[])
  });

  return (
    <AppContext.Provider value={[state, dispatch]}>
      {props.children}
    </AppContext.Provider>
  );
}
