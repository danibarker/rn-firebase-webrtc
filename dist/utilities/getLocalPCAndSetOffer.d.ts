/**
 * Get the local peer connection and creates an offer inside the
 * room collection.  Sets up listeners for the callee candidate collection
 * @param {Firestore} db
 * @param {string} roomId
 * @param {MediaStream} localStream
 * @param {MediaStream} remoteStream
 * @param {string} roomCollectionName
 * @param {string} calleeCandidatesCollectionName
 * @param {string} callerCandidatesCollectionName
 * @param {React.Dispatch<React.SetStateAction<undefined>>} setRemoteStream
 * @returns {Promise<RTCPeerConnection>}
 */
export function getLocalPCAndSetOffer(
  db: Firestore,
  roomId: string,
  localStream: MediaStream,
  remoteStream: MediaStream,
  roomCollectionName: string,
  calleeCandidatesCollectionName: string,
  callerCandidatesCollectionName: string,
  setRemoteStream: React.Dispatch<React.SetStateAction<undefined>>
): Promise<RTCPeerConnection>;
import { RTCPeerConnection } from "react-native-webrtc";
//# sourceMappingURL=getLocalPCAndSetOffer.d.ts.map
