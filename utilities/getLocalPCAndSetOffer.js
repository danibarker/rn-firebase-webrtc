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
      return;
    }
    try {
      await addDoc(callerCandidatesCollection, e.candidate.toJSON());
    } catch (error) {
      console.error("error", error);
    }
  };
  localPC.onaddstream = (e) => {
    if (e.stream && remoteStream !== e.stream) {
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
      try {
        await localPC.setRemoteDescription(rtcSessionDescription);
      } catch (error) {
        console.error(error);
      }
    }
  });

  const calleeCollection = collection(
    db,
    `${roomCollectionName}/${roomId}/${calleeCandidatesCollectionName}`
  );
  onSnapshot(calleeCollection, async (snapshot) => {
    snapshot.docChanges().forEach(async (change) => {
      if (change.type === "added") {
        let data = change.doc.data();
        try {
          await localPC.addIceCandidate(new RTCIceCandidate(data));
        } catch (error) {
          console.error(error);
        }
      }
    });
  });
  return localPC;
};
