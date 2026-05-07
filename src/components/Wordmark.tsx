import React from 'react';
import logoFresh from '../assets/logo_fresh.jpg';

export const Wordmark: React.FC<{ size?: 'sm' | 'md' }> = ({ size = 'md' }) => (
  <span className="nx-wordmark" style={size === 'sm' ? { fontSize: 18 } : undefined}>
    <img src={logoFresh} alt="" className="nx-wordmark__logo" aria-hidden />
    Nexbit
  </span>
);
