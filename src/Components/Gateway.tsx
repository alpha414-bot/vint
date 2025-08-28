"use client";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";
import { FlutterwaveConfig } from "flutterwave-react-v3/dist/types";
import {
    createContext,
    forwardRef,
    JSX,
    useContext,
} from "react";
import { usePaystackPayment } from "react-paystack";
import { HookConfig } from "react-paystack/dist/types";

type onSuccessType = (resp?: any, gateway?: GatewayType) => void;
type GatewayType = "flutterwave" | "paystack" | "monnify";
interface GatewayProps {
    gateway: GatewayType;
    config: GatewayConfig;
    onSuccess?: onSuccessType;
    onClose?: any;
}

interface GatewayJSXInterface extends GatewayProps {
    children: JSX.Element;
}

interface GatewayConsumerInterface extends GatewayProps {
    children: (arg: Record<string, any>) => any;
}

interface GatewayConfig {
    public_key: string;
    reference: string;
    amount: number;
    customer: { name?: string; email: string; phone_number?: string };
    app?: string;
    split?: {
        main_account?: string;
        main_amount: string;
        fee_account?: string;
        fee_amount: string;
    };
    onSuccess?: (resp: any, gateway: GatewayType) => void;
}

interface GatewayContext {
    config?: any;
    onSuccess?: onSuccessType;
    onClose: () => void;
    initializePayment: any;
    gateway?: GatewayType;
    //   initializePayment: ({
    //     callback,
    //     onClose,
    //   }: InitializeFlutterwavePayment) => void;
}

const GatewayContext = createContext<GatewayContext>({} as GatewayContext);

const GatewayProvider = ({
    config,
    children,
    gateway,
    onSuccess,
    onClose,
}: GatewayJSXInterface): JSX.Element => {
    const { public_key, reference, amount, customer, app, split } = config;
    const FlutterwaveConfig: FlutterwaveConfig = {
        public_key,
        tx_ref: reference,
        amount: amount,
        currency: "NGN",
        payment_options: "card",
        customer: {
            email: customer.email,
            phone_number: customer.phone_number || "",
            name: customer.name || "",
        },
        meta: { app: app },
        customizations: {
            title: "Pretium Concept",
            description:
                "Pay for our amazing plan. If any issue, reach out to our support.",
            logo: `${window.location.origin}/img/icon.png`,
        },
        redirect_url: undefined,
    };

    const PaystackConfig: HookConfig = {
        reference: reference,
        publicKey: public_key,
        email: customer.email,
        amount: amount * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
        firstname: customer?.name?.split(" ")[0] || "",
        lastname: customer?.name?.split(" ")[1] || "",
        phone: customer.phone_number || "",
        split: {
            type: "flat",
            bearer_type: "subaccount",
            bearer_subaccount: split?.main_account,
            subaccounts: [
                // Main Owner Account
                split?.main_account && {
                    subaccount: split?.main_account,
                    share: Number(split?.main_amount || 0) * 100,
                },
                // Transaction Fee Account
                {
                    subaccount: split?.fee_account,
                    share: Number(split?.fee_amount || 0) * 100,
                },
            ],
        },
        metadata: {
            custom_fields: [
                {
                    display_name: "Name",
                    variable_name: "name",
                    value: customer.name || "",
                },
                {
                    display_name: "App",
                    variable_name: "app",
                    value: app,
                },
            ],
        },
    };
    const initializePayment =
        gateway === "flutterwave"
            ? useFlutterwave(FlutterwaveConfig)
            : usePaystackPayment(PaystackConfig);
    return (
        <GatewayContext.Provider
            value={{
                initializePayment,
                onSuccess,
                onClose,
                gateway: gateway,
                config: gateway === "flutterwave" ? FlutterwaveConfig : PaystackConfig,
            }}
        >
            {children}
        </GatewayContext.Provider>
    );
};

const GatewayConsumerChild = ({
    children,
    ref,
}: {
    children: any;
    ref: any;
}) => {
    const context = useContext(GatewayContext);
    const { config, initializePayment, onSuccess, gateway, onClose } = context;
    const completeInitializePayment = () =>
        gateway == "flutterwave"
            ? initializePayment({
                callback: (response: any) => {
                    closePaymentModal();
                    onSuccess && onSuccess(response.tx_ref, gateway);
                },
                onClose: () => {
                    console.log(`payment ${gateway} closed.`);
                },
            })
            : initializePayment({
                config,
                onSuccess: (resp: any) =>
                    onSuccess && onSuccess(resp.reference, gateway),
                onClose,
            });
    return children({
        gateway,
        initializePayment: completeInitializePayment,
        ref,
        onSuccess,
        onClose,
    });
};

const GatewayConsumer = forwardRef(
    (
        { children, onSuccess, onClose, ...props }: GatewayConsumerInterface,
        ref: any,
    ): JSX.Element => {
        // const onSuccess = paraSuccess ? paraSuccess : (): any => null;
        // const onClose = paraClose ? paraClose : (): any => null;
        return (
            <GatewayProvider {...props} onSuccess={onSuccess} onClose={onClose}>
                <GatewayConsumerChild ref={ref}>{children}</GatewayConsumerChild>
            </GatewayProvider>
        );
    },
);

export default GatewayConsumer;
