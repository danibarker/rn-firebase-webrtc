import { CallButtons } from "./screens/CallButtons";
import { getLocalPCandGetOffer } from "./utilities/getLocalPCandGetOffer.js";
import { getLocalPCAndSetOffer } from "./utilities/getLocalPCAndSetOffer";
import { ToggleButtons } from "./screens/ToggleButtons";
import { VideoFeeds } from "./screens/VideoFeeds";
import { getLocalStream } from "./utilities/getLocalStream";

// export all imports
export {
  CallButtons,
  /**
   * Get local peer connection and get offer from firestore.
   * Creates an answer and sets it in the room collection.
   * Sets up listeners for the caller candidate collection
   * @param {string} theRoomId
   * @param {Firestore} db
   * @param {MediaStream} localStream
   * @param {MediaStream} remoteStream
   * @param {string} roomCollectionName
   * @param {string} calleeCandidatesCollectionName
   * @param {string} callerCandidatesCollectionName
   * @param {React.Dispatch<React.SetStateAction<undefined>>} setRemoteStream
   * @returns {Promise<RTCPeerConnection>}
   */
  getLocalPCandGetOffer,
  getLocalPCAndSetOffer,
  ToggleButtons,
  VideoFeeds,
  getLocalStream,
};
