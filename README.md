# React Native Firebase WebRTC Video Conferencing

Sorry it's not documented well yet, I'm working on it.

Parts of the code based on https://dipanshkhandelwal.medium.com/video-calling-using-firebase-and-webrtc-14cc2d4afceb

## Requirements

To use with Expo, needs expo's config-plugins, can be found here:

https://github.com/expo/config-plugins/tree/main/packages/react-native-webrtc

For firebase v9.9 and possibly some earlier versions:

Add a metro.config.js file to your project, with the following content:

```
const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push("cjs");

module.exports = defaultConfig;
```

## Usage

Component for the person receiving the call:

```js
import React, { useState } from "react";
import { Text, View } from "react-native";

import {
  CallButtons,
  getLocalPCandGetOffer,
  ToggleButtons,
  VideoFeeds,
  getLocalStream,
} from "rn-firebase-webrtc";

function ReceiverScreen({
  db, // instance of Firestore from initializeFirestore() or getFirestore()
}) {
  function onBackPress() {
    if (cachedLocalPC) {
      cachedLocalPC.removeStream(localStream);
      cachedLocalPC.close();
    }
    setLocalStream();
    setRemoteStream();
    setCachedLocalPC();
  }

  const [localStream, setLocalStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [cachedLocalPC, setCachedLocalPC] = useState();

  const startLocalStream = async () => {
    const newStream = await getLocalStream();
    setLocalStream(newStream);
  };

  const joinCall = async () => {
    // get the local peer connection
    const localPC = await getLocalPCandGetOffer(
      "myRoomId", // must match the roomId that the sender created
      db,
      localStream,
      remoteStream,
      "rooms", // collection name
      "calleeCandidates", // collection name
      "callerCandidates", // collection name
      setRemoteStream
    );

    setCachedLocalPC(localPC);
  };

  return (
    <>
      <VideoFeeds
        localStream={localStream}
        remoteStream={remoteStream}
        videoFeedsStyles={videoFeedsStyles}
      />
      <CallButtons
        onBackPress={onBackPress}
        localStream={localStream}
        startLocalStream={startLocalStream}
        joinCall={joinCall}
        remoteStream={remoteStream}
        callButtonsStyles={callButtonsStyles}
      />

      {localStream && (
        <ToggleButtons
          remoteStream={remoteStream}
          localStream={localStream}
          toggleButtonStyles={toggleButtonStyles}
        />
      )}

      <View style={styles.heading}>
        <Text style={styles.headingText}>Room : {roomId}</Text>
      </View>
    </>
  );
}
```

Component for the person sending the call:

```js
import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { Text, View } from "react-native";
import {
  CallButtons,
  getLocalPCAndSetOffer,
  ToggleButtons,
  VideoFeeds,
  getLocalStream,
} from "rn-firebase-webrtc";

export default function CallerScreen() {
  function onBackPress() {
    if (cachedLocalPC) {
      cachedLocalPC.removeStream(localStream);
      cachedLocalPC.close();
    }
    setLocalStream();
    setRemoteStream();
    setCachedLocalPC();
  }

  const [localStream, setLocalStream] = useState();
  const [remoteStream, setRemoteStream] = useState();
  const [cachedLocalPC, setCachedLocalPC] = useState();

  const startLocalStream = async () => {
    const newStream = await getLocalStream();
    setLocalStream(newStream);
  };

  const startCall = async () => {
    const localPC = await getLocalPCAndSetOffer(
      db,
      "myRoomId", // must match the roomId that the receiver enters
      localStream,
      remoteStream,
      "rooms",
      "calleeCandidates",
      "callerCandidates",
      setRemoteStream
    );

    setCachedLocalPC(localPC);
  };

  return (
    <>
      <VideoFeeds
        remoteStream={remoteStream}
        localStream={localStream}
        videoFeedsStyles={videoFeedsStyles}
      />
      <CallButtons
        onBackPress={onBackPress}
        localStream={localStream}
        startLocalStream={startLocalStream}
        joinCall={startCall}
        remoteStream={remoteStream}
        callButtonsStyles={callButtonsStyles}
      />

      {localStream && (
        <ToggleButtons
          remoteStream={remoteStream}
          localStream={localStream}
          toggleButtonStyles={toggleButtonStyles}
        />
      )}
    </>
  );
}
```

StyleSheets to create:

```js
const videoFeedStyles = StyleSheet.create({
  rtcContainer: {
    // styling for the video feeds outer container
  },
  rtcviewRemote: {
    // the remote video feed container
  },
  rtcviewLocal: {
    // the local video feed container
  },
  rtcRemote: {
    // the remote video feed
  },
  rtcLocal: {
    // the local video feed
  },
});

export const callButtonsStyles = StyleSheet.create({
  container: {
    // container for the buttons to start/join a call
  },
  buttons: {
    // styling for the buttons
  },
  buttonText: {
    // styling for the button texts
  },
});

export const toggleButtonStyles = StyleSheet.create({
  container: {
    // container for the toggle buttons
  },
  buttons: {
    // styling for the buttons
  },
  buttonText: {
    // styling for the button texts
  },
});
```
