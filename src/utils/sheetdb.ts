export function isValidEmail(email: string): boolean {
  if (!email) return false;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email.trim());
}

export function submitNexbitAccountingAiEmail(email: string): void {
  fetch('https://sheetdb.io/api/v1/b64z2r03y8n64', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      nexbitaccountingai: (email || '').toLowerCase(),
    }),
  })
    .then((response) => {
      if (response.ok) {
        console.log('Nexbit accounting AI waitlist email submitted to SheetDB');
      } else {
        console.warn(`SheetDB API error: ${response.status}`);
      }
    })
    .catch((error) => {
      console.warn('Failed to submit waitlist email to SheetDB:', error);
    });
}

export interface ReferralPayload {
  referrer_name: string;
  referrer_email: string;
  referrer_company: string;
  referred_name: string;
  referred_phone_or_email: string;
  referred_company: string;
}

// TODO: replace with the SheetDB endpoint URL once the referrals sheet exists.
const REFERRAL_SHEETDB_URL = 'https://sheetdb.io/api/v1/y05i2bufwn6tt';

export async function submitReferral(payload: ReferralPayload): Promise<boolean> {
  const row = {
    timestamp: new Date().toISOString(),
    referrer_name: payload.referrer_name.trim(),
    referrer_email: payload.referrer_email.trim().toLowerCase(),
    referrer_company: payload.referrer_company.trim(),
    referred_name: payload.referred_name.trim(),
    referred_phone_or_email: payload.referred_phone_or_email.trim(),
    referred_company: payload.referred_company.trim(),
  };

  if (!REFERRAL_SHEETDB_URL) {
    console.log('[referral stub] would POST:', row);
    await new Promise((r) => setTimeout(r, 600));
    return true;
  }

  try {
    const res = await fetch(REFERRAL_SHEETDB_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(row),
    });
    if (!res.ok) {
      console.warn(`SheetDB referral API error: ${res.status}`);
    }
    return res.ok;
  } catch (err) {
    console.warn('Failed to submit referral to SheetDB:', err);
    return false;
  }
}
