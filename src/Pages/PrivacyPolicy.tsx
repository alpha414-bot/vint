import { TermsPrivacyItem } from "@/Components/Footer";
import MainLayout from "@/Layouts/MainLayout";
import { contacts } from "@/System/function";
import _ from "lodash";
import { Link } from "react-router-dom";

const PrivacyPolicyPage = () => {
    return (
        <MainLayout title="Privacy Policy" description="Learn about our privacy practices and how we protect your information.">
            <main>
                <div className="mx-auto max-w-7xl space-y-8 px-6 py-16 text-gray-900">
                    <div className="space-y-2">
                        <h1 className="text-center text-5xl font-bold">
                            Privacy Policy
                        </h1>
                        <p className="mb-0 text-center">
                            <strong>Effective Date:</strong> 30th August 2025
                        </p>
                        <p className=" text-center">
                            <strong>Last updated:</strong> 30th August 2025
                        </p>
                    </div>

                    <TermsPrivacyItem
                        title="1. Introduction"
                        content={
                            <>
                                <p>
                                    Welcome to Pretium Concept! Your privacy is important to us. This
                                    Privacy Policy explains how we collect, use, store, and
                                    protect your information when you use our website, online courses,
                                    and related services.
                                </p>
                                <p>
                                    By using Pretium Concept, you agree to this Privacy Policy. If you do
                                    not agree, please discontinue the use of our services.
                                </p>
                                <h3 className="text-xl font-bold">Who We Are</h3>
                                <p>
                                    Pretium Concept ("we," "us," or "our") is the entity responsible for
                                    collecting and processing your data. We are a modern platform for mastering
                                    ecommerce through expert-led courses. If you have any
                                    questions, contact us at{" "}
                                    <Link to={`mailto:${contacts.email}`}>{contacts.email}</Link>.
                                    We comply with applicable data protection laws and regulations.
                                </p>
                            </>
                        }
                    />
                    <TermsPrivacyItem
                        title={"2. Information We Collect"}
                        content={
                            <>
                                <p>
                                    We collect information to provide and improve our educational services.
                                    This includes:
                                </p>

                                <h3>A. Personal Information (Required for Account Creation)</h3>
                                <ul>
                                    <li>Full Name (First & Last Name)</li>
                                    <li>Email Address</li>
                                    <li>Phone Number (optional)</li>
                                    <li>Password</li>
                                </ul>
                                <h3>B. Financial Information (For Course Purchases Only)</h3>
                                <ul>
                                    <li>Purchase history and transaction records</li>
                                    <li>
                                        Payment information (processed securely via Flutterwave)
                                    </li>
                                </ul>

                                <h3>C. Educational Data</h3>
                                <ul>
                                    <li>
                                        <strong>Course Listing</strong>: includes several courses ranging on different concept(s).
                                    </li>
                                    <li>
                                        <strong>Engagement metrics</strong>: including course interactions,
                                        downloads, and resource access
                                    </li>
                                </ul>

                                <h3>D. Usage Data (For Website Improvement)</h3>
                                <ul>
                                    <li>
                                        <strong>Website usage analytics</strong>: including page visits,
                                        feature usage, session duration, and navigation patterns
                                    </li>
                                    <li>
                                        <strong>Technical information</strong>: including browser type,
                                        IP address, and device information
                                    </li>
                                    <li>
                                        <strong>
                                            Security verification data via Firebase
                                        </strong>
                                    </li>
                                </ul>
                                <h3>E. Cookies & Tracking Data</h3>
                                <ul>
                                    <li>
                                        We use cookies and analytics tools (Google Analytics and
                                        Firebase Analytics) to improve user experience and course delivery
                                    </li>
                                    <li>
                                        You can opt-out of analytics tracking in your account settings
                                    </li>
                                    <li>
                                        We use cookies for session management, user preferences, and
                                        analytics. You can manage cookie preferences in your browser
                                        settings
                                    </li>
                                </ul>
                            </>
                        }
                    />
                    <TermsPrivacyItem
                        title={"3. How We Use Your Information"}
                        content={
                            <>
                                <p>
                                    We use your data for the following purposes, based on the
                                    legal basis of contract performance (for account and
                                    course processing), legitimate interests (for website
                                    improvement and security), and consent (for optional
                                    analytics):
                                </p>

                                <ul>
                                    <li>
                                        <strong>Account Management:</strong> To create and maintain your account,
                                        verify your identity, and provide access to purchased courses
                                    </li>
                                    <li>
                                        <strong>Course Delivery:</strong> To deliver educational content,
                                        track progress, and provide certificates of completion
                                    </li>
                                    <li>
                                        <strong>Transactions:</strong> To process course purchases, manage
                                        orders, and provide receipts
                                    </li>
                                    <li>
                                        <strong>Website Performance & Analytics:</strong> To monitor website
                                        performance, optimize course delivery, and improve our services
                                    </li>
                                    <li>
                                        <strong>Customer Support:</strong> To assist with
                                        technical issues, answer questions about courses, and provide support
                                    </li>
                                    <li>
                                        <strong>Communication:</strong> To send important updates about
                                        courses, new offerings, and relevant educational content
                                    </li>
                                </ul>

                                <p>
                                    We DO NOT sell or rent your personal information, nor do we
                                    share it with third parties for marketing purposes without your explicit consent.
                                </p>
                            </>
                        }
                    />
                    <TermsPrivacyItem
                        title={"4. Third-Party Services"}
                        content={
                            <>
                                <p>
                                    We integrate with trusted third-party services to operate
                                    our educational platform efficiently:
                                </p>
                                <h3>A. Firebase (Google Services)</h3>
                                <ul>
                                    <li>Authentication (Email, Google & Social login)</li>
                                    <li>Cloud Firestore (Database & Storage for course content)</li>
                                    <li>Analytics (Website usage tracking)</li>
                                    <li>Firebase security services</li>
                                </ul>

                                <h3>B. Flutterwave (Payment Processing)</h3>
                                <p>
                                    Course payments and transactions are handled securely by Flutterwave.
                                    When you make a purchase, you will be redirected to Flutterwave's
                                    secure payment platform. We do not store your complete payment information.
                                    By using our services, you agree to Flutterwave's terms of service and
                                    privacy policy.
                                </p>

                                <h3>C. Learning Management System</h3>
                                <p>
                                    Our courses are delivered through our learning platform. Your course progress and engagement data are
                                    processed in this system to provide you with a seamless learning experience.
                                </p>

                                <p>
                                    Your data is only shared with these third parties as necessary to provide
                                    our services. We ensure these third parties adhere to appropriate data
                                    protection standards and process your data in accordance with our instructions.
                                </p>
                            </>
                        }
                    />
                    <TermsPrivacyItem
                        title={"5. Data Protection & Security"}
                        content={
                            <>
                                <p>We prioritize the security of your data using:</p>
                                <ul>
                                    <li>Secure connections (HTTPS/SSL) for all website interactions</li>
                                    <li>Industry-standard encryption for sensitive information</li>
                                    <li>Regular security audits and updates</li>
                                    <li>Access controls and authentication measures</li>
                                    <li>Secure data storage and processing practices</li>
                                </ul>

                                <p>
                                    We DO NOT store complete payment card details. Course purchases are
                                    processed securely through Flutterwave, which maintains PCI DSS compliance
                                    for handling payment information. When you make a payment, you are
                                    redirected to Flutterwave's secure payment gateway.
                                </p>

                                <p>
                                    While we implement strong security measures, no method of electronic
                                    transmission or storage is 100% secure. We strive to protect your
                                    personal information but cannot guarantee absolute security.
                                </p>
                            </>
                        }
                    />
                    <TermsPrivacyItem
                        title={"6. Data Retention Policy"}
                        content={
                            <>
                                <ul>
                                    <li>
                                        We retain your account data as long as your account is active
                                        or as needed to provide you with our services.
                                    </li>
                                    <li>
                                        Course progress and completion data are retained to maintain
                                        your educational records and provide certificates.
                                    </li>
                                    <li>
                                        Inactive accounts (no activity for 24 months) may be
                                        archived or deleted.
                                    </li>
                                    <li>
                                        You can request account deletion at any time by contacting us at{" "}
                                        <Link to={`mailto:${contacts.email}`}>{contacts.email}</Link>.
                                    </li>
                                    <li>
                                        We retain financial transaction records as required by applicable
                                        laws and regulations, and for legitimate business purposes such as
                                        accounting, record keeping, and fraud prevention.
                                    </li>
                                    <li>
                                        Website analytics data is retained for up to 26 months to analyze
                                        trends and improve our services.
                                    </li>
                                </ul>
                            </>
                        }
                    />
                    <TermsPrivacyItem
                        title={"7. User Rights & Control"}
                        content={
                            <>
                                <p>As a user of our educational platform, you have the right to:</p>
                                <ul>
                                    <li>Access your personal data that we hold</li>
                                    <li>Request correction of inaccurate or incomplete data</li>
                                    <li>Request deletion of your account and personal data</li>
                                    <li>
                                        Restrict or object to certain types of data processing
                                    </li>
                                    <li>
                                        Request a copy of your data in a structured, commonly used,
                                        and machine-readable format
                                    </li>
                                    <li>
                                        Withdraw consent for optional data processing at any time
                                    </li>
                                </ul>

                                <p>
                                    Please note that some of these rights may be limited where we have
                                    compelling legitimate grounds to process your information or where
                                    we are required to retain certain records for legal or compliance purposes.
                                </p>

                                <p>
                                    To exercise any of these rights, please contact us at{" "}
                                    <Link to={`mailto:${contacts.email}`}>{contacts.email}</Link>.
                                    We will respond to your request within 30 days.
                                </p>
                            </>
                        }
                    />
                    <TermsPrivacyItem
                        title={"8. Cookies & Tracking"}
                        content={
                            <>
                                <p>
                                    Our website uses cookies and similar technologies to enhance your
                                    learning experience and provide certain features:
                                </p>
                                <ul>
                                    <li>
                                        <strong>Essential cookies:</strong> Required for the website to function
                                        properly, including authentication and session management
                                    </li>
                                    <li>
                                        <strong>Functional cookies:</strong> Remember your preferences and settings
                                        to enhance your experience
                                    </li>
                                    <li>
                                        <strong>Analytics cookies:</strong> Help us understand how you use our website
                                        to improve our services and course delivery
                                    </li>
                                </ul>
                                <p>
                                    We use Google Analytics and Firebase Analytics to collect anonymous
                                    usage data. You can opt out of analytics tracking in your account settings
                                    or by adjusting your browser settings. Most web browsers allow you to
                                    control cookies through your browser settings.
                                </p>
                                <p>
                                    Please note that disabling certain cookies may affect the functionality
                                    of our website and your ability to access some features of our courses.
                                </p>
                            </>
                        }
                    />
                    <TermsPrivacyItem
                        title={"9. Compliance with Flutterwave Terms"}
                        content={
                            <>
                                <p>
                                    We use Flutterwave as our payment processor. When you make a purchase
                                    on our platform:
                                </p>
                                <ul>
                                    <li>
                                        Your payment information is processed directly by Flutterwave's
                                        secure payment gateway
                                    </li>
                                    <li>
                                        We adhere to Flutterwave's Acceptable Use Policy and Terms of Service
                                    </li>
                                    <li>
                                        Flutterwave may collect additional information from you during the
                                        payment process according to their privacy policy
                                    </li>
                                    <li>
                                        Transactions through Flutterwave are subject to their fraud monitoring
                                        and security protocols
                                    </li>
                                </ul>
                                <p>
                                    By making purchases on our platform, you agree to comply with Flutterwave's
                                    terms and conditions. For more information, please review the
                                    <Link to="https://flutterwave.com/us/legal/terms" target="_blank" rel="noopener noreferrer" className="mx-1">
                                        Flutterwave Terms of Service
                                    </Link>
                                    and
                                    <Link to="https://flutterwave.com/us/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="mx-1">
                                        Privacy Policy
                                    </Link>.
                                </p>
                            </>
                        }
                    />
                    <TermsPrivacyItem
                        title={"10. Changes to This Privacy Policy"}
                        content={
                            <>
                                <p>
                                    We may update this Privacy Policy from time to time to reflect changes
                                    in our practices, technologies, legal requirements, or other factors.
                                    When we make significant changes, we will:
                                </p>
                                <ul>
                                    <li>Post the updated policy on our website</li>
                                    <li>Update the "Last Updated" date at the top of this policy</li>
                                    <li>
                                        Notify you via email or through a notice on our website for
                                        material changes
                                    </li>
                                </ul>
                                <p>
                                    We encourage you to review this policy periodically to stay informed
                                    about how we protect your information. Your continued use of our
                                    services after any changes indicate your acceptance of the updated
                                    Privacy Policy.
                                </p>
                            </>
                        }
                    />
                    <TermsPrivacyItem
                        title={"11. Contact Us"}
                        content={
                            <>
                                <p>If you have any questions or concerns about this Privacy Policy or our data practices, please contact us:</p>
                                <p>
                                    📱 <strong>Phone:</strong>{" "}
                                    <Link to={`tel:+${_.replace(contacts.phone, /[\s\W]+/g, "")}`}>{contacts.phone}</Link>
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
                                    📍 <strong>Address:</strong>{" "}
                                    {contacts.address}
                                </p>
                                <p className="mt-4">
                                    We will respond to your inquiry within 5 business days.
                                </p>
                            </>
                        }
                    />
                </div>
            </main>
        </MainLayout>
    );
};

export default PrivacyPolicyPage;
