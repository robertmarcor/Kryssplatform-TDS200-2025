import Feather from "@expo/vector-icons/Feather";
import { Tabs } from "expo-router";
import React from "react";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { height: 80 },
        tabBarActiveTintColor: "#007AFF",
        headerShown: true,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Feed",
          headerShown: true,
          tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profilePage"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ color }) => <Feather name="user" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
          tabBarIcon: ({ color }) => <Feather name="settings" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
