import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider as NavigationThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";

import { ThemeProvider, useColorScheme } from "@/hooks/use-theme-context";

function RootLayoutContent() {
  const colorScheme = useColorScheme();
  return (
    <NavigationThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ title: "Home", headerShown: false }} />
        <Stack.Screen name="posts/[id]" options={{ headerShown: true }} />
        <Stack.Screen name="modal" options={{ presentation: "modal", title: "New Post" }} />
      </Stack>
    </NavigationThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutContent />
    </ThemeProvider>
  );
}
