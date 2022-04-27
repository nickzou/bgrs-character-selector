import { createSlice } from "@reduxjs/toolkit";

export const moviesSlice = createSlice({
    name: "moviesSlice",
    initialState: {
        movies: null
    },
    reducers: {
        setMovies: (state, action) => {
            state.movies = action.payload;
        }
    }
});

export const {setMovies} = moviesSlice.actions;

export default moviesSlice.reducer;