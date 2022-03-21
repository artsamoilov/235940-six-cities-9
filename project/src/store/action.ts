import {createAction} from '@reduxjs/toolkit';

const Action = {
  CHANGE_CITY: 'CHANGE_CITY',
  CHANGE_SORTING: 'CHANGE_SORTING',
};

export const changeCity = createAction(Action.CHANGE_CITY, (value) => ({payload: value}));

export const changeSorting = createAction(Action.CHANGE_SORTING, (value) => ({payload: value}));
