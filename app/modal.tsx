import { ThemedText } from "@/components/themed-text";
import { useThemeColor } from "@/hooks/use-theme-color";
import Camera from "@/utils/camera";
import { pickImage } from "@/utils/imagePicker";
import { appendLocalStorage } from "@/utils/localStorage";
import { scrollToInput } from "@/utils/scrollTo";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
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

export default function NewPostModal() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [tagsArray, setTagsArray] = useState<string[]>([]);
  const [image, setImage] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const tagsRef = useRef<TextInput>(null);
  const textColor = useThemeColor({}, "text");
  const backgroundColor = useThemeColor({}, "background");
  const iconColor = useThemeColor({}, "icon");

  const scrollViewRef = useRef<ScrollView>(null);

  const handlePublish = () => {
    const tagsArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);
    appendLocalStorage("posts", {
      title,
      body,
      tags: tagsArray,
      image,
      id: Date.now(),
    });
    router.back();
  };

  return (
    <>
      {showCamera && (
        <View style={styles.cameraOverlay}>
          <Camera
            onClose={() => setShowCamera(false)}
            onPhotoTaken={(uri) => {
              setImage(uri);
              setShowCamera(false);
            }}
          />
        </View>
      )}
      <KeyboardAvoidingView
        style={styles.container}
        behavior={"padding"}
        keyboardVerticalOffset={80}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          <View style={styles.formContainer}>
            {/* Title Field */}
            <View style={styles.fieldContainer}>
              <View style={styles.labelContainer}>
                <Feather name="type" size={16} color="#007AFF" />
                <Text style={[styles.label, { color: textColor }]}>Title</Text>
              </View>
              <TextInput
                onFocus={() => scrollToInput(scrollViewRef)}
                style={[
                  styles.input,
                  { color: textColor, backgroundColor: backgroundColor, borderColor: iconColor },
                ]}
                value={title}
                onChangeText={setTitle}
                placeholder="Enter an engaging title..."
                placeholderTextColor={iconColor}
              />
            </View>

            {/* Content Field */}
            <View style={styles.fieldContainer}>
              <View style={styles.labelContainer}>
                <Feather name="edit-3" size={16} color="#007AFF" />
                <Text style={[styles.label, { color: textColor }]}>Content</Text>
              </View>
              <TextInput
                style={[
                  styles.input,
                  styles.textArea,
                  { color: textColor, backgroundColor: backgroundColor, borderColor: iconColor },
                ]}
                value={body}
                onChangeText={setBody}
                placeholder="Tell your story..."
                placeholderTextColor={iconColor}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            {/* Tags Field */}
            <View style={styles.fieldContainer}>
              <View style={styles.labelContainer}>
                <Feather name="tag" size={16} color="#007AFF" />
                <Text style={[styles.label, { color: textColor }]}>Tags</Text>
              </View>
              <TextInput
                onFocus={() => scrollToInput(scrollViewRef)}
                style={[
                  styles.input,
                  { color: textColor, backgroundColor: backgroundColor, borderColor: iconColor },
                ]}
                value={tags}
                ref={tagsRef}
                onChangeText={setTags}
                placeholder="Type a tag and press Enter..."
                placeholderTextColor={iconColor}
                enablesReturnKeyAutomatically={true}
                onSubmitEditing={() => {
                  setTagsArray([...tagsArray, tags]);
                  tagsRef.current?.clear();
                }}
              />
              {tagsArray.map((tag, id) => (
                <ThemedText key={id} style={styles.label}>
                  #{tag}
                </ThemedText>
              ))}
            </View>

            {/* Image Field */}
            <View style={styles.fieldContainer}>
              <View style={styles.labelContainer}>
                <Feather name="image" size={16} color="#007AFF" />
                <Text style={[styles.label, { color: textColor }]}>Image</Text>
              </View>
              {image ? (
                <View>
                  <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
                  <Pressable style={styles.removeImageButton} onPress={() => setImage(null)}>
                    <Feather name="x" size={16} color="#fff" />
                  </Pressable>
                </View>
              ) : (
                <View style={styles.imageUploadContainer}>
                  <Pressable
                    style={styles.imageUploadButton}
                    onPress={() => pickImage(setImage)}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <Feather name="image" size={24} color="#007AFF" />
                    <Text style={styles.uploadText}>Gallery</Text>
                  </Pressable>
                  <Pressable
                    style={styles.imageUploadButton}
                    onPress={() => {
                      setShowCamera(true);
                    }}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <Feather name="camera" size={24} color="#007AFF" />
                    <Text style={styles.uploadText}>Camera</Text>
                  </Pressable>
                </View>
              )}
            </View>

            {/* Buttons */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.clearButton} onPress={() => router.back()}>
                <Text style={styles.clearButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
                <Text style={styles.publishButtonText}>Publish Post</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 8,
    textAlign: "center",
  },
  headerSubtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
    textAlign: "center",
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 40,
  },
  fieldContainer: {
    marginBottom: 24,
  },
  labelContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    fontSize: 12,
    color: "#007AFF",
    marginLeft: 8,
    marginTop: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#111827",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  textArea: {
    height: 120,
    paddingTop: 12,
  },
  image: {
    height: 200,
    borderRadius: 6,
  },
  imageUploadContainer: {
    flexDirection: "row",
    gap: 16,
  },
  imageUploadButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
    borderRadius: 12,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  removeImageButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#FF3B30",
    borderRadius: 12,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadText: {
    fontSize: 16,
    color: "#007AFF",
    fontWeight: "500",
    marginTop: 8,
  },
  uploadSubtext: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 16,
    marginTop: 32,
  },
  clearButton: {
    flex: 1,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#6B7280",
  },
  publishButton: {
    flex: 1,
    backgroundColor: "#007AFF",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: "#007AFF",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  publishButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  cameraOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1000,
    backgroundColor: "black",
  },
});
