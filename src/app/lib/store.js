import { configureStore } from '@reduxjs/toolkit'
import contactsReducer from './features/contactsSlice'
import logsReducer from './features/logsSlice'
import selectedReducer from './features/selectedSlice';
import voiceCallReducer from './features/voiceCallSlice';
import peerReducer from './features/peerSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      contacts: contactsReducer,
      logs: logsReducer,
      selected: selectedReducer,
      voiceCall: voiceCallReducer,
      peer: peerReducer,
    },
    middleware: getDefaultMiddleware=>getDefaultMiddleware({serializableCheck:false})
  });
};