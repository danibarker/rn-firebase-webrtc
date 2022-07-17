import { mediaDevices } from "react-native-webrtc";

export const getLocalStream = async (role) => {
  // isFront will determine if the initial camera should face user or environment
  console.log(`${role} is getLocalStream`);
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
  const newStream = await mediaDevices.getUserMedia(constraints);
  return newStream;
};
