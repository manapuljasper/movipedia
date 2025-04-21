import { ContextCombiner } from "@/src/shared/ContextCombiner/ContextCombiner";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <ContextCombiner>
      <Stack />
    </ContextCombiner>
  );
}
