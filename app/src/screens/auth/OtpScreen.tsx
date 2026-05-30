import React, { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRoute, useNavigation, RouteProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import GradientBackground from '@/components/GradientBackground';
import GlassCard from '@/components/GlassCard';
import GlowButton from '@/components/GlowButton';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { useAuthStore } from '@/store/authStore';
import { AuthStackParamList } from '@/navigation/types';

const OTP_LENGTH = 6;

export default function OtpScreen() {
  const route = useRoute<RouteProp<AuthStackParamList, 'Otp'>>();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const verifyOtp = useAuthStore((s) => s.verifyOtp);

  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputs = useRef<Array<TextInput | null>>([]);

  const onChange = (idx: number, value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, 1);
    const next = [...digits];
    next[idx] = cleaned;
    setDigits(next);
    if (cleaned && idx < OTP_LENGTH - 1) inputs.current[idx + 1]?.focus();
  };

  const onKeyPress = (idx: number, key: string) => {
    if (key === 'Backspace' && !digits[idx] && idx > 0) {
      inputs.current[idx - 1]?.focus();
    }
  };

  const code = digits.join('');
  const isComplete = code.length === OTP_LENGTH;

  const handleVerify = async () => {
    setLoading(true);
    setError(null);
    const ok = await verifyOtp(code);
    setLoading(false);
    if (!ok) {
      setError('Invalid code');
      return;
    }
    // RootNavigator will auto-swap to AppTabs on successful auth.
  };

  return (
    <GradientBackground variant="aurora">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <View style={styles.root}>
          <Pressable onPress={() => navigation.goBack()} style={styles.back}>
            <Ionicons name="chevron-back" size={20} color={colors.textPrimary} />
            <Text style={styles.backText}>Back</Text>
          </Pressable>

          <Animated.View entering={FadeInDown.duration(600)}>
            <Text style={styles.eyebrow}>{t('app.tagline')}</Text>
            <Text style={styles.title}>{t('auth.otpTitle')}</Text>
            <Text style={styles.subtitle}>
              {t('auth.otpSubtitle', { phone: `+91 ${route.params.phone}` })}
            </Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(150).duration(600)}>
            <GlassCard tint="glassPink" padding={22}>
              <Text style={styles.label}>{t('auth.otpLabel')}</Text>
              <View style={styles.otpRow}>
                {digits.map((d, i) => (
                  <TextInput
                    key={i}
                    ref={(el) => {
                      inputs.current[i] = el;
                    }}
                    value={d}
                    onChangeText={(v) => onChange(i, v)}
                    onKeyPress={({ nativeEvent }) => onKeyPress(i, nativeEvent.key)}
                    keyboardType="number-pad"
                    maxLength={1}
                    style={[styles.otpBox, d ? styles.otpBoxFilled : null]}
                    selectionColor={colors.orange}
                  />
                ))}
              </View>
              {error && <Text style={styles.error}>{error}</Text>}
            </GlassCard>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(300).duration(600)} style={styles.actions}>
            <GlowButton
              label={t('auth.verify')}
              onPress={handleVerify}
              disabled={!isComplete}
              loading={loading}
              icon={<Ionicons name="shield-checkmark" size={18} color={colors.white} />}
            />
            <Pressable>
              <Text style={styles.resend}>{t('auth.resend')}</Text>
            </Pressable>
          </Animated.View>
        </View>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    gap: 22,
  },
  back: { flexDirection: 'row', alignItems: 'center', gap: 4, marginBottom: 8 },
  backText: { ...typography.bodyStrong, color: colors.textPrimary },
  eyebrow: { ...typography.overline, color: colors.orange },
  title: { ...typography.h1, color: colors.textPrimary, marginTop: 6 },
  subtitle: { ...typography.body, color: colors.textSecondary, marginTop: 8 },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 12,
    textAlign: 'center',
  },
  otpRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 8 },
  otpBox: {
    flex: 1,
    height: 56,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    backgroundColor: 'rgba(0,0,0,0.25)',
    color: colors.textPrimary,
    textAlign: 'center',
    fontFamily: 'Poppins_700Bold',
    fontSize: 22,
  },
  otpBoxFilled: {
    borderColor: colors.orange,
    backgroundColor: 'rgba(255,140,41,0.12)',
  },
  error: {
    ...typography.caption,
    color: colors.danger,
    marginTop: 10,
    textAlign: 'center',
  },
  actions: { gap: 12 },
  resend: {
    ...typography.bodyStrong,
    color: colors.orange,
    textAlign: 'center',
  },
});
