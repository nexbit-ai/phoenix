import React, { FormEvent, useEffect, useState } from 'react';
import logoFresh from '../../assets/logo_fresh.jpg';
import { Wordmark } from '../../components/Wordmark';
import { useReveal } from '../../utils/useReveal';
import { isValidEmail, submitReferral } from '../../utils/sheetdb';
import '../landing/landing.css';
import './referral.css';

type Step = { num: string; title: string; body: string };

const STEPS: Step[] = [
  {
    num: '01',
    title: 'Refer.',
    body: 'Fill out the form below with their name and company.',
  },
  {
    num: '02',
    title: 'Introduce.',
    body: "Make the introduction on your end. We'll take it from there.",
  },
  {
    num: '03',
    title: 'Receive ₹20,000.',
    body: 'Once they sign on, we transfer ₹20,000 to you.',
  },
];

interface FormFields {
  referrerName: string;
  referrerEmail: string;
  referrerCompany: string;
  referredName: string;
  referredPhoneOrEmail: string;
  referredCompany: string;
}

const EMPTY: FormFields = {
  referrerName: '',
  referrerEmail: '',
  referrerCompany: '',
  referredName: '',
  referredPhoneOrEmail: '',
  referredCompany: '',
};

type FormState = 'idle' | 'submitting' | 'success' | 'error';

interface FieldProps {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
}

const Field: React.FC<FieldProps> = ({
  id,
  label,
  type = 'text',
  autoComplete,
  value,
  onChange,
  error,
  disabled,
}) => (
  <div className={`nx-refer-field${error ? ' has-error' : ''}`}>
    <label className="nx-refer-label" htmlFor={id}>
      {label}
    </label>
    <input
      id={id}
      className="nx-refer-input"
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
      autoComplete={autoComplete}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
    />
    {error && (
      <span id={`${id}-error`} className="nx-refer-field-error">
        {error}
      </span>
    )}
  </div>
);

const ReferralForm: React.FC = () => {
  const [fields, setFields] = useState<FormFields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormFields, string>>>({});
  const [state, setState] = useState<FormState>('idle');

  const set =
    (key: keyof FormFields) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setFields((prev) => ({ ...prev, [key]: e.target.value }));
      if (errors[key]) {
        setErrors((prev) => ({ ...prev, [key]: undefined }));
      }
    };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormFields, string>> = {};
    if (!fields.referrerName.trim()) next.referrerName = 'Required';
    if (!fields.referrerEmail.trim()) next.referrerEmail = 'Required';
    else if (!isValidEmail(fields.referrerEmail))
      next.referrerEmail = 'Enter a valid email';
    if (!fields.referrerCompany.trim()) next.referrerCompany = 'Required';
    if (!fields.referredName.trim()) next.referredName = 'Required';
    if (!fields.referredPhoneOrEmail.trim()) next.referredPhoneOrEmail = 'Required';
    if (!fields.referredCompany.trim()) next.referredCompany = 'Required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (state === 'submitting') return;
    if (!validate()) return;
    setState('submitting');
    const ok = await submitReferral({
      referrer_name: fields.referrerName,
      referrer_email: fields.referrerEmail,
      referrer_company: fields.referrerCompany,
      referred_name: fields.referredName,
      referred_phone_or_email: fields.referredPhoneOrEmail,
      referred_company: fields.referredCompany,
    });
    setState(ok ? 'success' : 'error');
  };

  if (state === 'success') {
    return (
      <div className="nx-refer-success" role="status">
        <p className="nx-refer-success__line">
          Thanks! We&rsquo;ll be in <span className="nx-italic">touch.</span>
        </p>
        <p className="nx-refer-success__meta">
          We&rsquo;ve received your referral for {fields.referredName.trim()} at{' '}
          {fields.referredCompany.trim()}. Make the introduction on your end whenever
          it&rsquo;s convenient.
        </p>
      </div>
    );
  }

  const submitting = state === 'submitting';

  return (
    <form className="nx-refer-form" onSubmit={onSubmit} noValidate>
      <fieldset className="nx-refer-fieldset">
        <legend className="nx-refer-legend">Your details</legend>
        <Field
          id="referrer-name"
          label="Your name"
          autoComplete="name"
          value={fields.referrerName}
          onChange={set('referrerName')}
          error={errors.referrerName}
          disabled={submitting}
        />
        <Field
          id="referrer-email"
          label="Your email"
          type="email"
          autoComplete="email"
          value={fields.referrerEmail}
          onChange={set('referrerEmail')}
          error={errors.referrerEmail}
          disabled={submitting}
        />
        <Field
          id="referrer-company"
          label="Your company"
          autoComplete="organization"
          value={fields.referrerCompany}
          onChange={set('referrerCompany')}
          error={errors.referrerCompany}
          disabled={submitting}
        />
      </fieldset>

      <fieldset className="nx-refer-fieldset">
        <legend className="nx-refer-legend">Who you&rsquo;re referring</legend>
        <Field
          id="referred-name"
          label="Their name"
          value={fields.referredName}
          onChange={set('referredName')}
          error={errors.referredName}
          disabled={submitting}
        />
        <Field
          id="referred-phone-or-email"
          label="Their phone or email"
          value={fields.referredPhoneOrEmail}
          onChange={set('referredPhoneOrEmail')}
          error={errors.referredPhoneOrEmail}
          disabled={submitting}
        />
        <Field
          id="referred-company"
          label="Their company"
          value={fields.referredCompany}
          onChange={set('referredCompany')}
          error={errors.referredCompany}
          disabled={submitting}
        />
      </fieldset>

      {state === 'error' && (
        <div className="nx-refer-error" role="alert">
          Something went wrong. Please try again, or email{' '}
          <a href="mailto:founders@usenexbit.com">founders@usenexbit.com</a>.
        </div>
      )}

      <div className="nx-refer-submit">
        <button
          type="submit"
          className="nx-btn nx-btn--solid nx-btn--lg"
          disabled={submitting}
        >
          {submitting ? 'Sending…' : 'Send referral'}
          <span className="nx-btn__arrow" aria-hidden>
            →
          </span>
        </button>
      </div>
    </form>
  );
};

const ReferralPage: React.FC = () => {
  useReveal();

  useEffect(() => {
    document.title = 'Refer a peer | Nexbit';
  }, []);

  return (
    <div className="nx-landing nx-refer">
      <a href="#main" className="nx-skip">
        Skip to content
      </a>

      <header className="nx-topbar is-stuck">
        <div className="nx-shell nx-topbar__inner">
          <a href="/" aria-label="Nexbit home">
            <Wordmark />
          </a>
          <div className="nx-topbar__cta">
            <a className="nx-btn nx-btn--ghost" href="/">
              ← Back to Nexbit
            </a>
          </div>
        </div>
      </header>

      <main id="main">
        <section className="nx-section nx-refer-hero">
          <div className="nx-shell">
            <div className="nx-refer-split">
              <div className="nx-refer-split__intro">
                <h1 className="nx-display nx-section__headline nx-reveal">
                  Know a finance team that should run on{' '}
                  <span className="nx-italic">Nexbit?</span>
                </h1>
                <p className="nx-lede nx-section__lede nx-reveal">
                  If you&rsquo;ve found Nexbit useful, the people most like you in
                  your network probably will too. Refer a peer who runs finance at
                  another D2C brand. We&rsquo;ll take it from your introduction.
                </p>
                <div className="nx-refer-bounty nx-reveal">
                  <span className="nx-refer-bounty__pill">
                    INR{' '}
                    <span className="nx-refer-bounty__amount">20,000</span>{' '}
                    on successful referral
                  </span>
                </div>
              </div>

              <div className="nx-refer-split__form nx-reveal">
                <ReferralForm />
              </div>
            </div>
          </div>
        </section>

        <section className="nx-section nx-section--tight nx-band nx-band--paper-deep">
          <div className="nx-shell">
            <div className="nx-meta nx-section__eyebrow nx-reveal">How it works</div>
            <h2 className="nx-display nx-section__headline nx-reveal">
              Three <span className="nx-italic">quiet</span> moves.
            </h2>

            <div className="nx-steps nx-reveal">
              {STEPS.map((s) => (
                <div key={s.num} className="nx-step">
                  <div className="nx-step__num">{s.num}</div>
                  <div>
                    <h3 className="nx-step__title">{s.title}</h3>
                    <p className="nx-step__body">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <footer className="nx-footer">
          <div className="nx-shell">
            <div className="nx-footer__row">
              <div>
                <div className="nx-footer__brand">
                  <img
                    src={logoFresh}
                    alt=""
                    className="nx-wordmark__logo"
                    aria-hidden
                  />
                  Nexbit
                </div>
                <p className="nx-footer__line">
                  Accounting AI for D2C. The operating layer for revenue,
                  settlements, books, and the close.
                </p>
                <p className="nx-footer__line" style={{ marginTop: '12px' }}>
                  Contact us:{' '}
                  <a
                    href="mailto:founders@usenexbit.com"
                    style={{ color: 'inherit', textDecoration: 'underline' }}
                  >
                    founders@usenexbit.com
                  </a>
                </p>
              </div>
              <nav className="nx-footer__nav" aria-label="Footer">
                <a href="/#capabilities">Capabilities</a>
                <a href="/#how">How it works</a>
                <a href="/#faq">FAQ</a>
                <a href="mailto:founders@usenexbit.com">Contact Us</a>
              </nav>
              <div className="nx-footer__addr nx-mono">
                {`ACCOUNTING AI\nFOR D2C\n2026`}
              </div>
            </div>

            <div className="nx-footer__bottom">
              <span className="nx-meta">
                © Logikeon Labs Private Limited · All rights reserved
              </span>
              <span className="nx-meta">Built for and by finance teams</span>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default ReferralPage;
