import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import GradientBackground from '@/components/GradientBackground';
import ScreenHeader from '@/components/ScreenHeader';
import ComingSoon from '@/components/ComingSoon';

export default function MembersScreen() {
  const { t } = useTranslation();
  return (
    <GradientBackground variant="aurora">
      <View style={styles.root}>
        <ScreenHeader title={t('members.title')} subtitle={t('members.subtitle')} />
        <ComingSoon icon="people" tint="glassPink" />
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({ root: { flex: 1, paddingBottom: 100 } });
