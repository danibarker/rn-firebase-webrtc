Only works with firebase V9 and higher, works with Expo v45

Sorry it's not documented well yet, I'm working on it.

## Requirements

Needs expo's config-plugins, can be found here:

https://github.com/expo/config-plugins/tree/main/packages/react-native-webrtc

For firebase v9.9 and possibly other versions:

Add a metro.config.js file to your project, with the following content:

```
const { getDefaultConfig } = require("@expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);

defaultConfig.resolver.assetExts.push("cjs");

module.exports = defaultConfig;
```
