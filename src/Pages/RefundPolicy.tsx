import { TermsPrivacyItem } from "@/Components/Footer";
import MainLayout from "@/Layouts/MainLayout";
import { contacts } from "@/System/function";
import { Link } from "react-router-dom";

const RefundPolicyPage = () => {
    return (
        <MainLayout title="Refund Policy" description="Learn about our refund policy for digital courses">
            <main>
                <div className="mx-auto max-w-7xl space-y-8 px-6 py-16 text-gray-900">
                    <div className="space-y-2">
                        <h1 className="text-center text-5xl font-bold">
                            Refund Policy
                        </h1>
                        <p className="mb-0 text-center">
                            <strong>Effective Date:</strong> 30th August 2025
                        </p>
                        <p className="text-center">
                            <strong>Last updated:</strong> 30th August 2025
                        </p>
                    </div>

                    <TermsPrivacyItem
                        title="1. Introduction"
                        content={
                            <>
                                <p>
                                    Thank you for choosing Pretium Concept for your ecommerce education needs.
                                    This Refund Policy outlines our guidelines regarding refunds for our digital
                                    courses and educational content.
                                </p>
                                <p>
                                    By purchasing and accessing our digital courses, you acknowledge that you have
                                    read, understood, and agree to be bound by this Refund Policy. If you do not
                                    agree with any part of this policy, please do not purchase our courses.
                                </p>
                            </>
                        }
                    />

                    <TermsPrivacyItem
                        title="2. No-Refund Policy for Digital Products"
                        content={
                            <>
                                <p>
                                    <strong>Pretium Concept has a strict no-refund policy for all digital courses and educational content.</strong>
                                    Once a purchase is made and you gain access to our digital content, no refunds will be issued.
                                </p>
                                <p>
                                    This no-refund policy is based on the following factors:
                                </p>
                                <ul>
                                    <li>
                                        <strong>Immediate Digital Delivery:</strong> Our courses are digital products that are delivered
                                        immediately upon successful payment
                                    </li>
                                    <li>
                                        <strong>Instant Access:</strong> You receive immediate access to course materials, videos,
                                        downloadable resources, and other educational content
                                    </li>
                                    <li>
                                        <strong>Non-Returnable Nature:</strong> Digital products cannot be "returned" once accessed,
                                        as they can be copied, downloaded, or consumed
                                    </li>
                                    <li>
                                        <strong>Intellectual Property Protection:</strong> Our courses contain proprietary content
                                        and intellectual property that cannot be recalled once accessed
                                    </li>
                                </ul>
                                <p>
                                    We provide detailed course descriptions, learning objectives, and curriculum information
                                    before purchase to help you make informed decisions about our courses.
                                </p>
                            </>
                        }
                    />

                    <TermsPrivacyItem
                        title="3. Exceptions to the No-Refund Policy"
                        content={
                            <>
                                <p>
                                    While we maintain a strict no-refund policy, we may consider exceptions in the following limited circumstances:
                                </p>
                                <ul>
                                    <li>
                                        <strong>Technical Failure:</strong> If you are unable to access the course due to a verified
                                        technical failure on our part, and our technical team cannot resolve the issue within
                                        7 business days
                                    </li>
                                    <li>
                                        <strong>Duplicate Purchase:</strong> If you accidentally purchased the same course twice
                                        within 24 hours and have not accessed the duplicate course
                                    </li>
                                    <li>
                                        <strong>Course Unavailability:</strong> If a course becomes permanently unavailable within
                                        30 days of purchase and before you've completed at least 50% of the content
                                    </li>
                                </ul>
                                <p>
                                    For any of these exceptional circumstances, please contact us at{" "}
                                    <Link to={`mailto:${contacts.email}`}>{contacts.email}</Link> within
                                    3 business days of the purchase or incident. Each request will be evaluated on a
                                    case-by-case basis.
                                </p>
                            </>
                        }
                    />

                    <TermsPrivacyItem
                        title="4. Flutterwave Payment Compliance"
                        content={
                            <>
                                <p>
                                    Pretium Concept uses Flutterwave as our payment processor, and our refund policy
                                    is in compliance with Flutterwave's merchant terms of service regarding digital goods:
                                </p>
                                <ul>
                                    <li>
                                        We clearly disclose our no-refund policy for digital products before the purchase is completed
                                    </li>
                                    <li>
                                        We provide detailed descriptions of our courses and what customers will receive
                                    </li>
                                    <li>
                                        We maintain accurate records of all transactions and customer communications
                                    </li>
                                    <li>
                                        We address customer complaints and disputes in accordance with Flutterwave's
                                        dispute resolution requirements
                                    </li>
                                </ul>
                                <p>
                                    By making a purchase on our platform through Flutterwave, you acknowledge that you understand
                                    and agree to our no-refund policy for digital products in accordance with Flutterwave's
                                    terms of service.
                                </p>
                                <p>
                                    For information about Flutterwave's payment policies, please refer to{" "}
                                    <Link to="https://flutterwave.com/us/legal/terms" target="_blank" rel="noopener noreferrer">
                                        Flutterwave's Terms of Service
                                    </Link>.
                                </p>
                            </>
                        }
                    />

                    <TermsPrivacyItem
                        title="5. Pre-Purchase Considerations"
                        content={
                            <>
                                <p>
                                    Before purchasing any course, we strongly encourage you to:
                                </p>
                                <ul>
                                    <li>
                                        Carefully review the course description, curriculum, and learning objectives
                                    </li>
                                    <li>
                                        Ensure your device and internet connection meet the technical requirements for accessing our courses
                                    </li>
                                    <li>
                                        Consider your availability and commitment to complete the course
                                    </li>
                                    <li>
                                        Contact us with any questions about course content or suitability before making a purchase
                                    </li>
                                </ul>
                                <p>
                                    If you have any questions about a course before purchasing, please contact our customer
                                    support team at{" "}
                                    <Link to={`mailto:${contacts.email}`}>{contacts.email}</Link> for assistance.
                                </p>
                            </>
                        }
                    />

                    <TermsPrivacyItem
                        title="6. Course Access and Duration"
                        content={
                            <>
                                <p>
                                    When you purchase a course from Pretium Concept:
                                </p>
                                <ul>
                                    <li>
                                        You receive the access period specified in the course description (lifetime access,
                                        annual access, etc.)
                                    </li>
                                    <li>
                                        Your access begins immediately upon successful payment processing
                                    </li>
                                    <li>
                                        The course remains available to you according to the access period, even if you
                                        do not immediately begin or complete the course
                                    </li>
                                </ul>
                                <p>
                                    The no-refund policy applies regardless of whether or how much of the course content
                                    you have consumed or completed.
                                </p>
                            </>
                        }
                    />

                    <TermsPrivacyItem
                        title="7. Customer Satisfaction"
                        content={
                            <>
                                <p>
                                    While we do not offer refunds, we are committed to customer satisfaction and the quality
                                    of our educational content. If you experience issues with a course you've purchased:
                                </p>
                                <ul>
                                    <li>
                                        For technical issues, please contact our support team for assistance
                                    </li>
                                    <li>
                                        For questions about course content, you can use our Q&A features or contact your instructor
                                    </li>
                                    <li>
                                        For feedback about the course quality, we welcome your constructive suggestions for improvement
                                    </li>
                                </ul>
                                <p>
                                    We continuously update and improve our courses based on student feedback.
                                </p>
                            </>
                        }
                    />

                    <TermsPrivacyItem
                        title="8. Changes to This Refund Policy"
                        content={
                            <>
                                <p>
                                    We may update our Refund Policy from time to time. Changes will be effective when posted on this page
                                    with a revised effective date. We encourage you to review this Refund Policy periodically
                                    for any changes.
                                </p>
                                <p>
                                    Any changes to our Refund Policy will only apply to purchases made after the effective date of the change.
                                </p>
                            </>
                        }
                    />

                    <TermsPrivacyItem
                        title="9. Contact Us"
                        content={
                            <>
                                <p>
                                    If you have any questions about our Refund Policy, please contact us:
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

export default RefundPolicyPage;
