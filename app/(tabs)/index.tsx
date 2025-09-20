import Posts from "@/components/Posts";
import { ThemedText } from "@/components/themed-text";
import { Post } from "@/types/post";
import { writeLocalStorage } from "@/utils/localStorage";
import { router, Stack } from "expo-router";
import React, { useEffect } from "react";
import { FlatList, Pressable, View } from "react-native";

const dummyPosts: Post[] = [
  {
    id: 1,
    title: "Gay Retard Missing",
    body: "I could pee on this if i had the energy loved it, hated it, loved it, hated it scratch leg; meow for can opener to feed me.",
    tags: ["react-native", "expo", "dummy", "cat", "pet", "pee", "hehe"],
    image: { uri: "https://placecats.com/400/300" },
  },
  {
    id: 2,
    title: "The Future of Mobile Development",
    body: "Exploring the latest trends in mobile app development, including cross-platform frameworks, AI integration, and the rise of progressive web apps. What does the future hold for mobile developers?",
    tags: ["mobile", "technology", "future", "ai", "pwa"],
    image: { uri: "https://picsum.photos/400/300?random=2" },
  },
  {
    id: 3,
    title: "Mastering TypeScript for Better Code",
    body: "TypeScript has revolutionized JavaScript development by adding static typing. Discover how to leverage TypeScript's powerful features to write more maintainable and bug-free code.",
    tags: ["typescript", "javascript", "programming", "web-dev"],
    image: { uri: "https://picsum.photos/400/300?random=3" },
  },
  {
    id: 4,
    title: "UI/UX Design Principles That Matter",
    body: "Great design isn't just about looking good - it's about creating intuitive user experiences. Learn the fundamental principles that separate good design from great design.",
    tags: ["design", "ui", "ux", "user-experience", "principles"],
    image: { uri: "https://picsum.photos/400/300?random=4" },
  },
  {
    id: 5,
    title: "Getting Started with Expo Router",
    body: "Expo Router brings file-based routing to React Native. Learn how to set up navigation, handle dynamic routes, and create seamless user flows in your mobile apps.",
    tags: ["expo", "routing", "navigation", "react-native"],
    image: { uri: "https://picsum.photos/400/300?random=5" },
  },
  {
    id: 6,
    title: "State Management in Modern Apps",
    body: "From Redux to Zustand, explore different state management solutions and learn when to use each approach. We'll also cover React's built-in state management capabilities.",
    tags: ["state-management", "redux", "zustand", "react", "architecture"],
    image: { uri: "https://picsum.photos/400/300?random=6" },
  },
  {
    id: 7,
    title: "Performance Optimization Tips",
    body: "Make your React Native apps lightning fast with these proven optimization techniques. Learn about memo, useMemo, useCallback, and other performance best practices.",
    tags: ["performance", "optimization", "react-native", "best-practices"],
    image: { uri: "https://picsum.photos/400/300?random=7" },
  },
  {
    id: 8,
    title: "Dark Mode Implementation Guide",
    body: "Users love dark mode! Learn how to implement a beautiful dark theme in your React Native app with proper color schemes and smooth transitions.",
    tags: ["dark-mode", "theming", "ui", "user-preference"],
    image: { uri: "https://picsum.photos/400/300?random=8" },
  },
];

export default function Index() {
  useEffect(() => {
    // Save all dummy posts to localStorage on component mount
    const savePosts = async () => {
      try {
        await writeLocalStorage("allPosts", dummyPosts);
        console.log("Dummy posts saved to localStorage");
      } catch (error) {
        console.error("Failed to save posts:", error);
      }
    };

    savePosts();
  }, []);

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <Pressable
              style={{ paddingRight: 10 }}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              onPress={() => {
                router.push("/modal");
              }}>
              <ThemedText style={{ color: "#007AFF", fontWeight: "bold" }}>New +</ThemedText>
            </Pressable>
          ),
        }}
      />
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingVertical: 16 }}
        data={dummyPosts}
        renderItem={({ item }) => <Posts post={item} />}
        keyExtractor={(item) => item.id.toString()}
        ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
}
