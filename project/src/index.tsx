import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import App from './components/app/app';
import {Offers} from './mocks/offers';
import {store} from './store';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offers={Offers}/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
