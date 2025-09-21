import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Post } from "@/types/post";
import { readLocalStorage } from "@/utils/localStorage";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, StyleSheet, View } from "react-native";

export default function PostView() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPost = async () => {
      try {
        // Get all posts from localStorage
        const posts = await readLocalStorage<Post[]>("posts");
        const dummyPosts = await readLocalStorage<Post[]>("allPosts");
        const allPosts = [...(posts || []), ...(dummyPosts || [])];

        if (allPosts && id) {
          // Find the specific post by ID
          const foundPost = allPosts?.find((post) => post.id === parseInt(id));
          setPost(foundPost || null);
        } else {
          setPost(null);
        }
      } catch (error) {
        console.error("Failed to load post:", error);
        setPost(null);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [id]);

  if (loading) {
    return (
      <ThemedView style={styles.container}>
        <Stack.Screen
          options={{
            headerTitle: (props) => <ThemedText>Loading...</ThemedText>,
          }}
        />
        <ThemedText>Loading post...</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <ThemedText numberOfLines={1}>{post?.title || "Post Details"}</ThemedText>
          ),
        }}
      />

      {post ? (
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          <Image source={{ uri: post.image || "" }} style={styles.postImage} />

          <View style={styles.contentContainer}>
            <ThemedText style={styles.title}>{post?.title}</ThemedText>

            <View style={styles.tagsContainer}>
              {post.tags.map((tag, index) => (
                <View key={index} style={styles.tagChip}>
                  <ThemedText style={styles.tagText}>#{tag}</ThemedText>
                </View>
              ))}
            </View>

            <ThemedText style={styles.body}>{post.body}</ThemedText>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.notFoundContainer}>
          <ThemedText style={styles.notFoundText}>Post not found</ThemedText>
          <ThemedText style={styles.notFoundSubtext}>
            The post with ID {`"${id}"`} doesn&apos;t exist.
          </ThemedText>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  postImage: {
    height: 250,
    resizeMode: "cover",
  },
  contentContainer: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    lineHeight: 34,
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 20,
    gap: 8,
  },
  tagChip: {
    backgroundColor: "#F3E8FF",
    paddingHorizontal: 4,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E9D5FF",
  },
  tagText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#007AFF",
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "left",
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  notFoundText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  notFoundSubtext: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
  },
});
