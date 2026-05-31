import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, gradients } from '@/theme/colors';

type Variant = 'aurora' | 'cosmic' | 'header';

interface Props {
  variant?: Variant;
  children?: React.ReactNode;
  style?: ViewStyle;
  /** Decorative glow blobs to amplify the fantasy feel. */
  withBlobs?: boolean;
}

/**
 * Full-screen gradient backdrop with optional glowing color blobs
 * to create the "fantasy aurora" effect across the app.
 */
export default function GradientBackground({
  variant = 'aurora',
  children,
  style,
  withBlobs = true,
}: Props) {
  const palette = gradients[variant];

  return (
    <View style={[styles.root, style]}>
      <LinearGradient
        colors={palette as unknown as readonly [string, string, ...string[]]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFillObject}
      />
      {withBlobs && (
        <>
          <View style={[styles.blob, styles.blobOrange]} />
          <View style={[styles.blob, styles.blobPink]} />
          <View style={[styles.blob, styles.blobBlue]} />
        </>
      )}
      <View style={styles.content}>{children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.deepNavy, overflow: 'hidden' },
  content: { flex: 1 },
  blob: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 320,
    opacity: 0.45,
  },
  blobOrange: {
    backgroundColor: colors.orange,
    top: -120,
    right: -80,
    opacity: 0.35,
  },
  blobPink: {
    backgroundColor: colors.pink,
    top: 220,
    left: -120,
    opacity: 0.30,
  },
  blobBlue: {
    backgroundColor: colors.blue,
    bottom: -160,
    right: -100,
    opacity: 0.30,
  },
});
