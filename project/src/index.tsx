import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {store} from './store';
import {fetchOffersAction, checkAuthAction} from './store/api-actions';
import {ToastContainer} from 'react-toastify';
import {browserHistory} from './browser-history';
import 'react-toastify/dist/ReactToastify.css';
import App from './components/app/app';
import HistoryRouter from './components/history-route/history-route';

store.dispatch(fetchOffersAction());
store.dispatch(checkAuthAction());

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <HistoryRouter history={browserHistory}>
        <ToastContainer />
        <App />
      </HistoryRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
