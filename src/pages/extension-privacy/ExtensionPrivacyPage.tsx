import './extension-privacy.css';

export default function ExtensionPrivacyPage() {
  return (
    <div className="nx-privacy">
      <main className="nx-privacy__shell">
        <h1 className="nx-privacy__title">Privacy Policy for Nexbit Demo Builder</h1>
        <p className="nx-privacy__updated">Last Updated: January 24, 2026</p>

        <section className="nx-privacy__section">
          <h2>Introduction</h2>
          <p>
            Nexbit Demo Builder ("we," "our," or "the extension"), developed by Logikeon Labs Private Limited, is a Chrome extension that allows users to record and capture DOM interactions on web pages to create interactive product demonstrations. We are committed to protecting your privacy and being transparent about how we collect, use, and protect your data.
          </p>
          <p>
            This privacy policy explains what data we collect, how we use it, and your rights regarding your information.
          </p>
        </section>

        <section className="nx-privacy__section">
          <h2>Information We Collect</h2>

          <h3>Data Collected During Recording</h3>
          <p>We only collect data when you explicitly initiate a recording session. During an active recording, we collect:</p>
          <ul className="nx-privacy__list">
            <li>DOM Snapshots: Complete HTML structure of the web pages you are recording, including visible content, styles, and layout information</li>
            <li>User Interactions: Click coordinates, scroll positions, and viewport dimensions during your recording session</li>
            <li>Navigation Data: URLs of pages visited during an active recording session</li>
            <li>Timestamps: Recording start time and interaction timestamps for playback synchronization</li>
            <li>Browser Metadata: Browser type, extension version, screen resolution, and viewport size</li>
          </ul>

          <h3>Authentication Data</h3>
          <p>To provide account functionality, we collect:</p>
          <ul className="nx-privacy__list">
            <li>Session Tokens: Stytch authentication session JWT and session tokens</li>
            <li>User Information: Name and email address provided through Stytch authentication</li>
            <li>Organization ID: Your Stytch organization identifier</li>
          </ul>

          <h3>Technical Data</h3>
          <ul className="nx-privacy__list">
            <li>Local Storage: Recording state and authentication tokens stored locally in your browser</li>
            <li>Usage Data: Extension installation and basic usage metrics (no personal data)</li>
          </ul>
        </section>

        <section className="nx-privacy__section">
          <h2>How We Use Your Information</h2>
          <p>We use the collected information solely for the following purposes:</p>
          <ul className="nx-privacy__list">
            <li>Creating Demo Recordings: Processing and storing your recorded sessions to create playable demonstrations</li>
            <li>User Authentication: Verifying your identity and maintaining your login session</li>
            <li>Service Delivery: Saving recordings to your Nexbit account and enabling playback in the editor</li>
            <li>Service Improvement: Analyzing usage patterns to improve extension functionality (aggregated and anonymized data only)</li>
            <li>Technical Support: Diagnosing and resolving technical issues when you contact support</li>
          </ul>

          <h3>What We DO NOT Do</h3>
          <ul className="nx-privacy__plain-list">
            <li>We DO NOT collect data when the extension is not actively recording</li>
            <li>We DO NOT use your data for advertising or marketing purposes</li>
            <li>We DO NOT sell, rent, or share your data with third parties for their commercial purposes</li>
            <li>We DO NOT track your browsing activity outside of active recording sessions</li>
            <li>We DO NOT access or read your data for any purpose other than providing the service</li>
          </ul>
        </section>

        <section className="nx-privacy__section">
          <h2>Data Storage and Security</h2>

          <h3>Where Your Data is Stored</h3>
          <ul className="nx-privacy__list">
            <li>Recording Data: Stored on Nexbit backend servers at api-studio.nexbit.ai</li>
            <li>Authentication Tokens: Stored locally in your browser using Chrome's storage API</li>
            <li>Location: Data is processed and stored on secure cloud servers</li>
          </ul>

          <h3>Security Measures</h3>
          <p>We implement industry-standard security measures including:</p>
          <ul className="nx-privacy__list">
            <li>HTTPS encryption for all data transmission</li>
            <li>Secure token-based authentication using Stytch</li>
            <li>Access controls limiting data access to authorized personnel only</li>
            <li>Regular security audits and updates</li>
          </ul>

          <h3>Data Retention</h3>
          <ul className="nx-privacy__list">
            <li>Recording Data: Recordings are stored until you delete them from your account</li>
            <li>Authentication Data: Session tokens expire according to Stytch's security policies</li>
            <li>Account Data: Retained as long as your account is active</li>
            <li>Deleted Data: Permanently removed from our servers within 30 days of deletion</li>
          </ul>
        </section>

        <section className="nx-privacy__section">
          <h2>Data Sharing and Third Parties</h2>
          <p>
            We do not sell, trade, or transfer your data to third parties. We may share data only in the following limited circumstances:
          </p>
          <ul className="nx-privacy__list">
            <li>Service Providers: Stytch for authentication (subject to their privacy policy)</li>
            <li>Legal Requirements: When required by law, court order, or to protect our legal rights</li>
            <li>Business Transfers: In the event of a merger or acquisition, with prior user consent</li>
            <li>Security Protection: To prevent fraud, abuse, or security threats</li>
          </ul>
          <p>
            All third-party services we use are required to maintain the confidentiality and security of your data.
          </p>
        </section>

        <section className="nx-privacy__section">
          <h2>Your Rights and Choices</h2>
          <p>You have the following rights regarding your data:</p>

          <h3>Access and Portability</h3>
          <ul className="nx-privacy__list">
            <li>View all your recordings through the Nexbit dashboard</li>
            <li>Export your recordings in standard formats</li>
          </ul>

          <h3>Deletion</h3>
          <ul className="nx-privacy__list">
            <li>Delete individual recordings at any time through the Nexbit interface</li>
            <li>Request complete account deletion by contacting us</li>
          </ul>

          <h3>Correction</h3>
          <ul className="nx-privacy__list">
            <li>Update your account information through your Nexbit account settings</li>
          </ul>

          <h3>Withdrawal of Consent</h3>
          <ul className="nx-privacy__list">
            <li>Uninstall the extension at any time to stop all data collection</li>
            <li>Log out to clear local authentication data</li>
          </ul>
        </section>

        <section className="nx-privacy__section">
          <h2>Chrome Extension Permissions</h2>
          <p>The extension requests the following permissions, which are used only as described:</p>

          <div className="nx-privacy__permission">
            <h3>activeTab Permission</h3>
            <p><strong>Why we need it:</strong> To capture DOM snapshots of the currently active tab when you explicitly start a recording session.</p>
            <p><strong>What we do:</strong> Read the visible HTML, CSS, and page structure of tabs you choose to record.</p>
            <p><strong>What we don't do:</strong> Access tabs you're not recording, read sensitive form data, or track your browsing.</p>
          </div>

          <div className="nx-privacy__permission">
            <h3>storage Permission</h3>
            <p><strong>Why we need it:</strong> To store recording state and authentication tokens locally in your browser.</p>
            <p><strong>What we do:</strong> Save your login session and maintain recording state across browser sessions.</p>
            <p><strong>What we don't do:</strong> Access or transmit this data except to authenticate with our servers.</p>
          </div>

          <div className="nx-privacy__permission">
            <h3>Content Scripts on &lt;all_urls&gt;</h3>
            <p><strong>Why we need it:</strong> To enable recording functionality on any website you choose to record.</p>
            <p><strong>What we do:</strong> Inject recording listeners only when you explicitly start a recording session.</p>
            <p><strong>What we don't do:</strong> Run scripts or collect data on pages where you haven't started recording.</p>
          </div>

          <div className="nx-privacy__permission">
            <h3>Content Scripts on Nexbit Domains</h3>
            <p><strong>Why we need it:</strong> To sync your login session between the web app and extension.</p>
            <p><strong>What we do:</strong> Read authentication cookies from studio.nexbit.ai to keep you logged in.</p>
            <p><strong>What we don't do:</strong> Access cookies from other websites or share your credentials.</p>
          </div>
        </section>

        <section className="nx-privacy__section">
          <h2>Chrome Web Store Limited Use Compliance</h2>
          <p>This extension complies with the Chrome Web Store's Limited Use policy:</p>
          <ul className="nx-privacy__list">
            <li>We collect user data only for the single purpose of creating and storing demo recordings</li>
            <li>We do not use data for personalized advertising</li>
            <li>We do not sell or transfer user data to third parties (except as required by law)</li>
            <li>We do not use data for creditworthiness or lending purposes</li>
            <li>Human access to user data is limited to debugging and support with explicit user consent</li>
          </ul>
        </section>

        <section className="nx-privacy__section">
          <h2>Children's Privacy</h2>
          <p>
            Our service is not directed to individuals under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that a child under 13 has provided us with personal information, we will take steps to delete such information.
          </p>
        </section>

        <section className="nx-privacy__section">
          <h2>International Users</h2>
          <p>
            If you are accessing our service from outside the United States, please be aware that your information may be transferred to, stored, and processed in the United States and other countries where our servers are located. By using our service, you consent to this transfer.
          </p>
        </section>

        <section className="nx-privacy__section">
          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update this privacy policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons. When we make changes:
          </p>
          <ul className="nx-privacy__list">
            <li>We will update the "Last Updated" date at the top of this policy</li>
            <li>For material changes, we may notify you via email or through the extension</li>
            <li>Continued use of the extension after changes constitutes acceptance of the updated policy</li>
          </ul>
          <p>
            We encourage you to review this policy periodically.
          </p>
        </section>

        <section className="nx-privacy__section">
          <h2>Contact Us</h2>
          <p>
            If you have questions, concerns, or requests regarding this privacy policy or our data practices, please contact us:
          </p>
          <ul className="nx-privacy__list">
            <li><strong>Email:</strong> founder@nexbit.ai</li>
            <li><strong>Website:</strong> <a href="https://nexbit.ai">https://nexbit.ai</a></li>
            <li><strong>Support:</strong> founder@nexbit.ai</li>
          </ul>
          <p>
            For privacy-specific inquiries or to exercise your data rights, please include "Privacy Request" in your email subject line.
          </p>
        </section>

        <section className="nx-privacy__section">
          <h2>Legal Compliance</h2>
          <p>This privacy policy is designed to comply with:</p>
          <ul className="nx-privacy__list">
            <li>General Data Protection Regulation (GDPR) for European users</li>
            <li>California Consumer Privacy Act (CCPA) for California residents</li>
            <li>Chrome Web Store Developer Program Policies</li>
            <li>Other applicable data protection laws</li>
          </ul>
          <p>
            If you are in the European Economic Area (EEA) or California, you may have additional rights under GDPR or CCPA. Please contact us to exercise these rights.
          </p>
        </section>

        <div className="nx-privacy__footer-meta">
          <strong>Developer:</strong> Nexbit Team<br />
          <strong>Extension Name:</strong> Nexbit Demo Builder<br />
          <strong>Version:</strong> 0.0.1<br />
          <strong>Privacy Policy Version:</strong> 1.0
        </div>
      </main>
    </div>
  );
}
