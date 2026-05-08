import { Link, Stack } from "expo-router";
import { Text, View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Not found" }} />
      <View className="flex-1 items-center justify-center bg-slate-50 p-6">
        <Text className="mb-2 text-xl font-bold text-slate-900">
          This screen does not exist.
        </Text>
        <Link href="/" className="mt-3 rounded-lg bg-primary px-4 py-2">
          <Text className="font-semibold text-white">Go to home</Text>
        </Link>
      </View>
    </>
  );
}
