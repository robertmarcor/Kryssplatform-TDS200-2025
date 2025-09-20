import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Profile } from "@/types/profile";
import { pickImage } from "@/utils/imagePicker";
import { readLocalStorage, writeLocalStorage } from "@/utils/localStorage";
import Feather from "@expo/vector-icons/Feather";
import React, { useEffect, useRef, useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ProfilePage() {
  const [name, setName] = useState("Alex");
  const [gender, setGender] = useState("Non-binary");
  const [bio, setBio] = useState(
    "Tenderloin biltong turducken meatloaf tongue, landjaeger alcatra. Cow burgdoggen strip steak tail biltong drumstick jowl porchetta."
  );
  const [picture, setPicture] = useState<string | null>(null);

  // Theme colors
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");
  const iconColor = useThemeColor({}, "icon");

  const nameRef = useRef<TextInput>(null);
  const genderRef = useRef<TextInput>(null);
  const bioRef = useRef<TextInput>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const [editProfile, setEditProfile] = useState(false);

  const PROFILE_KEY = "profile";

  const saveProfile = () => {
    const profile = { name, gender, bio, picture };
    writeLocalStorage(PROFILE_KEY, profile);
  };

  const loadProfile = async () => {
    const profile = await readLocalStorage<Profile>(PROFILE_KEY);
    if (profile) {
      setName(profile.name);
      setGender(profile.gender);
      setBio(profile.bio);
      setPicture(profile.picture);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const scrollToInput = () => {
    scrollViewRef.current?.scrollTo({ y: 300, animated: true });
  };

  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <ScrollView ref={scrollViewRef} contentContainerStyle={{ flexGrow: 1 }}>
        <KeyboardAvoidingView behavior={"padding"} keyboardVerticalOffset={80}>
          <ThemedView style={styles.container}>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: picture || "https://i.pravatar.cc/300/200" }}
                style={styles.img}
              />
              <Pressable
                style={styles.imageUpload}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                onPress={() => {
                  pickImage((image) => {
                    setPicture(image);
                    saveProfile();
                  });
                }}>
                <Feather name="upload" size={24} color="#fff" />
              </Pressable>
            </View>
            <View style={styles.content}>
              <View>
                <ThemedText type="title">Name</ThemedText>
                {editProfile ? (
                  <TextInput
                    ref={nameRef}
                    value={name}
                    onChangeText={setName}
                    onFocus={scrollToInput}
                    style={[
                      styles.input,
                      {
                        color: textColor,
                        backgroundColor: backgroundColor,
                        borderColor: iconColor,
                      },
                    ]}
                    placeholder="Enter your name"
                    placeholderTextColor={iconColor}
                  />
                ) : (
                  <ThemedText>{name}</ThemedText>
                )}
              </View>
              <View>
                <ThemedText type="title">Gender</ThemedText>
                {editProfile ? (
                  <TextInput
                    ref={genderRef}
                    value={gender}
                    onChangeText={setGender}
                    onFocus={scrollToInput}
                    style={[
                      styles.input,
                      {
                        color: textColor,
                        backgroundColor: backgroundColor,
                        borderColor: iconColor,
                      },
                    ]}
                    placeholder="Enter your gender"
                    placeholderTextColor={iconColor}
                  />
                ) : (
                  <ThemedText>{gender}</ThemedText>
                )}
              </View>
              <View>
                <ThemedText type="title">Bio</ThemedText>
                {editProfile ? (
                  <TextInput
                    ref={bioRef}
                    value={bio}
                    onChangeText={setBio}
                    onFocus={scrollToInput}
                    style={[
                      styles.input,
                      {
                        color: textColor,
                        backgroundColor: backgroundColor,
                        borderColor: iconColor,
                      },
                    ]}
                    multiline={true}
                    numberOfLines={3}
                    textAlignVertical="top"
                  />
                ) : (
                  <ThemedText>{bio}</ThemedText>
                )}
              </View>
            </View>
            <View style={styles.buttonContainer}>
              {!editProfile ? (
                <TouchableOpacity
                  style={styles.primaryButton}
                  activeOpacity={0.8}
                  onPress={() => {
                    setEditProfile(true);
                  }}>
                  <Text style={styles.primaryButtonText}>Edit Profile</Text>
                </TouchableOpacity>
              ) : (
                <>
                  <TouchableOpacity
                    style={styles.primaryButton}
                    activeOpacity={0.8}
                    onPress={() => {
                      setEditProfile(false);
                      saveProfile();
                    }}>
                    <Text style={styles.primaryButtonText}>Save Profile</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryButton}
                    activeOpacity={0.8}
                    onPress={() => setEditProfile(false)}>
                    <Text style={styles.secondaryButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>
          </ThemedView>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
    marginHorizontal: 16,
    borderRadius: 16,
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 20,
    marginHorizontal: 20,
  },
  img: {
    width: 300,
    height: 300,
    borderRadius: 999,
  },
  imageUpload: {
    position: "absolute",
    bottom: 0,
    right: 60,
    backgroundColor: "#007AFF",
    borderRadius: 999,
    padding: 10,
  },
  imageUploadIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  content: {
    marginHorizontal: 20,
    gap: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  buttonContainer: {
    marginHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  // Primary Button - Main actions
  primaryButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48, // Minimum touch target
    shadowColor: "#007AFF",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  // Secondary Button - Secondary actions
  secondaryButton: {
    backgroundColor: "transparent",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
    borderWidth: 1.5,
    borderColor: "#007AFF",
  },
  secondaryButtonText: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.5,
  },
});
