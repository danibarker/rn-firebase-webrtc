/**
 * Pass in the following props:
 * onBackPress: Function to call when the back button is pressed
 * localStream: The local stream to display
 * remoteStream: The remote stream to display
 * joinCall: Function to call when the join call button is pressed
 * startLocalStream: Function to call when the start local stream button is pressed
 * callButtonStyles: The styles for the call buttons
 */
export function CallButtons({
  onBackPress,
  localStream,
  startLocalStream,
  joinCall,
  remoteStream,
  callButtonsStyles,
}: {
  onBackPress: any;
  localStream: MediaStream;
  startLocalStream: () => Promise<void>;
  joinCall: () => Promise<void>;
  remoteStream: MediaStream;
  callButtonsStyles: any;
}): any;
//# sourceMappingURL=CallButtons.d.ts.map
