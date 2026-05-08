import { Text, View } from "react-native";

export type PlaceholderScreenProps = {
  title: string;
  description: string;
  accent?: "primary" | "danger" | "warning" | "safe";
};

const accentClass: Record<
  NonNullable<PlaceholderScreenProps["accent"]>,
  string
> = {
  primary: "bg-primary",
  danger: "bg-danger",
  warning: "bg-warning",
  safe: "bg-safe",
};

export function PlaceholderScreen({
  title,
  description,
  accent = "primary",
}: PlaceholderScreenProps) {
  return (
    <View className="flex-1 items-center justify-center bg-slate-50 p-6">
      <View className="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm">
        <View
          className={`mb-4 self-start rounded-full px-3 py-1 ${accentClass[accent]}`}
        >
          <Text className="text-xs font-semibold uppercase tracking-wide text-white">
            Placeholder
          </Text>
        </View>
        <Text className="mb-2 text-2xl font-bold text-slate-900">{title}</Text>
        <Text className="text-base leading-6 text-slate-600">
          {description}
        </Text>
      </View>
    </View>
  );
}
