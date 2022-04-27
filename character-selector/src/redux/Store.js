import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from './movies';
import charactersReducer from './characters';

export default configureStore({
    reducer: {
        movies: moviesReducer,
        characters: charactersReducer
    }
});
