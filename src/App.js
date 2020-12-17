import logo from './logo.svg';
import './App.css';
import {AppProvider} from './context/AppContext.js';
import WeatherIndex from './weather/WeatherIndex.js';

function App() {

  return (
    <AppProvider>
      <WeatherIndex/>
    </AppProvider>
  );
}

export default App;
