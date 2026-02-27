import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import AboutUs from './Yapping';
import Basket from './basket';
import Donation from './Donation';
import SacJean from './SacJean';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/cart" element = {<Basket />}/>
        {/*<Route path="/donation" element = {<Donation/>}/>*/}
        <Route path="/SacJean" element={<SacJean />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;