import { Pressable, Text } from 'react-native';

export type ButtonVariant = 'primary' | 'danger' | 'warning' | 'safe' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export type ButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
};

const VARIANT_BG: Record<ButtonVariant, string> = {
  primary: 'bg-primary active:bg-sky-800',
  danger: 'bg-danger active:bg-red-800',
  warning: 'bg-warning active:bg-amber-800',
  safe: 'bg-safe active:bg-green-800',
  ghost: 'bg-transparent border border-slate-300 active:bg-slate-100',
};

const VARIANT_TEXT: Record<ButtonVariant, string> = {
  primary: 'text-white',
  danger: 'text-white',
  warning: 'text-white',
  safe: 'text-white',
  ghost: 'text-slate-900',
};

const SIZE_BOX: Record<ButtonSize, string> = {
  sm: 'px-3 py-2 rounded-md',
  md: 'px-4 py-3 rounded-lg',
  lg: 'px-5 py-4 rounded-lg',
};

const SIZE_TEXT: Record<ButtonSize, string> = {
  sm: 'text-sm',
  md: 'text-base',
  lg: 'text-lg',
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  disabled,
}: ButtonProps) {
  const opacity = disabled ? 'opacity-50' : '';
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      className={`items-center justify-center ${SIZE_BOX[size]} ${VARIANT_BG[variant]} ${opacity}`.trim()}
    >
      <Text
        className={`font-semibold ${SIZE_TEXT[size]} ${VARIANT_TEXT[variant]}`.trim()}
      >
        {label}
      </Text>
    </Pressable>
  );
}
