import Landing from './pages/landing/Landing';
import ExtensionPrivacyPage from './pages/extension-privacy/ExtensionPrivacyPage';
import CureskinPricingPage from './pages/cureskin-pricing/CureskinPricingPage';
import BaccaBucciPricingPage from './pages/bacca-bucci-pricing/BaccaBucciPricingPage';
import ToscanoPricingPage from './pages/toscano-pricing/ToscanoPricingPage';
import WellbeingNutritionPricingPage from './pages/wellbeing-nutrition-pricing/WellbeingNutritionPricingPage';
import SuperYouPricingPage from './pages/superyou-pricing/SuperYouPricingPage';
import FastUpPricingPage from './pages/fast-up-pricing/FastUpPricingPage';
import FastUpPricingUpdatedPage from './pages/fast-up-pricing-updated/FastUpPricingUpdatedPage';
import SironaPricingPage from './pages/sirona-pricing/SironaPricingPage';
import VirgioPricingPage from './pages/virgio-pricing/VirgioPricingPage';
import RedcliffePricingPage from './pages/redcliffe-pricing/RedcliffePricingPage';
import ReferralPage from './pages/referral/ReferralPage';
import { BlogPage } from './pages/blog/BlogPage';
import { BlogIndex } from './pages/blog/BlogIndex';

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '');
  // Redirect old /blogs paths to /blog for backwards compatibility
  if (path === '/blogs' || path.startsWith('/blogs/')) {
    window.location.replace(path.replace(/^\/blogs/, '/blog') + window.location.search + window.location.hash);
    return null;
  }
  if (path === '/blog') {
    return <BlogIndex />;
  }
  if (path.startsWith('/blog/')) {
    const titleSlug = path.split('/')[2];
    if (titleSlug) {
      return <BlogPage titleSlug={titleSlug} />;
    }
  }
  if (path === '/extension-privacy-policy' || path === '/extension-privacy-page') {
    return <ExtensionPrivacyPage />;
  }
  if (path === '/cureskin-pricing') {
    return <CureskinPricingPage />;
  }
  if (path === '/Bacca-Bucci-pricing' || path === '/bacca-bucci-pricing') {
    return <BaccaBucciPricingPage />;
  }
  if (path === '/toscano-pricing') {
    return <ToscanoPricingPage />;
  }
  if (path === '/wellbeing-nutrition-pricing') {
    return <WellbeingNutritionPricingPage />;
  }
  if (path === '/superyou-pricing') {
    return <SuperYouPricingPage />;
  }
  if (path === '/fast-up-pricing-updated' || path === '/fastandup-pricing-updated') {
    return <FastUpPricingUpdatedPage />;
  }
  if (path === '/fast-up-pricing' || path === '/fastandup-pricing') {
    return <FastUpPricingPage />;
  }
  if (path === '/sirona-pricing') {
    return <SironaPricingPage />;
  }
  if (path === '/virgio-pricing') {
    return <VirgioPricingPage />;
  }
  if (path === '/redcliffe-pricing' || path === '/peesafe-pricing') {
    return <RedcliffePricingPage />;
  }
  if (path === '/refer') {
    return <ReferralPage />;
  }
  return <Landing />;
}
