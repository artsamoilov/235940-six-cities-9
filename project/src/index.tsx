import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import {Offers} from './mocks/offers';
import {AMSTERDAM} from './mocks/city';

ReactDOM.render(
  <React.StrictMode>
    <App offers={Offers} city={AMSTERDAM}/>
  </React.StrictMode>,
  document.getElementById('root'));
