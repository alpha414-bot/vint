"use client";
import _ from "lodash";
import {
    createContext,
    forwardRef,
    JSX,
    useContext,
    useEffect,
    useState,
} from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";


interface GatewayContext {
    bankInfo: {
        account_name?: string;
        account_number?: string;
        bank_name?: string;
        amount: number;
    };
    // onSuccess?: onSuccessType;
    // onClose: () => void;
}

interface GatewayJSXInterface extends GatewayContext {
    children: JSX.Element;
}

interface GatewayConsumerInterface extends GatewayContext {
    children: (arg: Record<string, any>) => any;
}

const GatewayContext = createContext<GatewayContext>({} as GatewayContext);

const GatewayProvider = (props: GatewayJSXInterface): JSX.Element => {
    return (
        <GatewayContext.Provider
            value={props}
        >
            {props.children}
        </GatewayContext.Provider>
    );
};

const GatewayConsumerChild = ({
    children,
    ref,
}: {
    children: any;
    ref: any;
}): JSX.Element => {
    // Modal state for manual payment popup
    const [showBankModal, setShowBankModal] = useState(false);

    const toggleBankModal = (state: boolean) => {
        setShowBankModal(state);
        // Disable body scroll when modal is open
        if (typeof document !== 'undefined') {
            document.body.style.overflow = 'hidden';

            // Make sure to restore scroll when modal closes
            const restoreScroll = () => {
                document.body.style.overflow = '';
                setShowBankModal(false);
            };

            if (!state) {
                // Restore scroll when modal is closed
                restoreScroll();
            }

            // Add an event handler to restore scroll on close
            window.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') restoreScroll();
            });

            // Cleanup function will be called when component unmounts or showBankModal changes
            return () => {
                document.body.style.overflow = '';
                window.removeEventListener('keydown', (e) => {
                    if (e.key === 'Escape') restoreScroll();
                });
            };
        }
    };
    // Helper to copy text to clipboard
    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!");
    };

    const context = useContext(GatewayContext);
    // const { data: agentInfo, isFetching: isAgentInfoFetching } = useAgentInfo()
    const { bankInfo } = context;
    const initializePayment = () => {
        try {
            // Show bank transfer modal for manual payments
            toggleBankModal(true);
            return null;
        } catch (error) {
            console.error("Error initializing payment:", error);
            toast.error(`Error with payment gateway. Contact Support. [Error: ${error}]`);
            return null;
        }
    };

    const manualAmount = Number(bankInfo?.amount || 0)?.toLocaleString('en-NG', {
        style: 'currency',
        currency: 'NGN',
        minimumFractionDigits: 0
    }) || "";

    useEffect(() => {
        return () => {
            // Cleanup on unmount
            toggleBankModal(false)
        };
    }, [])

    return (
        <>
            {children({
                initializePayment,
                ref,
            })}

            {/* Mobile-responsive Bank Details Modal */}
            {(showBankModal) && (
                <div
                    className="fixed inset-0 w-screen h-screen py-2 bg-black/60 z-[9999] text-gray-900 flex items-start justify-center overflow-y-auto backdrop-blur-sm"
                    onClick={(e) => {
                        // Close when clicking backdrop
                        if (e.target === e.currentTarget) toggleBankModal(false);
                    }}
                >
                    <div
                        className="bg-white rounded-2xl max-w-lg w-[95%] pt-7 pb-4 px-4 lg:px-7 shadow-2xl relative font-inherit mx-2"
                    >
                        {/* Close button */}
                        <button type="button"
                            className="absolute top-4 right-4 bg-main-500 text-white border-none rounded-full w-10 h-10 z-20 flex items-center justify-center text-xl cursor-pointer transition-all duration-200 hover:bg-main-800"
                            onClick={() => toggleBankModal(false)}
                            aria-label="Close"
                        >
                            ×
                        </button>

                        {/* Modal header */}
                        <div className="pr-3.5">
                            <h2 className="text-2xl font-bold mb-1 text-gray-800 leading-tight">
                                Payment Gateway
                            </h2>
                            <p className="text-base font-semibold text-gray-700 mb-4">Pay with Bank Transfer</p>

                            <div className="text-sm text-gray-600 mb-3 leading-relaxed">
                                Please make plan payment to the account below.
                            </div>
                        </div>


                        {/* Bank details */}
                        <div className="flex flex-col gap-4 py-2 px-1 lg:p-5 bg-black/[0.02] rounded-xl mb-6">
                            {/* Amount */}
                            <div className="mb-1 text-center">
                                <div className="text-sm text-gray-600 mb-1">Amount to Pay</div>
                                <div className="flex items-center gap-2 justify-center">
                                    <div className="text-3xl font-bold text-gray-800">{manualAmount || "₦0"}</div>
                                    <button type="button"
                                        className="ml-2 text-xs bg-gray-100 border border-gray-200 rounded-md py-1.5 px-3 cursor-pointer flex items-center gap-1.5 transition-all duration-200 hover:bg-gray-200"
                                        onClick={() => copyToClipboard(_.toString(bankInfo?.amount || 0))}
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                        </svg>
                                        Copy
                                    </button>
                                </div>
                            </div>

                            {/* Separator line */}
                            <div className="h-px bg-black/[0.08] my-1.5"></div>

                            {/* Account Number */}
                            {bankInfo.account_number && (
                                <div className="flex items-center justify-between flex-nowrap gap-2">
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">Account Number</div>
                                        <div className="text-base font-semibold text-gray-800">{bankInfo.account_number}</div>
                                    </div>
                                    <button type="button"
                                        className="ml-2 text-xs bg-gray-100 border border-gray-200 rounded-md py-1.5 px-3 cursor-pointer flex items-center gap-1.5 transition-all duration-200 hover:bg-gray-200"
                                        onClick={() => copyToClipboard(bankInfo.account_number!)}
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                        </svg>
                                        Copy
                                    </button>
                                </div>
                            )}

                            {/* Bank Name */}
                            {bankInfo.bank_name && (
                                <div className="flex items-center justify-between flex-nowrap gap-2">
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">Bank Name</div>
                                        <div className="text-base font-semibold text-gray-800">{bankInfo.bank_name}</div>
                                    </div>
                                    <button type="button"
                                        className="ml-2 text-xs bg-gray-100 border border-gray-200 rounded-md py-1.5 px-3 cursor-pointer flex items-center gap-1.5 transition-all duration-200 hover:bg-gray-200"
                                        onClick={() => copyToClipboard(bankInfo.bank_name!)}
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                        </svg>
                                        Copy
                                    </button>
                                </div>
                            )}

                            {/* Account Name */}
                            {bankInfo.account_name && (
                                <div className="flex items-center justify-between flex-nowrap gap-2">
                                    <div>
                                        <div className="text-xs text-gray-500 mb-1">Account Name</div>
                                        <div className="text-base font-semibold text-gray-800">{bankInfo.account_name}</div>
                                    </div>
                                    <button type="button"
                                        className="ml-2 text-xs bg-gray-100 border border-gray-200 rounded-md py-1.5 px-3 cursor-pointer flex items-center gap-1.5 transition-all duration-200 hover:bg-gray-200"
                                        onClick={() => copyToClipboard(bankInfo.account_name!)}
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                                        </svg>
                                        Copy
                                    </button>
                                </div>
                            )}


                            <div className="space-y-0.5">
                                <Link to={'/user/carts'} className="block bg-main-500 text-sm py-2 px-4 text-center font-medium rounded-lg text-white mt-4">
                                    I have made this transfer<br />
                                    <span className="text-xs underline decoration-dotted">Contact Agent</span>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </>
    );
};

const _GatewayConsumer = forwardRef(
    (props: GatewayConsumerInterface, ref: any): JSX.Element => {
        const { children, ...providerProps } = props;
        return (
            <GatewayProvider {...providerProps}>
                <GatewayConsumerChild ref={ref}>{children}</GatewayConsumerChild>
            </GatewayProvider>
        );
    }
);

export default _GatewayConsumer;
