import { configureStore } from '@reduxjs/toolkit'; //добаялвяет любое ПО редакса, предоставление упрощенных параметров, ипользование Redux DevTools 
import cart from './slices/cartSlice';
import books from './slices/booksSlice';
import filter from './slices/filters';


export const store = configureStore ({
reducer:{
    
    cart,
    books,
    filter,
},
}); 

