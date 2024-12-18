import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    callToUser: null,
    callToName: null,
}

const voiceCallSlice = createSlice({
    name: "voiceCall",
    initialState,
    reducers: {
        setCallTo: (state, action) => {
            state.callToName = action.payload.name;
            state.callToUser = action.payload.username;
        },
    },
});

const voiceCallReducer=voiceCallSlice.reducer;
export default voiceCallReducer;