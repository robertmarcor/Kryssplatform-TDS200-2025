import { Post } from "@/types/post";
import Feather from "@expo/vector-icons/Feather";
import { Image } from "expo-image";
import { router } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

type Props = {
  post: Post;
};

export default function Posts({ post }: Props) {
  const handlePress = () => {
    router.push({
      pathname: "/posts/[id]",
      params: { id: String(post.id) },
    });
  };

  return (
    <ThemedView style={styles.postContainer}>
      <View style={styles.imageContainer}>
        <Image source={post.image} style={styles.postImage} />
      </View>

      <View style={styles.postContent}>
        <ThemedText style={styles.postTitle} numberOfLines={1}>
          {post.title}
        </ThemedText>

        <ThemedText style={styles.postBody} numberOfLines={2}>
          {post.body}
        </ThemedText>

        <View style={styles.postTagsContainer}>
          {post.tags.slice(0, 3).map((tag, id) => (
            <View key={id} style={styles.tagChip}>
              <Text style={styles.tagText}>#{tag}</Text>
            </View>
          ))}
          {post.tags.length > 3 && (
            <View style={styles.tagChip}>
              <Text style={styles.tagText}>+{post.tags.length - 3}</Text>
            </View>
          )}
        </View>

        <Pressable
          style={styles.readMoreContainer}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          onPress={handlePress}>
          <Text style={styles.readMoreText}>Read More</Text>
          <Feather name="chevron-right" size={16} color="#007AFF" />
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  postContainer: {
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  imageContainer: {
    marginRight: 16,
  },
  postImage: {
    width: 120,
    height: 120,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#007AFF",
  },
  postContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  postTitle: {
    fontSize: 18,
    fontWeight: "bold",
    lineHeight: 24,
    marginBottom: 6,
  },
  postBody: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    marginBottom: 12,
  },
  postTagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 12,
    gap: 6,
  },
  tagChip: {
    backgroundColor: "#F3E8FF",
    paddingHorizontal: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E9D5FF",
  },
  tagText: {
    fontSize: 11,
    fontWeight: "600",
    color: "#007AFF",
  },
  readMoreContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  readMoreText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#007AFF",
    marginRight: 4,
  },
});
