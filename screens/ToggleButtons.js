import React, { useState } from "react";
import { View, Pressable, Text } from "react-native";

export const ToggleButtons = ({
  remoteStream,
  localStream,
  toggleButtonStyles,
}) => {
  const switchCamera = () => {
    localStream.getVideoTracks().forEach((track) => track._switchCamera());
  };
  const [isMuted, setIsMuted] = useState(false);
  const toggleMute = () => {
    if (!remoteStream) {
      return;
    }
    localStream.getAudioTracks().forEach((track) => {
      track.enabled = !track.enabled;
      setIsMuted(!track.enabled);
    });
  };
  return (
    <View style={toggleButtonStyles.container}>
      <Pressable
        style={toggleButtonStyles.buttons}
        title="Switch camera"
        onPress={switchCamera}
      >
        <Text style={toggleButtonStyles.buttonText}>Switch camera</Text>
      </Pressable>
      <Pressable
        style={toggleButtonStyles.buttons}
        onPress={toggleMute}
        disabled={!remoteStream}
      >
        <Text style={toggleButtonStyles.buttonText}>
          {isMuted ? "Unmute" : "Mute"} stream
        </Text>
      </Pressable>
    </View>
  );
};
