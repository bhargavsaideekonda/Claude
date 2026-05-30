import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useTranslation } from 'react-i18next';

import GradientBackground from '@/components/GradientBackground';
import GlassCard from '@/components/GlassCard';
import GlowButton from '@/components/GlowButton';
import SoldierBadge from '@/components/SoldierBadge';
import { colors } from '@/theme/colors';
import { typography } from '@/theme/typography';
import { useAuthStore } from '@/store/authStore';
import { AuthStackParamList } from '@/navigation/types';

type Nav = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

export default function LoginScreen() {
  const navigation = useNavigation<Nav>();
  const { t } = useTranslation();
  const requestOtp = useAuthStore((s) => s.requestOtp);

  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const isValid = /^[6-9]\d{9}$/.test(phone);

  const handleSendOtp = async () => {
    if (!isValid) return;
    setLoading(true);
    await requestOtp(phone);
    setLoading(false);
    navigation.navigate('Otp', { phone });
  };

  return (
    <GradientBackground variant="aurora">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scroll}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.badgeWrap}>
            <SoldierBadge size={120} animated={false} />
          </View>

          <Animated.View entering={FadeInDown.duration(600)}>
            <Text style={styles.eyebrow}>{t('app.tagline')}</Text>
            <Text style={styles.title}>{t('auth.loginTitle')}</Text>
            <Text style={styles.subtitle}>{t('auth.loginSubtitle')}</Text>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(150).duration(600)}>
            <GlassCard tint="glassBlue" padding={20} style={styles.card}>
              <Text style={styles.label}>{t('auth.phoneLabel')}</Text>
              <View style={styles.inputRow}>
                <View style={styles.flagBox}>
                  <Text style={styles.flag}>+91</Text>
                </View>
                <TextInput
                  value={phone}
                  onChangeText={(v) => setPhone(v.replace(/\D/g, '').slice(0, 10))}
                  keyboardType="phone-pad"
                  placeholder={t('auth.phonePlaceholder')}
                  placeholderTextColor={colors.textMuted}
                  style={styles.input}
                  maxLength={10}
                />
                {isValid && (
                  <Ionicons name="checkmark-circle" size={20} color={colors.success} />
                )}
              </View>
            </GlassCard>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(300).duration(600)} style={styles.actions}>
            <GlowButton
              label={t('auth.sendOtp')}
              onPress={handleSendOtp}
              disabled={!isValid}
              loading={loading}
              icon={<Ionicons name="send" size={18} color={colors.white} />}
            />
            <Text style={styles.terms}>{t('auth.termsHint')}</Text>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  scroll: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 40,
    gap: 22,
  },
  badgeWrap: { alignItems: 'center', marginBottom: 8 },
  eyebrow: {
    ...typography.overline,
    color: colors.orange,
  },
  title: {
    ...typography.h1,
    color: colors.textPrimary,
    marginTop: 6,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: 8,
  },
  card: {},
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 14,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.glassBorder,
  },
  flagBox: {
    paddingVertical: 12,
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: colors.glassBorder,
  },
  flag: {
    ...typography.bodyStrong,
    color: colors.textPrimary,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    color: colors.textPrimary,
    fontFamily: 'Poppins_500Medium',
    fontSize: 16,
    letterSpacing: 1,
  },
  actions: { gap: 12 },
  terms: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
