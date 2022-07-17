import {
  collection,
  doc,
  onSnapshot,
  setDoc,
  addDoc,
} from "firebase/firestore";
import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
} from "react-native-webrtc";
const configuration = {
  iceServers: [
    {
      urls: ["stun:stun1.l.google.com:19302", "stun:stun2.l.google.com:19302"],
    },
  ],
  iceCandidatePoolSize: 10,
};
export const getLocalPCAndSetOffer = async (
  db,
  roomId,
  localStream,
  remoteStream,
  roomCollectionName,
  calleeCandidatesCollectionName,
  callerCandidatesCollectionName,
  setRemoteStream
) => {
  console.log("startCall id", roomId);
  const collectionRef = collection(db, roomCollectionName);
  const roomRef = doc(collectionRef, roomId);
  await setDoc(roomRef, { init: true });
  const localPC = new RTCPeerConnection(configuration);
  localPC.addStream(localStream);
  const callerCandidatesCollection = collection(
    db,
    `${roomCollectionName}/${roomId}/${callerCandidatesCollectionName}`
  );
  localPC.onicecandidate = async (e) => {
    if (!e.candidate) {
      console.log("Start Call Got final candidate!");
      return;
    }
    console.log("Start Call Got candidate!");
    await addDoc(callerCandidatesCollection, e.candidate.toJSON());
  };
  localPC.onaddstream = (e) => {
    if (e.stream && remoteStream !== e.stream) {
      console.log(
        "Caller RemotePC received the stream call #tracks",
        e.stream._tracks.length
      );
      setRemoteStream(e.stream);
    }
  };

  const offer = await localPC.createOffer();
  await localPC.setLocalDescription(offer);
  const roomWithOffer = { offer };
  await setDoc(roomRef, roomWithOffer);

  onSnapshot(roomRef, async (snapshot) => {
    const data = snapshot.data();
    if (!localPC.currentRemoteDescription && data.answer) {
      const rtcSessionDescription = new RTCSessionDescription(data.answer);
      await localPC.setRemoteDescription(rtcSessionDescription);
    }
  });

  const calleeCollection = collection(
    db,
    `${roomCollectionName}/${roomId}/${calleeCandidatesCollectionName}`
  );
  onSnapshot(calleeCollection, async (snapshot) => {
    snapshot.docChanges().forEach(async (change) => {
      console.log("calleeCandidatesCollection change", change.type);
      if (change.type === "added") {
        let data = change.doc.data();
        await localPC.addIceCandidate(new RTCIceCandidate(data));
      }
    });
  });
  return localPC;
};
