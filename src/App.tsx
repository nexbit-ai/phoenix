import Landing from './pages/landing/Landing';
import ExtensionPrivacyPage from './pages/extension-privacy/ExtensionPrivacyPage';
import CureskinPricingPage from './pages/cureskin-pricing/CureskinPricingPage';
import ReferralPage from './pages/referral/ReferralPage';

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '');
  if (path === '/extension-privacy-policy' || path === '/extension-privacy-page') {
    return <ExtensionPrivacyPage />;
  }
  if (path === '/cureskin-pricing') {
    return <CureskinPricingPage />;
  }
  if (path === '/refer') {
    return <ReferralPage />;
  }
  return <Landing />;
}
