import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import Peer from "peerjs";

const initialState = {
    peer: new Peer(Cookies.get('user')),
}

const peerSlice = createSlice({
    name: "peer",
    initialState,
    reducers: {
        setPeer: (state, action) => {
            state.peer = action.payload;
        }
    }
})
const peerReducer = peerSlice.reducer;
export default peerReducer;