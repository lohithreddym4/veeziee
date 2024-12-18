"use client"
import React, { useContext, useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faPhone } from '@fortawesome/free-solid-svg-icons'
import { faVideo } from '@fortawesome/free-solid-svg-icons'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import peerContext from '@/app/lib/features/peerContext';
import Peer from 'peerjs';
import Cookies from 'js-cookie';

export const Logs = () => {
    const dispatch = useDispatch();
    const currentDate = new Date();
    const logs = useSelector(state => state.logs.logs);
    const selected = useSelector(state => state.selected.selected)
    useContext(peerContext).peer=new Peer(Cookies.get('user'));

    function deSelect() {
        dispatch({ type: "selected/setSelected", payload: null });
    }
    const connectVoice = () => {
        dispatch({ type: "voiceCall/setCallTo", payload: { username: selected?.username, name: selected?.name } })
    }
    const connectVideo = () => {
    }
    useEffect(() => {
        dispatch({
            type: "logs/setLogs", payload: {
                name: selected?.name,
                username: selected?.username,
                lastseen: "12:00 PM, 01/12/2021 ",
                logs: selected?.logs
            }
        });
    }, [dispatch, selected])
    return (
        <div className="logs">
            <audio></audio>
            <div className="contact-card">
                <span className='d-flex'>
                    <button onClick={deSelect}>
                        <FontAwesomeIcon icon={faAngleLeft}></FontAwesomeIcon>
                    </button>
                    &nbsp;
                    <h4 className='name contact-name  d-flex flex-column'>
                        {logs.name}
                        <span className='last-seen'>
                            last seen {logs.lastseen}
                        </span>
                    </h4>
                </span>
                <span className='user-name'>
                    {logs.username}
                </span>
                <span>
                    <button onClick={connectVoice} className='voice-call-button'>
                        <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
                    </button>
                    <button onClick={connectVideo} className='video-call-button mx-4'>
                        <FontAwesomeIcon icon={faVideo}></FontAwesomeIcon>
                    </button>
                </span>
            </div>
            <div className="history">
                {logs?.logs?.map((log, index) => {
                    return (
                        <>
                            {
                                log.date ? <div key={index} className='date text-light text-center'>{
                                    currentDate - new Date(parseInt(log.date.split('/')[2]), parseInt(log.date.split('/')[0]) - 1, parseInt(log.date.split('/')[1])) < 86400000 ? "Today" : log.date
                                }</div> :
                                    <div key={index} className={`log ${log.caller || "missed"}`}>
                                        <div className="box">
                                            <span className="call-type">
                                                {log.type === "video" ? <FontAwesomeIcon icon={faVideo}></FontAwesomeIcon> : <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>}
                                                {log.duration === "missed" && <FontAwesomeIcon icon={faX} className='missed mx-2'></FontAwesomeIcon>}
                                            </span>
                                            <span className="log-time">{log.time}</span>
                                            <span className="log-message">{log.duration}</span>
                                        </div>
                                    </div>
                            }
                        </>
                    )
                })
                }
            </div>
        </div>
    )
}
