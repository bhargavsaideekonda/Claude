import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  Easing,
  FadeIn,
  FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import GradientBackground from '@/components/GradientBackground';
import SoldierBadge from '@/components/SoldierBadge';
import GlowButton from '@/components/GlowButton';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { AuthStackParamList } from '@/navigation/types';

type Nav = NativeStackNavigationProp<AuthStackParamList, 'Splash'>;

export default function SplashScreen() {
  const navigation = useNavigation<Nav>();
  const { t } = useTranslation();

  const pulse = useSharedValue(1);
  useEffect(() => {
    pulse.value = withRepeat(
      withSequence(
        withTiming(1.06, { duration: 1400, easing: Easing.inOut(Easing.ease) }),
        withTiming(1, { duration: 1400, easing: Easing.inOut(Easing.ease) }),
      ),
      -1,
      true,
    );
  }, [pulse]);

  const pulseStyle = useAnimatedStyle(() => ({ transform: [{ scale: pulse.value }] }));

  return (
    <GradientBackground variant="cosmic">
      <View style={styles.root}>
        <Animated.View entering={FadeIn.duration(900)} style={[styles.badgeWrap, pulseStyle]}>
          <SoldierBadge size={200} />
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(300).duration(700)}>
          <Text style={styles.eyebrow}>{t('app.society')}</Text>
          <Text style={styles.welcome}>{t('auth.splashWelcome')}</Text>
          <Text style={styles.subtitle}>{t('auth.splashSubtitle')}</Text>
        </Animated.View>

        <Animated.View
          entering={FadeInDown.delay(600).duration(700)}
          style={styles.actions}
        >
          <GlowButton
            label={t('common.continue')}
            onPress={() => navigation.replace('Login')}
          />
          <Text style={styles.motto}>{t('app.motto')}</Text>
        </Animated.View>
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 28,
    paddingTop: 80,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  badgeWrap: { alignItems: 'center', marginTop: 20 },
  eyebrow: {
    ...typography.overline,
    color: colors.orange,
    textAlign: 'center',
  },
  welcome: {
    ...typography.display,
    color: colors.textPrimary,
    textAlign: 'center',
    marginTop: 8,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    textAlign: 'center',
    marginTop: 12,
  },
  actions: { gap: 14 },
  motto: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
