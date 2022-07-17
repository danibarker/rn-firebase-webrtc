import React from "react";
import { StyleSheet, Button, View, Pressable, Text } from "react-native";

export function CallButtons({
  onBackPress,
  localStream,
  startLocalStream,
  joinCall,
  remoteStream,
  callButtonsStyles,
}) {
  return (
    <View style={callButtonsStyles.container}>
      <Pressable style={callButtonsStyles.buttons} onPress={onBackPress}>
        <Text style={callButtonsStyles.buttonText}>Click to stop call</Text>
      </Pressable>
      <>
        {!localStream && (
          <Pressable
            style={callButtonsStyles.buttons}
            onPress={startLocalStream}
          >
            <Text style={callButtonsStyles.buttonText}>Start stream</Text>
          </Pressable>
        )}
        {localStream && !remoteStream && (
          <Pressable
            style={callButtonsStyles.buttons}
            onPress={() => joinCall()}
            disabled={!!remoteStream}
          >
            <Text style={callButtonsStyles.buttonText}>Join call</Text>
          </Pressable>
        )}
      </>
    </View>
  );
}
