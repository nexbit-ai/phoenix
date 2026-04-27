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
