import {createSlice} from '@reduxjs/toolkit';
import {CityName, NameSpace, SortingOption} from '../../const';
import {ViewProcess} from '../../types/state';

const initialState: ViewProcess = {
  cityName: CityName.Paris,
  sortingType: SortingOption.Popular,
};

export const viewProcess = createSlice({
  name: NameSpace.View,
  initialState,
  reducers: {
    changeCity: (state, action) => {
      state.cityName = action.payload;
    },
    changeSorting: (state, action) => {
      state.sortingType = action.payload;
    },
  },
});

export const {changeCity, changeSorting} = viewProcess.actions;
