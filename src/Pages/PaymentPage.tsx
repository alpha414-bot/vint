import Spinner from "@/Components/Spinner";
import MainLayout, { defaultAccentColor } from "@/Layouts/MainLayout";
import { courses } from "@/System/courses";
import { backendEmailUrl, base64decode, contacts, deepClean, generateUid, price, sendEmail } from "@/System/function";
import classNames from "classnames";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import _ from "lodash";
import moment from "moment";
import { useCallback, useEffect, useMemo, useState } from "react";
import { FaLock } from "react-icons/fa";
import { FaArrowLeftLong } from "react-icons/fa6";
import { usePaystackPayment } from "react-paystack";
import { Link, useSearchParams } from "react-router-dom";

interface MetadataInterface {
    [key: string]: any;
    accentColor: string;
    gateway: string;
    amount: string;
    appName: string;
    support: string;
}
const DEBUG = false;
const PaymentPage = () => {
    const [searchParams] = useSearchParams();
    const [initializeGateway, setInitializeGateway] = useState<boolean>(false);
    const [loading, setLoading] = useState<{ status: boolean, text: string }>({ status: false, text: "" });
    const [redirectCountdown, setRedirectCountdown] = useState<number>(5);
    const [paymentStatus, setPaymentStatus] = useState<{
        status: "success" | "failed" | "pending"
        reference?: string | null
    }>({ status: "pending" });

    const data: {
        _c: any, _p: any[], _m: MetadataInterface
    } = useMemo(() => {
        return Array.from(searchParams.entries()).map(([key, value]) => {
            if (["_c", "_p", "_m"].includes(key)) {
                const sr_value = JSON.parse(base64decode(decodeURIComponent(value)));
                if (["_c"].includes(key)) {
                    return { [key]: deepClean({ ...sr_value, ...{ reference: sr_value?.reference ? `${(Math.random() + 8).toString(9)}` : null, tx_ref: sr_value?.tx_ref ? `${(Math.random() + 8).toString(9)}` : null } }) };
                }
                if (["_m"].includes(key)) {
                    return { [key]: deepClean({ ...sr_value, ...{ accentColor: sr_value?.accentColor ? sr_value.accentColor : defaultAccentColor, logoBgColor: sr_value?.logoBgColor ? sr_value.logoBgColor : "black" } }) };
                }
                return { [key]: deepClean(sr_value) }
            }
            return { [key]: deepClean(value) };
        }).reduce((acc, curr) => ({ ...acc, ...curr }), {}) as any;
    }, [searchParams]);

    const setLoadingState = (next: { status: boolean; text: string }) =>
        setLoading(prev => {
            if (prev.status === next.status && prev.text === next.text) return prev;
            return next;
        });


    const payWithPaystack = usePaystackPayment(data?._c);
    const payWithFlutterwave = useFlutterwave(data?._c);

    const pay = useCallback(() => {
        const handleSuccess = (ref: any) => {
            setLoadingState({ status: true, text: "Please wait, Processing payment...<br/> Do not close window or reload.." })
            const token = generateUid(ref);
            const couponCode = token.replace(/-/g, "").substring(0, 6).toUpperCase();
            // Share bonus course to email
            const bonusCourse = _.sample(courses);
            const downloadUrl = new URL(bonusCourse?.downloadable, window.location.origin)
            const supportLink = decodeURIComponent(data?._m?.support).replace("{{message}}", encodeURIComponent(`Hello Support, I have successfully made payment for *${_.upperFirst(data?._m?.appName)} ${data?._m?.activePlanTitle}(NGN${data?._m?.amount})*. Here is my reference invoice number: ${ref
                } and my email is ${data?._m?.email}.`));
            // Send Email Notification
            sendEmail(backendEmailUrl.toString(), {
                _to: data?._m?.email,
                recipients: [contacts.email],
                subject: `${_.upperFirst(data?._m?.appName)} - Payment Invoice & Receipt`,
                name: `${data?._m?.firstname} ${data?._m?.lastname}`,
                reference: ref,
                paid_date: moment().format("Do MMMM YYYY"), // e.g., 25th December 2023
                site_accent_color: data?._m?.accentColor,
                site_name: _.upperFirst(data?._m?.appName),
                site_logo: data?._m?.app?.logo,
                site_logo_bg_color: data?._m?.logoBgColor,
                site_url: data?._m?.app?.domain,
                coupon_code: couponCode,
                contact_support: supportLink,
                web_view: true,
                bonus_pdf_url: downloadUrl.toString(),
                total: Number(data?._m?.amount),
                items: [
                    {
                        description: data?._m?.activePlanTitle,
                        qty: 1,
                        unit_price: Number(data?._m?.amount),
                        total: Number(data?._m?.amount),
                    }, {
                        description: (bonusCourse?.name) || "Free Course PDF",
                        qty: 1,
                        unit_price: '0',
                        total: '0',
                    }]
            }).then((res) => {
                console.log("Email sent successfully:", res);
                if (res == "ok") {
                    // 
                    // Redirect to support after 5 seconds
                    setLoadingState({ status: false, text: "" });
                    setPaymentStatus({
                        status: "success",
                        reference: ref
                    });
                    let countdown = 5;
                    const interval = setInterval(() => {
                        countdown -= 1;
                        setRedirectCountdown(countdown);
                        if (countdown <= 0) {
                            clearInterval(interval);
                            if (!DEBUG) {
                                console.log("Redirecting to support...");
                                window.location.replace(supportLink);
                            }
                        }
                    }, 1000);
                }
            }).catch((err) => {
                setLoadingState({ status: false, text: "" });
                setPaymentStatus({
                    status: "success",
                    reference: ref
                });
                window.alert("An error occurred while sending invoice. Please contact support.");
                console.error("Error sending email:", err);
            });
        }
        if (data?._m?.gateway === 'paystack') {
            payWithPaystack({
                onSuccess: (response: any) => {
                    if (response.status == "success") {
                        handleSuccess(response.reference);
                    }
                },
                onClose: () => {
                }
            });
        } else if (data?._m?.gateway === 'flutterwave') {
            payWithFlutterwave({
                callback: (response: any) => {
                    if (response.status === 'completed') {
                        setTimeout(() => {
                            closePaymentModal();
                        }, 2000); // wait for modal to close
                        handleSuccess(response.tx_ref);
                    }
                },
                onClose: () => {
                    closePaymentModal();
                }
            });
        }

    }, [data, payWithFlutterwave, payWithPaystack]);

    const close = useCallback(() => {
        if (window.confirm("Are you sure you want to cancel the payment and go back?")) {
            window.open(`${new URL("register", data?._m?.app?.domain).toString()}`, "_self");
        }
    }, [data]);

    useEffect(() => {
        if (initializeGateway || paymentStatus.status != "pending") return;
        setLoadingState({ status: true, text: "Initializing..." });
        setTimeout(() => {
            setLoadingState({ status: false, text: "" });
            if (!DEBUG) {
                pay();
            }
            setInitializeGateway(true);
        }, 2500); // wait before removing overlay

    }, [data, initializeGateway, pay, paymentStatus]);

    useEffect(() => {
        // Define the event handler function once
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            // Standard way to show a confirmation message
            e.preventDefault();
            e.returnValue = 'Are you sure you want to leave? Your changes may not be saved.';
        };


        if (paymentStatus.status === "pending") {
            window.addEventListener('beforeunload', handleBeforeUnload);
        } else {
            // Pass the exact same function reference to remove it
            window.removeEventListener('beforeunload', handleBeforeUnload);
        }

        // Cleanup function: this runs when the component unmounts OR before the effect runs again
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };

    }, [paymentStatus]);

    return (
        <MainLayout title="Payment Checkout" no_navbar no_footer accent_color={data?._m?.accentColor}>
            <div className={classNames("p-4 md:p-6 lg:p-8 relative w-full h-screen overflow-y-auto flex flex-col gap-6 bg-gray-100 text-gray-900", {
                "items-center justify-center": paymentStatus.status !== 'pending'
            })}>
                {
                    paymentStatus.status === 'pending' ? (
                        <div className="w-full max-w-md flex flex-col items-end h-full justify-between md:justify-start pb-20 gap-4 mx-auto">
                            <div className="flex items-center justify-center w-full gap-2 text-sm text-gray-500 font-medium">
                             <FaLock /> Secure SSL Encrypted Payment
                            </div>
                            <button onClick={() => {
                                // go back one index  in history
                                close()
                            }} className="py-2 lg:mt-4 px-4 gap-2 text-sm rounded-full font-medium bg-white/80 hover:bg-white shadow-md inline-flex items-center justify-center " style={{ border: `2px solid ${data?._m?.accentColor}` }}>
                              <FaArrowLeftLong className="w-5 h-5" style={{color:data?._m?.accentColor}}/>
                                <span>Go Back</span>
                            </button>
                            <div className="space-y-6 w-full">
                              <div className="flex items-start justify-start gap-4">
                                  <img src={data?._m?.app?.logo} className={classNames("w-20 h-20 object-contain object-center rounded-md p-0.5")} style={{ backgroundColor: data?._m?.logoBgColor }} />
                                  <div>
                                      <h1 className="text-4xl font-bold">Checkout</h1>
                                      <p>Pay securely for {_.upperFirst(data?._m?.appName)}. </p>
                                  </div>
                              </div>
                              <div className="space-y-4">
                                <input type="text" placeholder="Enter Amount" className="input-checkout !text-gray-800 font-bold" value={`${data?._m?.activePlanTitle} for ${_.upperFirst(data?._m?.appName)} @ ${price(data?._m?.amount)}`} disabled name="amount" />
                                <input type="text" placeholder="Enter first name" className="input-checkout" value={data?._m?.firstname} disabled name="firstname" />
                                <input type="text" placeholder="Enter last name" className="input-checkout" value={data?._m?.lastname} disabled name="lastname" />
                                <input type="text" placeholder="Enter email address" className="input-checkout" value={data?._m?.email} disabled name="email" />
                              </div>
                            </div>
                            
                            <div className="w-full flex justify-center my-0 lg:my-4">
                                <button onClick={() => {
                                    pay();
                                }} className="text-base py-3.5 text-white px-6 font-bold rounded-md shadow-lg flex items-center gap-1" style={{ backgroundColor: data?._m?.accentColor }}>
                                    Pay {price(data?._m?.amount)}
                                </button>
                            </div>
                            <div className="text-base w-full lg:text-lg text-center space-x-2 flex flex-col items-center gap-1 md:pb-8 font-medium">
                                <span>If You Need more Explanation on {_.upperFirst(data?._m?.appName)}, or You have Any Issue with Making Payment, contact support by clicking on the below button</span>
                                <Link target="_blank" to={decodeURIComponent(data?._m?.support).replace("{{message}}", encodeURIComponent(`Hello Agent, I have issue with making the final payment process for *${_.upperFirst(data?._m?.appName)} ${data?._m?.activePlanTitle}(NGN${data?._m?.amount})*. How can your help me out here?`))} className="inline-flex gap-0.5 items-center bg-emerald-500/25 underline underline-offset-2 text-sm py-1 text-gray-800 font-semibold px-2 rounded-md"> <svg className="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2a7 7 0 0 0-7 7 3 3 0 0 0-3 3v2a3 3 0 0 0 3 3h1a1 1 0 0 0 1-1V9a5 5 0 1 1 10 0v7.083A2.919 2.919 0 0 1 14.083 19H14a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h1a2 2 0 0 0 1.732-1h.351a4.917 4.917 0 0 0 4.83-4H19a3 3 0 0 0 3-3v-2a3 3 0 0 0-3-3 7 7 0 0 0-7-7Zm1.45 3.275a4 4 0 0 0-4.352.976 1 1 0 0 0 1.452 1.376 2.001 2.001 0 0 1 2.836-.067 1 1 0 1 0 1.386-1.442 4 4 0 0 0-1.321-.843Z" clipRule="evenodd" />
                                </svg>
                                    Contact Support</Link>
                            </div>

                            
                        </div>

                    ) : paymentStatus.status === 'success' ? (
                        <div className="text-center space-y-4 w-full max-w-md mx-auto">
                            <h1 className="text-4xl font-bold text-green-600">Payment Successful!</h1>
                            <p className="text-lg">Thank you for your payment. An email confirmation has been sent to your registered email address containing instructions and your coupon code. Your transaction reference is:</p>
                            <div className="relative">
                                <pre className="bg-gray-200 p-4 rounded-md text-left break-all">{paymentStatus.reference}</pre>
                                <button type="button" className="absolute top-0 right-0 bottom-0 px-4" onClick={() => {
                                    navigator.clipboard.writeText(paymentStatus.reference || "");
                                    alert("Reference copied to clipboard!");
                                }}>
                                    <svg className="w-6 h-6 text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path fillRule="evenodd" d="M8 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1h2a2 2 0 0 1 2 2v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2Zm6 1h-4v2H9a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2h-1V4Zm-6 8a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H9a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H9Z" clipRule="evenodd" />
                                    </svg>

                                </button>
                            </div>
                            <p className="text-lg">Click on the button below to contact support in order to use or get your coupon code. You would redirected to this page in the next {redirectCountdown} seconds.</p>
                            <button onClick={() => {
                                const supportLink = decodeURIComponent(data?._m?.support).replace("{{message}}", encodeURIComponent(`Hello Support, I have successfully made payment for *${_.upperFirst(data?._m?.appName)} ${data?._m?.activePlanTitle}(NGN${data?._m?.amount})*. Here is my reference invoice number: ${paymentStatus.reference
                                    } and my email is ${data?._m?.email}.`));
                                window.location.replace(supportLink);
                            }} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Contact Support</button>
                        </div>
                    ) : paymentStatus.status === 'failed' ? (
                        <div className="text-center space-y-4">
                            <h1 className="text-4xl font-bold text-red-600">Payment Failed!</h1>
                            <p className="text-lg">Unfortunately, your payment could not be processed. Please try again.</p>
                            <button onClick={() => {
                                // go back one index  in history
                                close();
                            }} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Go Back</button>
                        </div>
                    ) : (
                        <div className="text-center space-y-4">
                            <h1 className="text-4xl font-bold">Processing Payment...</h1>
                            <p className="text-lg">Please wait while we process your payment.</p>
                        </div>
                    )
                }
                {
                    loading.status && (
                        <div className="fixed inset-0 z-50 bg-gray-900/70 flex items-center justify-center" >
                            <Spinner className="w-12 h-12" accentColor={data?._m?.accentColor} text={loading.text} />
                        </div>
                    )
                }

                {
                    DEBUG && (
                        <div className="hidde">
                            <pre>{JSON.stringify(data, null, 6)}</pre>
                        </div>
                    )
                }
            </div>
        </MainLayout>
    )
}

export default PaymentPage
