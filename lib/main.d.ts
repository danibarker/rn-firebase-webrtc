type CallButtons = () => JSX.Element;
type ToggleButtons = () => JSX.Element;
type VideoFeeds = () => JSX.Element;
type getLocalStream = () => Promise<MediaStream>;
type getLocalPCAndSetOffer = (
  db: firebase.firestore.Firestore,
  roomId: string,
  localStream: MediaStream,
  remoteStream: MediaStream,
  roomCollectionName: string,
  calleeCandidatesCollectionName: string,
  callerCandidatesCollectionName: string,
  setRemoteStream: React.Dispatch<React.SetStateAction<undefined>>
) => Promise<RTCPeerConnection>;
type getLocalPCAndGetOffer = (
  theRoomId: string,
  db: firebase.firestore.Firestore,
  localStream: MediaStream,
  remoteStream: MediaStream,
  roomCollectionName: string,
  calleeCandidatesCollectionName: string,
  callerCandidatesCollectionName: string,
  setRemoteStream: React.Dispatch<React.SetStateAction<undefined>>
) => Promise<RTCPeerConnection>;
