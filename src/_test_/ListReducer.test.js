import { useReducer } from 'react'
import {renderHook,act } from '@testing-library/react-hooks';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import ListReducer from '../reducer/ListReducer';

Enzyme.configure({ adapter: new Adapter() });

describe('ListReducer', function() {
  it('can insert', () => {
    const { result } = renderHook(() => useReducer(ListReducer, []));
    const [initialState, dispatch] = result.current;
    act(() => dispatch({type: 'LIST_INSERT', payload:{city:{id:123,name:'London'},list:[{temp:{day:12},weather:[{main:'Clear'}]}]} }));
    const [state] = result.current;
    expect(state).toStrictEqual([{ id: 123, city: 'London', tempreture: 12, weather: 'Clear' }]);
  });

  it('always add to the top', () => {
    const { result } = renderHook(() => useReducer(ListReducer, []))
    const [initialState, dispatch] = result.current
    act(() => {
      dispatch({type: 'LIST_INSERT', payload:{city:{id:123,name:'London'},list:[{temp:{day:12},weather:[{main:'Clear'}]}]} });
      dispatch({type: 'LIST_INSERT', payload:{city:{id:456,name:'Windsor'},list:[{temp:{day:35},weather:[{main:'Rain'}]}]} });
    });
    const [state] = result.current;
    expect(state).toStrictEqual(
      [ { id: 456, city: 'Windsor', tempreture: 35, weather: 'Rain' },
      { id: 123, city: 'London', tempreture: 12, weather: 'Clear' } ]
    );
  });

  it('can delete', () => {
    const { result } = renderHook(() => useReducer(ListReducer, []))
    const [initialState, dispatch] = result.current
    act(() => {
      dispatch({type: 'LIST_INSERT', payload:{city:{id:123,name:'London'},list:[{temp:{day:12},weather:[{main:'Clear'}]}]} });
      dispatch({type: 'LIST_INSERT', payload:{city:{id:456,name:'Windsor'},list:[{temp:{day:35},weather:[{main:'Rain'}]}]} });
      dispatch({type: 'LIST_DELETE', payload:{index:0}});
    });
    const [state] = result.current;
    expect(state).toStrictEqual(
      [ { id: 123, city: 'London', tempreture: 12, weather: 'Clear' } ]
    );
  });

  it('can update', () => {
    const { result } = renderHook(() => useReducer(ListReducer, []))
    const [initialState, dispatch] = result.current
    act(() => {
      dispatch({type: 'LIST_INSERT', payload:{city:{id:123,name:'London'},list:[{temp:{day:12},weather:[{main:'Clear'}]}]} });
      dispatch({type: 'LIST_UPDATE', payload:{city:{id:123,name:'Windsor'},list:[{temp:{day:35},weather:[{main:'Rain'}]}]} });
    });
    const [state] = result.current;
    expect(state).toStrictEqual(
      [ { id: 123, city: 'Windsor', tempreture: 35, weather: 'Rain' } ]
    );
  });

  it('can clear', () => {
    const { result } = renderHook(() => useReducer(ListReducer, []))
    const [initialState, dispatch] = result.current
    act(() => {
      dispatch({type: 'LIST_INSERT', payload:{city:{id:123,name:'London'},list:[{temp:{day:12},weather:[{main:'Clear'}]}]} });
      dispatch({type: 'LIST_CLEAR' });
    });
    const [state] = result.current;
    expect(state).toStrictEqual([]);
  });
});