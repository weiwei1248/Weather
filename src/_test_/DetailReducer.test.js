import { useReducer } from 'react'
import {renderHook,act } from '@testing-library/react-hooks';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import DetailReducer from '../reducer/DetailReducer';

Enzyme.configure({ adapter: new Adapter() });

describe('DetailReducer', function() {
  it('can get & update', () => {
    const { result } = renderHook(() => useReducer(DetailReducer, []))
    const [initialState, dispatch] = result.current;
    const iconList = {Rain:123,Clear:456};
    act(() => {
      dispatch({type: 'DETAIL_GET', payload:{res:{city:{id:123,name:'London'},list:[{temp:{day:12},weather:[{main:'Clear'}],pressure:556,speed:1245,deg:5566},{temp:{day:15},weather:[{main:'Rain'}],pressure:778,speed:996,deg:668}]},iconList:iconList} });
    });
    const [state] = result.current;
    expect(state.id).toStrictEqual(123);
  });

});