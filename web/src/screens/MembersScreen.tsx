import React from 'react';
import { useTranslation } from 'react-i18next';
import GradientBackground from '@/components/GradientBackground';
import ScreenHeader from '@/components/ScreenHeader';
import ComingSoon from '@/components/ComingSoon';

export default function MembersScreen() {
  const { t } = useTranslation();
  return (
    <div className="screen">
      <GradientBackground variant="aurora" />
      <div className="scroll">
        <ScreenHeader title={t('members.title')} subtitle={t('members.subtitle')} />
        <ComingSoon icon="people" tint="pink" />
      </div>
    </div>
  );
}
