import Enzyme, { shallow } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import WeatherIndex from '../common/components/Weather/WeatherIndex';
import WeatherDetail from '../common/components/Weather/WeatherDetail';
import WeatherList from '../common/components/Weather/WeatherList';
import {AppProvider} from '../context/AppContext.js';

Enzyme.configure({ adapter: new Adapter() });

describe('Index render', function() {
  it('without crashing', () => {
    shallow(<AppProvider><WeatherIndex /></AppProvider>);
  });
});

describe('Detail render', function() {
  it('without crashing', () => {
    shallow(<AppProvider><WeatherDetail /></AppProvider>);
  });
});

describe('List render', function() {
  it('without crashing', () => {
    shallow(<AppProvider><WeatherList /></AppProvider>);
  });
});