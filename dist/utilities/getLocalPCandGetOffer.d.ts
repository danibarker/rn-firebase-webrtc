/**
 * Get local peer connection and get offer from firestore.
 * Creates an answer and sets it in the room collection.
 * Sets up listeners for the caller candidate collection
 * @param {Firestore} db
 * @param {string} theRoomId
 * @param {MediaStream} localStream
 * @param {MediaStream} remoteStream
 * @param {string} roomCollectionName
 * @param {string} calleeCandidatesCollectionName
 * @param {string} callerCandidatesCollectionName
 * @param {React.Dispatch<React.SetStateAction<undefined>>} setRemoteStream
 * @returns {Promise<RTCPeerConnection>}
 */
export function getLocalPCandGetOffer(
  db: Firestore,
  theRoomId: string,
  localStream: MediaStream,
  remoteStream: MediaStream,
  roomCollectionName: string,
  calleeCandidatesCollectionName: string,
  callerCandidatesCollectionName: string,
  setRemoteStream: React.Dispatch<React.SetStateAction<undefined>>
): Promise<RTCPeerConnection>;
import { RTCPeerConnection } from "react-native-webrtc";
//# sourceMappingURL=getLocalPCandGetOffer.d.ts.map
