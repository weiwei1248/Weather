import './common/assets/css/App.css';
import {AppProvider} from './context/AppContext.js';
import WeatherIndex from './common/components/Weather/WeatherIndex.js';

function App() {

  return (
    <AppProvider>
      <WeatherIndex/>
    </AppProvider>
  );
}

export default App;
