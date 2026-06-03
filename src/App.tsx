import Landing from './pages/landing/Landing';
import ExtensionPrivacyPage from './pages/extension-privacy/ExtensionPrivacyPage';
// import CureskinPricingPage from './pages/cureskin-pricing/CureskinPricingPage';
import ReferralPage from './pages/referral/ReferralPage';
import PricingPage from './pages/pricing/PricingPage';
import { BlogPage } from './pages/blog/BlogPage';
import { BlogIndex } from './pages/blog/BlogIndex';

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, '');
  if (path === '/blogs') {
    return <BlogIndex />;
  }
  if (path.startsWith('/blogs/')) {
    const titleSlug = path.split('/')[2];
    if (titleSlug) {
      return <BlogPage titleSlug={titleSlug} />;
    }
  }
  if (path === '/extension-privacy-policy' || path === '/extension-privacy-page') {
    return <ExtensionPrivacyPage />;
  }
  // Cureskin pricing page taken down but code kept
  // if (path === '/cureskin-pricing') {
  //   return <CureskinPricingPage />;
  // }
  if (path === '/pricing') {
    return <PricingPage />;
  }
  if (path === '/refer') {
    return <ReferralPage />;
  }
  return <Landing />;
}
