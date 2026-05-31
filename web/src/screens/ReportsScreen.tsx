import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import GradientBackground from '@/components/GradientBackground';
import ScreenHeader from '@/components/ScreenHeader';
import ComingSoon from '@/components/ComingSoon';
import Icon from '@/components/Icon';

export default function ReportsScreen() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className="screen">
      <GradientBackground variant="aurora" />
      <div className="scroll">
        <button className="back-btn fade-in" onClick={() => navigate('/more')}>
          <Icon name="chevron-left" size={20} />
          {t('common.back')}
        </button>
        <ScreenHeader title={t('reports.title')} subtitle={t('reports.subtitle')} />
        <ComingSoon icon="chart" tint="pink" />
      </div>
    </div>
  );
}
