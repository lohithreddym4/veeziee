import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    contacts: [],
}

const contactsSlice=createSlice({
    name: "contacts",
    initialState,
    reducers: {
        setContacts: (state, action) => {
            state.contacts=action.payload
        }
    }
})
const contactsReducer = contactsSlice.reducer;
export default contactsReducer;