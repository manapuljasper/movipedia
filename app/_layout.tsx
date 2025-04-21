import { ContextCombiner } from "@/src/shared/ContextCombiner/ContextCombiner";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ContextCombiner>
        <Stack>
          {/* Movie list screen */}
          <Stack.Screen name="index" options={{ title: "Movies" }} />
          {/* Movie detail screen */}
          <Stack.Screen
            name="movies/[id]"
            options={{ title: "Movie Details" }}
          />

          {/* Movie trailer */}
          <Stack.Screen
            name="movies/[id]/trailers"
            options={{ title: "Movie Details" }}
          />
        </Stack>
      </ContextCombiner>
    </SafeAreaProvider>
  );
}
