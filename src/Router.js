import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.js';
import Game from './Game.js';

const RouteSwitch = () => {
  return (
    <BrowserRouter basename={'/'}>
      <Routes>
        <Route path={process.env.PUBLIC_URL + '/'} element={<App />} />
        <Route path={process.env.PUBLIC_URL + '/:id'} element={<Game />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouteSwitch;
