import { mediaDevices } from "react-native-webrtc";
/**
 * Gets the local stream from the user's device
 * @returns {Promise<MediaStream>}
 */
export const getLocalStream = async () => {
  const isFront = true;
  const devices = await mediaDevices.enumerateDevices();

  const facing = isFront ? "front" : "environment";
  const videoSourceId = devices.find(
    (device) => device.kind === "videoinput" && device.facing === facing
  );
  const facingMode = isFront ? "user" : "environment";
  const constraints = {
    audio: true,
    video: {
      mandatory: {
        minWidth: 500,
        minHeight: 300,
        minFrameRate: 30,
      },
      facingMode,
      optional: videoSourceId ? [{ sourceId: videoSourceId }] : [],
    },
  };
  try {
    const newStream = await mediaDevices.getUserMedia(constraints);
    return newStream;
  } catch (error) {
    console.error("error", error);
  }
};
