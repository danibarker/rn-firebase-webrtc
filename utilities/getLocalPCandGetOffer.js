import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
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
export const getLocalPCandGetOffer = async (
  theRoomId,
  db,
  localStream,
  remoteStream,
  roomCollectionName,
  calleeCandidatesCollectionName,
  callerCandidatesCollectionName,
  setRemoteStream
) => {
  const roomRef = doc(collection(db, roomCollectionName), theRoomId);

  const roomSnapshot = await getDoc(roomRef);

  if (!roomSnapshot.exists()) return;
  const localPC = new RTCPeerConnection(configuration);

  localPC.addStream(localStream);
  const calleeCandidatesCollection = collection(
    db,
    `${roomCollectionName}/${theRoomId}/${calleeCandidatesCollectionName}`
  );
  localPC.onicecandidate = async (e) => {
    if (!e.candidate) {
      console.log("Join Call Got final candidate!");
      return;
    }
    await addDoc(calleeCandidatesCollection, e.candidate.toJSON());
    // calleeCandidatesCollection.add(e.candidate.toJSON());
  };
  localPC.onaddstream = (e) => {
    if (e.stream && remoteStream !== e.stream) {
      console.log(
        "Callee RemotePC received the stream join # of tracks:",
        e.stream._tracks.length
      );
      setRemoteStream(e.stream);
    }
  };
  const offer = roomSnapshot.data().offer;
  await localPC.setRemoteDescription(new RTCSessionDescription(offer));

  const answer = await localPC.createAnswer();
  await localPC.setLocalDescription(answer);

  const roomWithAnswer = { answer };
  await updateDoc(roomRef, roomWithAnswer);
  const callerCollection = collection(
    db,
    `${roomCollectionName}/${theRoomId}/${callerCandidatesCollectionName}`
  );

  onSnapshot(callerCollection, (snapshot) => {
    snapshot.docChanges().forEach(async (change) => {
      if (change.type === "added") {
        let data = change.doc.data();
        await localPC.addIceCandidate(new RTCIceCandidate(data));
      }
    });
  });
  return localPC;
};
