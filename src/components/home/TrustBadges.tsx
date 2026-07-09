// @ts-nocheck
import React from 'react';
import { FiAward, FiHeart, FiShield, FiSun } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';

export const TrustBadges = () => {
  const { t } = useTranslation();

  const badges = [
    {
      icon: <FiAward className="w-6 h-6 stroke-[1.5]" />,
      title: t('trust.badge1_title', 'A2 Cow Milk'),
      desc: t('trust.badge1_desc', 'Sourced from indigenous cows')
    },
    {
      icon: <FiHeart className="w-6 h-6 stroke-[1.5]" />,
      title: t('trust.badge2_title', 'Traditional Bilona'),
      desc: t('trust.badge2_desc', 'Hand-churned in small batches')
    },
    {
      icon: <FiShield className="w-6 h-6 stroke-[1.5]" />,
      title: t('trust.badge3_title', '100% Pure'),
      desc: t('trust.badge3_desc', 'No preservatives or additives')
    },
    {
      icon: <FiSun className="w-6 h-6 stroke-[1.5]" />,
      title: t('trust.badge4_title', 'Aromatically Rich'),
      desc: t('trust.badge4_desc', 'Golden texture and perfect taste')
    }
  ];

  return (
    <div className="w-full bg-transparent border-b-[1px] border-primary/10">
      <div className="max-w-7xl mx-auto px-6 py-12 lg:px-16 grid grid-cols-2 md:grid-cols-4 gap-8">
        {badges.map((badge, idx) => (
          <div key={idx} className="flex flex-col items-center justify-center text-center group">
            <div className="w-12 h-12 rounded-full border-[1px] border-primary/20 flex items-center justify-center text-primary mb-4 bg-primary/5 group-hover:bg-primary group-hover:text-white transition-all duration-300">
              {badge.icon}
            </div>
            <h4 className="font-heading text-[15px] text-primary mb-1">{badge.title}</h4>
            <p className="font-sans text-[12px] text-primary/60">{badge.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
