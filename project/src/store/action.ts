import {createAction} from '@reduxjs/toolkit';

const Action = {
  CHANGE_CITY: 'CHANGE_CITY',
  GET_OFFERS: 'GET_OFFERS',
};

export const changeCity = createAction(Action.CHANGE_CITY, (value) => {
    return {payload: value};
  }
);

export const getOffers = createAction(Action.GET_OFFERS);
