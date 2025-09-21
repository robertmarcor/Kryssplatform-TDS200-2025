import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeContext } from "@/hooks/use-theme-context";
import { removeLocalStorage } from "@/utils/localStorage";
import React, { useState } from "react";
import { Alert, StyleSheet, Switch, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Settings() {
  const [notification, setNotification] = useState(false);
  const { colorScheme, toggleTheme } = useThemeContext();
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <ThemedText style={styles.title}>Settings</ThemedText>
      <ThemedView style={styles.container}>
        <View style={styles.rows}>
          <View style={styles.row}>
            <ThemedText>Notification</ThemedText>
            <Switch
              value={notification}
              onValueChange={setNotification}
              trackColor={{ true: "#007AFF" }}
              ios_backgroundColor={"#c7c7cc"}
            />
          </View>
          <View style={styles.row}>
            <ThemedText>Theme</ThemedText>
            <Switch
              value={colorScheme === "dark"}
              onValueChange={toggleTheme}
              trackColor={{ true: "#007AFF" }}
              ios_backgroundColor={"#c7c7cc"}
            />
          </View>
        </View>
      </ThemedView>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => {
            removeLocalStorage("profile");
            Alert.alert("Profile Cleared", "Profile has been cleared");
          }}>
          <ThemedText style={styles.buttonText}>Clear Profile</ThemedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => {
            removeLocalStorage("posts");
            Alert.alert("Posts Cleared", "Posts have been cleared");
          }}>
          <ThemedText style={styles.buttonText}>Clear Posts</ThemedText>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 20,
    borderRadius: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 16,
    padding: 16,
  },
  rows: {
    gap: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonContainer: {
    marginTop: "auto",
    marginVertical: 16,
    marginHorizontal: 16,
    padding: 8,
    borderRadius: 16,
    gap: 12,
  },
  button: {
    backgroundColor: "red",
    padding: 12,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#FFF",
  },
});
