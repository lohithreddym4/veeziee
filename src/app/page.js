/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import React, { use, useEffect, useState } from 'react';
import NavBar from '@/components/Navbar';
import StoreProvider from './StoreProvider';
import {  useDispatch, useSelector } from 'react-redux';
import About from '@/components/About';
import { Logs } from '@/components/Logs';
import { ContactList } from '@/components/ContactList';
import VoiceCall from '@/components/VoiceCall';
import Peer from 'peerjs';
import {toast,Toaster} from 'react-hot-toast';
import Cookies from 'js-cookie';

const Home = () => {
    const dispatch=useDispatch();
    useEffect(()=>{
    const peer=new Peer(Cookies.get('user'))
    dispatch({
        type:"peer/setPeer",
        payload:peer
    })
    },[])
    const [voice, setVoiceCall] = useState(false);
    const [video, setVideoCall] = useState(false);
    const selected = useSelector(state => state.selected.selected);
    const voiceCall = useSelector(state => state.voiceCall.callToUser);
    useEffect(()=>{
        if(voiceCall!=null){
            setVoiceCall(true)
        }else{
            setVoiceCall(false)
        }
    },[voiceCall])
    useEffect(()=>{
        if(voiceCall!=null){
            setVideoCall(true)
        }else{
            setVideoCall(false)
        }
    },[voiceCall])

    return (
        <>
            <div className="contacts d-flex body">
                <NavBar />
                <ContactList />
                {selected ? <Logs /> : <About />}
                {voice && <VoiceCall/>}
            </div>
        </>

    )
}

function App() {
    return (
        <StoreProvider>
            <Home />
            <Toaster/>
        </StoreProvider>
    )
}
export default App;