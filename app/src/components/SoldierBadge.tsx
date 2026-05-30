import React, { useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import { colors, gradients } from '@/theme/colors';
import { typography } from '@/theme/typography';

interface Props {
  size?: number;
  label?: string;
  /** Set false to skip the spinning ring animation. */
  animated?: boolean;
}

/**
 * The hero element — a slowly rotating gradient ring around the society logo.
 * Tries to render assets/logo.png; falls back to a stylised "P" monogram.
 */
export default function SoldierBadge({
  size = 180,
  label,
  animated = true,
}: Props) {
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (!animated) return;
    rotation.value = withRepeat(
      withTiming(360, { duration: 18000, easing: Easing.linear }),
      -1,
      false,
    );
  }, [animated, rotation]);

  const ringStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  const ringSize = size;
  const innerSize = size - 18;

  // We don't bundle the logo image — it's added by the user at assets/logo.png.
  // require() is inside try/catch via a safe wrapper.
  let logoSource: number | null = null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    logoSource = require('../../assets/logo.png');
  } catch {
    logoSource = null;
  }

  return (
    <View style={[styles.wrap, { width: ringSize + 24, height: ringSize + 24 }]}>
      <View style={[styles.outerGlow, { width: ringSize + 60, height: ringSize + 60, borderRadius: (ringSize + 60) / 2 }]} />
      <Animated.View
        style={[
          styles.ring,
          ringStyle,
          { width: ringSize, height: ringSize, borderRadius: ringSize / 2 },
        ]}
      >
        <LinearGradient
          colors={gradients.badge as unknown as readonly [string, string, ...string[]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[StyleSheet.absoluteFillObject, { borderRadius: ringSize / 2 }]}
        />
      </Animated.View>
      <View
        style={[
          styles.inner,
          { width: innerSize, height: innerSize, borderRadius: innerSize / 2 },
        ]}
      >
        {logoSource ? (
          <Image
            source={logoSource}
            style={{ width: innerSize - 14, height: innerSize - 14, borderRadius: (innerSize - 14) / 2 }}
            resizeMode="cover"
          />
        ) : (
          <View style={styles.fallback}>
            <Text style={styles.fallbackP}>P</Text>
            <Text style={styles.fallbackSub}>MACS</Text>
          </View>
        )}
      </View>
      {label && <Text style={styles.label}>{label}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center' },
  outerGlow: {
    position: 'absolute',
    backgroundColor: colors.pink,
    opacity: 0.25,
    shadowColor: colors.orange,
    shadowOpacity: 0.6,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 0 },
    elevation: 20,
  },
  ring: { position: 'absolute', overflow: 'hidden' },
  inner: {
    backgroundColor: colors.deepNavy,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.glassBorder,
  },
  fallback: { alignItems: 'center', justifyContent: 'center' },
  fallbackP: {
    ...typography.display,
    color: colors.orange,
    fontSize: 56,
    lineHeight: 60,
  },
  fallbackSub: {
    ...typography.overline,
    color: colors.pinkSoft,
    marginTop: 2,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    marginTop: 12,
  },
});
