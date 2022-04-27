import { createSlice } from "@reduxjs/toolkit";

export const charactersSlice = createSlice({
    name: "characters",
    initialState: {
        characters: null
    },
    reducers: {
        setCharacters: (state, action) => {
            state.characters = action.payload;
        }
    }
});

export const {setCharacters} = charactersSlice.actions;

export default charactersSlice.reducer;