import {
  ToastOptions,
  ToastProps,
} from "node_modules/react-toastify/dist/types";
import { toast } from "react-toastify";

export const ToastWrapper = ({ title, text }: ToastWrapperProps) => {
  return (
    <div>
      <p className="text-base font-bold">{title}</p>
      <p
        className="text-sm font-normal"
        dangerouslySetInnerHTML={{ __html: text }}
      />
    </div>
  );
};

const notify = (myProps: ToastWrapperProps, toastProps?: ToastProps) =>
  toast(<ToastWrapper {...myProps} />, { ...toastProps });

notify.success = (myProps: ToastWrapperProps, toastProps?: ToastProps) =>
  toast.success(<ToastWrapper {...myProps} />, { ...toastProps });

notify.error = (
  { title, ...myProps }: ToastWrapperProps,
  toastProps?: ToastOptions
) =>
  toast.error(<ToastWrapper title={title || "Error"} {...myProps} />, {
    ...toastProps,
  });

export { notify };

