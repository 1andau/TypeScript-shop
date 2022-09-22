import { createSlice } from '@reduxjs/toolkit';

const initialState = { //первоначальное состояние 
  searchValue: '',
  categoryId: 0,
  sort: {
    name: 'popular',
    sortProperty: 'rating',
  },
};

const filterSlice = createSlice({ //принимает объект функций редуктора начального состояния
  name: 'filters', //название
  initialState, //первоначальное состояние
  reducers: {
    setCategoryId(state, action) {
      // console.log('action setCategoryId', action);
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    
    setSearchValue(state, action){
      state.searchValue = action.payload; 
    },

    setFilters(state, action) {
      if (Object.keys(action.payload).length) {
        state.categoryId = Number(action.payload.categoryId);
        state.sort = action.payload.sort;
      } else {
        state.categoryId = 0; //обнуляем
        state.sort = {
          name: 'popular',
          sortProperty: 'rating',
        };
      }
    },
  },
});

export const selectFilter = (state) => state.filter;
export const selectSort = (state) => state.filter.sort;
export const { setCategoryId, setSort, setFilters, setSearchValue } = filterSlice.actions;
export default filterSlice.reducer;
