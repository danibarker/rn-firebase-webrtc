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
