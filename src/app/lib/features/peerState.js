import Peer from "peerjs";
import peerContext from "./peerContext";
import Cookies from "js-cookie";
const PeerState = (props) => {
    const peer=new Peer(Cookies.get('user'));
  return (
    <peerContext.Provider value={{peer}}>
      {props.children}
    </peerContext.Provider>
  )
}
export default PeerState;