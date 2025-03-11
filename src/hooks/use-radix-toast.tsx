
import * as React from "react";
import { 
  Toast,
  ToastAction,
  ToastActionElement,
  ToastClose,
  ToastDescription,
  ToastTitle,
  ToastViewport
} from "@/components/ui/radix-toast";

// Import ToastProvider but rename it to avoid collision
import { ToastProvider as RadixToastProvider } from "@/components/ui/radix-toast";

type ToasterToast = {
  id: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  variant?: "default" | "destructive";
};

const TOAST_LIMIT = 5;
const TOAST_REMOVE_DELAY = 1000000;

type ToastActionType = (props: {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  variant?: "default" | "destructive";
}) => void;

const actionTypes = {
  ADD_TOAST: "ADD_TOAST",
  UPDATE_TOAST: "UPDATE_TOAST",
  DISMISS_TOAST: "DISMISS_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",
} as const;

type ActionType = typeof actionTypes;

type Action =
  | {
      type: ActionType["ADD_TOAST"];
      toast: ToasterToast;
    }
  | {
      type: ActionType["UPDATE_TOAST"];
      toast: Partial<ToasterToast>;
      id: string;
    }
  | {
      type: ActionType["DISMISS_TOAST"];
      id: string;
    }
  | {
      type: ActionType["REMOVE_TOAST"];
      id: string;
    };

interface State {
  toasts: ToasterToast[];
}

const toastTimeouts = new Map<string, ReturnType<typeof setTimeout>>();

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT),
      };

    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === action.id ? { ...t, ...action.toast } : t
        ),
      };

    case "DISMISS_TOAST": {
      const { id } = action;

      if (toastTimeouts.has(id)) {
        clearTimeout(toastTimeouts.get(id));
        toastTimeouts.delete(id);
      }

      return {
        ...state,
        toasts: state.toasts.map((t) =>
          t.id === id ? { ...t } : t
        ),
      };
    }

    case "REMOVE_TOAST":
      if (toastTimeouts.has(action.id)) {
        clearTimeout(toastTimeouts.get(action.id));
        toastTimeouts.delete(action.id);
      }

      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.id),
      };

    default:
      return state;
  }
};

// Rename the internal hook to avoid conflicts
const useToastInternal = () => {
  const [state, dispatch] = React.useReducer(reducer, {
    toasts: [],
  });

  React.useEffect(() => {
    state.toasts.forEach((toast) => {
      if (!toast.id) return;

      if (toastTimeouts.has(toast.id)) return;

      const timeout = setTimeout(() => {
        dispatch({
          type: "DISMISS_TOAST",
          id: toast.id,
        });

        setTimeout(() => {
          dispatch({
            type: "REMOVE_TOAST",
            id: toast.id,
          });
        }, 300);
      }, 5000);

      toastTimeouts.set(toast.id, timeout);
    });
  }, [state.toasts]);

  const toast: ToastActionType = React.useCallback(
    ({ ...props }) => {
      const id = Math.random().toString(36).substring(2, 9);

      dispatch({
        type: "ADD_TOAST",
        toast: {
          id,
          ...props,
        },
      });

      return id;
    },
    [dispatch]
  );

  return {
    toasts: state.toasts,
    toast,
    dismiss: (id: string) => dispatch({ type: "DISMISS_TOAST", id }),
  };
};

const ToastContext = React.createContext<ReturnType<typeof useToastInternal> | null>(
  null
);

// Our custom ToastProvider that wraps the RadixToastProvider
export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const toast = useToastInternal();

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  );
};

// The hook that components will use
export const useToast = () => {
  const context = React.useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
};

// The Toaster component that renders toast notifications
export function Toaster() {
  const { toasts } = useToast();

  return (
    <RadixToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </RadixToastProvider>
  );
}

// A standalone toast function for direct usage
export const toast: ToastActionType = ({ ...props }) => {
  const id = Math.random().toString(36).substring(2, 9);
  // This is a simplified version for direct usage
  // In a real app, this would dispatch to the actual toast provider
  console.log("Toast:", { id, ...props });
  return id;
};
