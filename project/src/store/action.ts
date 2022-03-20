import {createAction} from '@reduxjs/toolkit';

const Action = {
  CHANGE_CITY: 'CHANGE_CITY',
};

export const changeCity = createAction(Action.CHANGE_CITY, (value) => ({payload: value}));
