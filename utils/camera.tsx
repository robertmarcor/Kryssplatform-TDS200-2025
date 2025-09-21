import Feather from "@expo/vector-icons/Feather";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { useState } from "react";
import { Button, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface CameraProps {
  onClose?: () => void;
  onPhotoTaken?: (uri: string) => void;
}

export default function Camera({ onClose, onPhotoTaken }: CameraProps) {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [cameraRef, setCameraRef] = useState<CameraView | null>(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const photo = await cameraRef.takePictureAsync();
        onPhotoTaken?.(photo.uri);
        onClose?.();
      } catch (error) {
        console.log("Error taking picture:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={setCameraRef} />

      {/* Close button */}
      <Pressable style={styles.closeButton} onPress={onClose}>
        <Feather name="x" size={24} color="white" />
      </Pressable>

      {/* Camera controls */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing}>
          <Feather name="refresh-cw" size={24} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          <View style={styles.captureButtonInner} />
        </TouchableOpacity>

        <View style={styles.placeholder} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
    color: "white",
  },
  camera: {
    flex: 1,
  },
  closeButton: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 40,
  },
  flipButton: {
    backgroundColor: "rgba(0,0,0,0.5)",
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  captureButton: {
    backgroundColor: "white",
    borderRadius: 40,
    width: 80,
    height: 80,
    alignItems: "center",
    justifyContent: "center",
  },
  captureButtonInner: {
    backgroundColor: "white",
    borderRadius: 30,
    width: 60,
    height: 60,
    borderWidth: 3,
    borderColor: "#007AFF",
  },
  placeholder: {
    width: 50,
  },
});
