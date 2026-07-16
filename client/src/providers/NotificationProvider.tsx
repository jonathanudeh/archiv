"use client";

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useCallback,
  useRef,
} from "react";

type NotificationType = "success" | "error" | "info";

export type Notification = {
  id: string;
  message: string;
  type: NotificationType;
};

type State = {
  notification: Notification | null;
};

type Action =
  | {
      type: "SHOW_NOTIFICATION";
      payload: Notification;
    }
  | {
      type: "HIDE_NOTIFICATION";
    };

const initialState: State = {
  notification: null,
};

function notificationReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SHOW_NOTIFICATION":
      return {
        notification: action.payload,
      };

    case "HIDE_NOTIFICATION":
      return {
        notification: null,
      };

    default:
      return state;
  }
}

type NotificationContextType = {
  notification: Notification | null;

  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;

  removeNotification: () => void;
};

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(notificationReducer, initialState);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showNotification = useCallback(
    (message: string, type: NotificationType) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      const id = `${Date.now()}-${Math.random().toString(36).slice(2)}`;

      dispatch({
        type: "SHOW_NOTIFICATION",
        payload: {
          id,
          message,
          type,
        },
      });

      timeoutRef.current = setTimeout(() => {
        dispatch({
          type: "HIDE_NOTIFICATION",
        });
      }, 4000);
    },
    [],
  );

  const success = (message: string) => {
    showNotification(message, "success");
  };

  const error = (message: string) => {
    showNotification(message, "error");
  };

  const info = (message: string) => {
    showNotification(message, "info");
  };

  const removeNotification = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    dispatch({
      type: "HIDE_NOTIFICATION",
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        notification: state.notification,
        success,
        error,
        info,
        removeNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotification must be used inside NotificationProvider");
  }

  return context;
}
