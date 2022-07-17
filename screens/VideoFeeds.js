import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { RTCView } from "react-native-webrtc";

export function VideoFeeds({
  remoteStream,
  localStream,
  videoFeedsStyles,
  caller,
}) {
  return (
    <View style={videoFeedsStyles.rtcContainer}>
      <View style={videoFeedsStyles.rtcviewRemote}>
        {remoteStream && (
          <RTCView
            style={videoFeedsStyles.rtcRemote}
            streamURL={remoteStream && remoteStream.toURL()}
          />
        )}
      </View>
      <View style={videoFeedsStyles.rtcviewLocal}>
        {localStream && (
          <RTCView
            style={videoFeedsStyles.rtcLocal}
            streamURL={localStream && localStream.toURL()}
          />
        )}
      </View>
    </View>
  );
}
