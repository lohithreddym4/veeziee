import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userName: "",
    logs:[],
}

const logsSlice = createSlice({
    name: "logs",
    initialState,
    reducers: {
        setLogs: (state, action) => {
            state.logs=(action.payload)
        }
    }
})

const logsReducer = logsSlice.reducer;
export default logsReducer;