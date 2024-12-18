"use client"
import { faPhone, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useContext, useEffect, useMemo, useRef, useState } from 'react'
import Ringing from './Ringing'
import Timer from './Timer'
import { useDispatch, useSelector } from 'react-redux'
// import Peer from 'peerjs'
// import Cookies from 'js-cookie'
import peerContext  from '../app/lib/features/peerContext'

const VoiceCall = () => {
    const dispatch = useDispatch();
    const voiceCall = useSelector(state => state.voiceCall)
    // const [peer,setPeer]=new useState(new Peer(Cookies.get('user')))
    // const peer=useSelector(state=>state.peer.peer)
    const peerData=useContext(peerContext);
    const peer=peerData.peer
    
    useEffect(() => {
        console.log(peer)
        const getUserMedia=navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        peer.on('open', (id) => {
            console.log('My peer ID is: ' + id);
        });
        peer.on('call', function(call) {
            console.log('Answering the call')
            getUserMedia({video: false, audio: true}, function(stream) {
              call.answer(stream);
              call.on('stream', function(remoteStream) {
                const audio=document.querySelector('audio');
                audio.srcObject=remoteStream;
                audio.play();
              });
            }, function(err) {
              console.log('Failed to get local stream' ,err);
            });
          });
          const call=(remote)=>{
            const getUserMedia=navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
            getUserMedia({video:false,audio:true},(stream)=>{
                const call= peer.call(voiceCall.callToUser,stream);
                console.log(call)
                if(call){
                    console.log("calling...")
                    call.on('stream',(remoteStream)=>{
                        const audio=document.querySelector('audio');
                        audio.srcObject=remoteStream;
                        audio.play();
                    },function(err) {
                        console.log('Failed to get local stream' ,err)
                        })
                }else{
                    console.log("calling error")
                }
            })
        }
        if(voiceCall.callToUser!==null){
            call(voiceCall.callToUser);
    }else{
        console.log(voiceCall.callToUser)
    }
    }

    , [])

    const endCall = () => {
        dispatch({type:'voiceCall/setCallTo',payload:{name:null,username:null}})
    }

    const [position, setPosition] = useState({x: window.innerWidth - 150, y: 10  });

    const handleDrop = (e) => {
        e.dataTransfer.clearData();
        setPosition({ x: e.clientX, y: e.clientY });
    }

    return (
        <div className='voice-call-body' 
             draggable={true} 
             onDrag={handleDrop} 
             onDragEnd={handleDrop}
             style={{ position: 'absolute', top: position.y, left: position.x }}
        >
            <div className="main">
                <audio ></audio>
                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
                <h3>{voiceCall.callToName}</h3>
                <Timer/>
                <p>{voiceCall.callToUser}</p>
                <Ringing/>
                <div className='voice-call-buttons'>
                    <button onClick={endCall} className='end-call-button'>
                        <FontAwesomeIcon icon={faPhone}></FontAwesomeIcon>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default VoiceCall;
