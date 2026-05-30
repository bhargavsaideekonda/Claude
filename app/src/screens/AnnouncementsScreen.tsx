import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

import GradientBackground from '@/components/GradientBackground';
import ScreenHeader from '@/components/ScreenHeader';
import ComingSoon from '@/components/ComingSoon';

export default function AnnouncementsScreen() {
  const { t } = useTranslation();
  return (
    <GradientBackground variant="aurora">
      <View style={styles.root}>
        <ScreenHeader title={t('announcements.title')} subtitle={t('announcements.subtitle')} />
        <ComingSoon icon="megaphone" tint="glassOrange" />
      </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({ root: { flex: 1, paddingBottom: 100 } });
