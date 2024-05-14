import React from 'react';
import './PolicyStyles.css';
import Header from './Header';
import Footer from './Footer';

const TermsOfService = () => {
    return (
        <>
        
        <Header />
        <div className="policy-container">
            <div className="policy-content">
                <h1>Terms of Service</h1>
                <p>Welcome to our website. By using our services, you agree to be bound by the following Terms of Service.</p>

                <h2>User Accounts</h2>
                <p>To access certain features of our website, you may be required to create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>

                <h2>Content and Intellectual Property</h2>
                <p>Our website and its contents, including but not limited to text, graphics, logos, and images, are protected by intellectual property laws. You may not reproduce, distribute, or modify any part of our website without our prior written consent.</p>

                <h2>User-Generated Content</h2>
                <p>You are solely responsible for any content you submit or post on our website. By submitting content, you grant us a non-exclusive, royalty-free license to use, reproduce, modify, and distribute the content.</p>

                <h2>Third-Party Links</h2>
                <p>Our website may contain links to third-party websites or services. We are not responsible for the content or practices of those third-party websites or services.</p>

                <h2>Limitation of Liability</h2>
                <p>Our website is provided on an "as is" and "as available" basis. We make no warranties or representations of any kind, express or implied, regarding the use of our website or the information, services, or products provided through our website.</p>

                <h2>Termination</h2>
                <p>We reserve the right to terminate or suspend your access to our website at any time, without notice, for any reason.</p>

                <h2>Governing Law</h2>
                <p>These Terms of Service shall be governed by and construed in accordance with the laws of [insert jurisdiction].</p>

                <p>If you have any questions or concerns about our Terms of Service, please contact us at [insert contact information].</p>
            </div>
        </div>
        <Footer />
        </>
    );
};

export default TermsOfService;