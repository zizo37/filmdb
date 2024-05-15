import React from 'react';
import './PolicyStyles.css';
import Header from './Header';
import Footer from './Footer';

const PrivacyPolicy = () => {
    return (
        <>

            <Header />
            <div className="policy-container">
                <div className="policy-content">
                    <h1>Privacy Policy</h1>
                    <p>At our website, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard the information you provide when using our services.</p>

                    <h2>Information We Collect</h2>
                    <p>We may collect personal information such as your name, email address, and other contact details when you create an account or sign up for our services. We may also collect non-personal information, such as your device information, browsing activity, and usage data, to improve our services.</p>

                    <h2>How We Use Your Information</h2>
                    <p>We use the information we collect to provide and improve our services, communicate with you about our products and promotions, and personalize your experience on our website.</p>

                    <h2>Data Security</h2>
                    <p>We take reasonable measures to protect your personal information from unauthorized access, disclosure, or misuse. However, no method of transmitting or storing data is completely secure, and we cannot guarantee the absolute security of your information.</p>

                    <h2>Third-Party Disclosure</h2>
                    <p>We may share your information with trusted third parties who assist us in operating our website, conducting our business, or servicing you. We will not sell or rent your personal information to third parties for their marketing purposes without your consent.</p>

                    <h2>Your Rights</h2>
                    <p>You have the right to access, update, or delete your personal information at any time. You can also opt-out of receiving marketing communications from us.</p>

                    <h2>Changes to This Policy</h2>
                    <p>We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We encourage you to review this page periodically for the latest information.</p>

                    <p>If you have any questions or concerns about our Privacy Policy, please contact us at [insert contact information].</p>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default PrivacyPolicy;