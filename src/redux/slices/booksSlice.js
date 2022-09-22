import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// createSlice принимает объект функций редуктора и его начального состояния 
//автоматически генерирует редуктор слайса с соответствующими создателями 
//действий и типами действий.

//createAsyncThunk принимает строку типа действия и функцию, которая возвращает обещание, 
//и генерирует преобразователь, который отправляет
//pending/fulfilled/rejected типы действий на основе этого обещания .
export const fetchBooks = createAsyncThunk('books/fetchBooksStatus', async (params, thunkAPI) => {
  const { sortBy, order, category, search } = params;
  const { data } = await 
     axios.get(
      `https://624c63b1d71863d7a80997bc.mockapi.io/movies?${category}&sortBy=${sortBy}&order=${order}${search}`,
      );
  return data;
});


const initialState = {
  items: [],
  status: 'loading',
};

const booksSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload; //тут указываем что state.item присвоен к payload
    },
  },
  extraReducers: {
    [fetchBooks.pending]: (state) => { //в ожидании
      state.status = 'loading';
      state.items = []; //возвращаем пустой массив если нихуя не прогрузилось 
    },
    [fetchBooks.fulfilled]: (state, action) => { //выполненный
      console.log(action, 'fulfilled');
      state.status = 'success'; //успешно
      state.items = action.payload; //а вот тут payload, все успешно прогружено 

    },
    [fetchBooks.rejected]: (state, action) => { //отклоненный
      console.log(action, 'rejected');
      state.status = 'error';
      state.items = [];//возвращаем пустой массив так как отклонено  
    },
  },
});

export const selectBooksData = (state) => state.books;

export const { setItems } = booksSlice.actions;

export default booksSlice.reducer;






