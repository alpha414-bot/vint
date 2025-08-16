import { TermsPrivacyItem } from "@/Components/Footer";
import MainLayout from "@/Layouts/MainLayout";
import { contacts } from "@/System/function";
import { Link } from "react-router-dom";

const TermsConditionsPage = () => {
    return (
        <MainLayout title="Terms and Conditions" description="Read our terms and conditions for using Emeralds Digital Ventures services">
            <main>
                <div className="mx-auto max-w-7xl space-y-8 px-6 py-16 text-gray-100">
                    <div className="space-y-2">
                        <h1 className="text-center text-5xl font-bold">
                            Terms and Conditions
                        </h1>
                        <p className="mb-0 text-center">
                            <strong>Effective Date:</strong> 16th August 2025
                        </p>
                        <p className="text-center">
                            <strong>Last updated:</strong> 16th August 2025
                        </p>
                    </div>

                    <TermsPrivacyItem
                        title="1. Introduction"
                        content={
                            <>
                                <p>
                                    Welcome to Emeralds Digital Ventures. These Terms and Conditions govern your use of our website,
                                    services, and digital educational content (collectively, the "Services").
                                </p>
                                <p>
                                    By accessing or using our Services, you agree to be bound by these Terms and Conditions.
                                    If you do not agree to these terms, please do not use our Services.
                                </p>
                                <p>
                                    Emeralds Digital Ventures is a modern platform for mastering ecommerce through expert-led courses.
                                    We provide digital educational content designed to help you learn, launch, and grow your
                                    online business.
                                </p>
                            </>
                        }
                    />

                    <TermsPrivacyItem
                        title="2. Definitions"
                        content={
                            <>
                                <p>In these Terms and Conditions:</p>
                                <ul>
                                    <li>
                                        <strong>"Emeralds Digital Ventures"</strong>, "we", "us", or "our" refers to Emeralds Digital Ventures,
                                        the provider of the Services
                                    </li>
                                    <li>
                                        <strong>"User"</strong>, "you", or "your" refers to any individual or entity accessing
                                        or using our Services
                                    </li>
                                    <li>
                                        <strong>"Content"</strong> refers to all courses, materials, videos, documents, text,
                                        images, audio, and other information provided through our Services
                                    </li>
                                    <li>
                                        <strong>"Account"</strong> refers to the user account created to access our Services
                                    </li>
                                    <li>
                                        <strong>"Flutterwave"</strong> refers to the third-party payment processor that we use
                                        to process payments for our Services
                                    </li>
                                </ul>
                            </>
                        }
                    />

                    <TermsPrivacyItem
                        title="3. Account Registration and Security"
                        content={
                            <>
                                <p>
                                    To access certain features of our Services, you may need to create an account. When
                                    creating an account, you agree to:
                                </p>
                                <ul>
                                    <li>Provide accurate, current, and complete information</li>
                                    <li>Maintain and update your information as necessary</li>
                                    <li>Keep your password confidential and secure</li>
                                    <li>Accept responsibility for all activities that occur under your account</li>
                                    <li>
                                        Notify us immediately of any unauthorized use of your account or any other breach
                                        of security
                                    </li>
                                </ul>
                                <p>
                                    We reserve the right to disable any user account if, in our opinion, you have violated
                                    any provision of these Terms and Conditions.
                                </p>
                            </>
                        }
                    />

                    <TermsPrivacyItem
                        title="4. Payment Terms and Flutterwave Compliance"
                        content={
                            <>
                                <p>
                                    All payments on our platform are processed securely through Flutterwave. By making a
                                    purchase, you agree to the following:
                                </p>
                                <ul>
                                    <li>
                                        To pay all fees and charges associated with your purchase at the prices in effect
                                        when the charges are incurred
                                    </li>
                                    <li>
                                        That all payment information you provide is accurate, complete, and you are authorized
                                        to use the payment method
                                    </li>
                                    <li>
                                        To be bound by Flutterwave's terms of service
                                        (<Link to="https://flutterwave.com/us/terms" target="_blank" rel="noopener noreferrer">
                                            https://flutterwave.com/us/terms
                                        </Link>)
                                    </li>
                                    <li>
                                        That all purchases of digital products are final and non-refundable, as outlined in
                                        our <Link to="/refund-policy">Refund Policy</Link>
                                    </li>
                                    <li>
                                        That we may share certain necessary personal information with Flutterwave for payment
                                        processing purposes
                                    </li>
                                </ul>
                                <p>
                                    <strong>Flutterwave Compliance Notice:</strong> Our business adheres to Flutterwave's Acceptable
                                    Use Policy. We do not engage in prohibited activities as defined by Flutterwave, including
                                    but not limited to offering illegal goods or services, infringing on intellectual property
                                    rights, or engaging in deceptive marketing practices.
                                </p>
                                <p>
                                    All transactions are monitored for fraud prevention purposes in compliance with Flutterwave's
                                    security requirements. We maintain records of all transactions as required by applicable
                                    financial regulations.
                                </p>
                            </>
                        }
                    />

                    <TermsPrivacyItem
                        title="5. Digital Content and Licensing"
                        content={
                            <>
                                <p>
                                    Upon successful payment, we grant you a non-exclusive, non-transferable, limited license to:
                                </p>
                                <ul>
                                    <li>
                                        Access and view the purchased course content for your personal, non-commercial use
                                    </li>
                                    <li>
                                        Use the materials within the course for your individual learning purposes
                                    </li>
                                </ul>
                                <p>
                                    <strong>You may not:</strong>
                                </p>
                                <ul>
                                    <li>Share your account credentials with others</li>
                                    <li>Copy, reproduce, redistribute, transmit, assign, sell, broadcast, rent, share, lend,
                                        modify, adapt, edit, create derivative works of, sublicense, or otherwise transfer
                                        the course content
                                    </li>
                                    <li>
                                        Use the content for any commercial purpose or for the training of other persons,
                                        artificial intelligence, or machine learning
                                    </li>
                                    <li>
                                        Remove any copyright or other proprietary notices from the materials
                                    </li>
                                </ul>
                                <p>
                                    Violation of these licensing terms may result in termination of your access to the
                                    content and legal action.
                                </p>
                            </>
                        }
                    />

                    <TermsPrivacyItem
                        title="6. Intellectual Property Rights"
                        content={
                            <>
                                <p>
                                    All content, features, and functionality on our Services, including but not limited to
                                    text, graphics, logos, icons, images, audio clips, digital downloads, data compilations,
                                    and software, are the exclusive property of Emeralds Digital Ventures or our licensors and are
                                    protected by international copyright, trademark, patent, trade secret, and other
                                    intellectual property laws.
                                </p>
                                <p>
                                    Our name, logo, and all related names, logos, product and service names, designs, and
                                    slogans are trademarks of Emeralds Digital Ventures or our affiliates. You must not use such
                                    marks without our prior written permission.
                                </p>
                                <p>
                                    Any feedback, comments, or suggestions you may provide regarding our Services is entirely
                                    voluntary, and we will be free to use such feedback, comments, or suggestions without any
                                    obligation to you.
                                </p>
                            </>
                        }
                    />

                    <TermsPrivacyItem
                        title="7. User Conduct and Prohibited Activities"
                        content={
                            <>
                                <p>
                                    When using our Services, you agree not to:
                                </p>
                                <ul>
                                    <li>
                                        Violate any applicable laws, regulations, or third-party rights
                                    </li>
                                    <li>
                                        Use our Services for any illegal or unauthorized purpose
                                    </li>
                                    <li>
                                        Attempt to interfere with, compromise the system integrity or security, or decipher
                                        any transmissions to or from the servers running our Services
                                    </li>
                                    <li>
                                        Upload or transmit viruses, malware, or other malicious code
                                    </li>
                                    <li>
                                        Engage in any activity that could disable, overburden, damage, or impair our Services
                                    </li>
                                    <li>
                                        Attempt to access any areas of our Services through any means other than the interfaces
                                        that we provide
                                    </li>
                                    <li>
                                        Use our Services for any purpose that is fraudulent, deceptive, or harmful
                                    </li>
                                </ul>
                                <p>
                                    We reserve the right to terminate or restrict your access to our Services for any violation
                                    of these terms or for any other reason at our sole discretion.
                                </p>
                            </>
                        }
                    />

                    <TermsPrivacyItem
                        title="8. Disclaimer of Warranties"
                        content={
                            <>
                                <p>
                                    YOUR USE OF OUR SERVICES IS AT YOUR SOLE RISK. OUR SERVICES ARE PROVIDED ON AN "AS IS"
                                    AND "AS AVAILABLE" BASIS. WE EXPRESSLY DISCLAIM ALL WARRANTIES OF ANY KIND, WHETHER
                                    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF MERCHANTABILITY,
                                    FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                                </p>
                                <p>
                                    WE DO NOT GUARANTEE THAT:
                                </p>
                                <ul>
                                    <li>
                                        OUR SERVICES WILL MEET YOUR REQUIREMENTS OR EXPECTATIONS
                                    </li>
                                    <li>
                                        OUR SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE
                                    </li>
                                    <li>
                                        THE RESULTS FROM USING OUR SERVICES WILL BE ACCURATE OR RELIABLE
                                    </li>
                                    <li>
                                        ANY ERRORS IN OUR SERVICES WILL BE CORRECTED
                                    </li>
                                </ul>
                                <p>
                                    EDUCATIONAL CONTENT DISCLAIMER: The information provided in our courses is for educational
                                    purposes only. We do not guarantee any specific results from following our courses. Business
                                    success depends on many factors, including your implementation of the concepts, market
                                    conditions, and individual circumstances.
                                </p>
                            </>
                        }
                    />

                    <TermsPrivacyItem
                        title="9. Limitation of Liability"
                        content={
                            <>
                                <p>
                                    TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, Emeralds Digital Ventures, ITS DIRECTORS,
                                    EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES SHALL NOT BE LIABLE FOR ANY
                                    INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT
                                    LIMITATION, LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM:
                                </p>
                                <ul>
                                    <li>
                                        YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE OUR SERVICES
                                    </li>
                                    <li>
                                        ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON OUR SERVICES
                                    </li>
                                    <li>
                                        ANY CONTENT OBTAINED FROM OUR SERVICES
                                    </li>
                                    <li>
                                        UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR TRANSMISSIONS OR CONTENT
                                    </li>
                                </ul>
                                <p>
                                    IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS EXCEED THE AMOUNT PAID BY
                                    YOU TO US FOR THE SERVICES DURING THE PAST TWELVE (12) MONTHS.
                                </p>
                            </>
                        }
                    />

                    <TermsPrivacyItem
                        title="10. Indemnification"
                        content={
                            <>
                                <p>
                                    You agree to defend, indemnify, and hold harmless Emeralds Digital Ventures, its directors,
                                    employees, partners, agents, suppliers, and affiliates from and against any claims,
                                    liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including
                                    reasonable attorneys' fees) arising out of or relating to:
                                </p>
                                <ul>
                                    <li>
                                        Your violation of these Terms and Conditions
                                    </li>
                                    <li>
                                        Your use of our Services
                                    </li>
                                    <li>
                                        Your violation of any rights of a third party
                                    </li>
                                    <li>
                                        Your violation of any applicable laws, rules, or regulations
                                    </li>
                                </ul>
                            </>
                        }
                    />

                    <TermsPrivacyItem
                        title="11. Governing Law and Dispute Resolution"
                        content={
                            <>
                                <p>
                                    These Terms and Conditions shall be governed by and construed in accordance with the
                                    laws of the jurisdiction in which Emeralds Digital Ventures is established, without regard to
                                    its conflict of law provisions.
                                </p>
                                <p>
                                    Any dispute arising from or relating to these Terms and Conditions or your use of our
                                    Services shall first be resolved through good-faith negotiations. If such negotiations
                                    fail, the dispute shall be submitted to binding arbitration in accordance with the rules
                                    of the American Arbitration Association, and judgment on the award rendered by the
                                    arbitrator(s) may be entered in any court having jurisdiction thereof.
                                </p>
                            </>
                        }
                    />

                    <TermsPrivacyItem
                        title="12. Modifications to Terms and Services"
                        content={
                            <>
                                <p>
                                    We reserve the right to modify or replace these Terms and Conditions at any time at our
                                    sole discretion. We will provide notice of any significant changes by posting the new
                                    Terms and Conditions on our website and updating the "Last Updated" date.
                                </p>
                                <p>
                                    Your continued use of our Services after any such changes constitutes your acceptance
                                    of the new Terms and Conditions. If you do not agree to the new terms, you must stop
                                    using our Services.
                                </p>
                                <p>
                                    We also reserve the right to modify, suspend, or discontinue our Services (or any part
                                    thereof) at any time with or without notice. We shall not be liable to you or any third
                                    party for any modification, suspension, or discontinuance of our Services.
                                </p>
                            </>
                        }
                    />

                    <TermsPrivacyItem
                        title="13. Severability and Waiver"
                        content={
                            <>
                                <p>
                                    If any provision of these Terms and Conditions is held to be invalid or unenforceable,
                                    such provision shall be struck and the remaining provisions shall be enforced to the
                                    fullest extent under law.
                                </p>
                                <p>
                                    Our failure to enforce any right or provision of these Terms and Conditions shall not
                                    be considered a waiver of such right or provision. The waiver of any such right or
                                    provision will be effective only if in writing and signed by a duly authorized
                                    representative of Emeralds Digital Ventures.
                                </p>
                            </>
                        }
                    />

                    <TermsPrivacyItem
                        title="14. Entire Agreement"
                        content={
                            <>
                                <p>
                                    These Terms and Conditions, together with our Privacy Policy and Refund Policy, constitute
                                    the entire agreement between you and Emeralds Digital Ventures regarding your use of our Services
                                    and supersede all prior and contemporaneous written or oral agreements between you and
                                    Emeralds Digital Ventures.
                                </p>
                                <p>
                                    Any rights not expressly granted herein are reserved.
                                </p>
                            </>
                        }
                    />

                    <TermsPrivacyItem
                        title="15. Contact Information"
                        content={
                            <>
                                <p>
                                    If you have any questions about these Terms and Conditions, please contact us:
                                </p>
                                <p>
                                    📱 <strong>Phone:</strong>{" "}
                                    <Link to={`tel:${contacts.phone}`}>{contacts.phone}</Link>
                                </p>
                                <p>
                                    📩 <strong>Email:</strong>{" "}
                                    <Link to={`mailto:${contacts.email}`}>{contacts.email}</Link>
                                </p>
                                <p>
                                    🌍 <strong>Website:</strong>{" "}
                                    <Link to={window.location.origin}>{window.location.hostname}</Link>
                                </p>
                                <p>
                                    📍 <strong>Address:</strong>{" "}{contacts.address}
                                </p>
                            </>
                        }
                    />
                </div>
            </main>
        </MainLayout>
    );
};

export default TermsConditionsPage;
