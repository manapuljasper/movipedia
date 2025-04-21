import { ContextCombiner } from "@/src/shared/ContextCombiner/ContextCombiner";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ContextCombiner>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Movies List" }} />
      </Stack>
    </ContextCombiner>
  );
}
