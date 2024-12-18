import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    selected: null,
}

const selectedSlice = createSlice({
    name: "selected",
    initialState,
    reducers: {
        setSelected: (state, action) => {
            state.selected = action.payload;
        }
    }
})

const selectedReducer = selectedSlice.reducer;
export default selectedReducer;