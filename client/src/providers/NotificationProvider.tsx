"use client";

import {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useCallback,
} from "react";

type NotificationType = "success" | "error" | "info";

type Notification = {
  id: string;
  message: string;
  type: NotificationType;
};

type State = {
  notifications: Notification[];
};

type Action =
  | {
      type: "ADD_NOTIFICATION";
      payload: Notification;
    }
  | {
      type: "REMOVE_NOTIFICATION";
      payload: string;
    };

const initialState: State = {
  notifications: [],
};

function notificationReducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_NOTIFICATION":
      return {
        ...state,
        notifications: [...state.notifications, action.payload],
      };

    case "REMOVE_NOTIFICATION":
      return {
        ...state,
        notifications: state.notifications.filter(
          (notification) => notification.id !== action.payload,
        ),
      };

    default:
      return state;
  }
}

type NotificationContextType = {
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
  removeNotification: (id: string) => void;
  notifications: Notification[];
};

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(notificationReducer, initialState);

  const addNotification = useCallback(
    (message: string, type: NotificationType) => {
      const id = Date.now().toString() + Math.random().toString(36).slice(2);

      dispatch({
        type: "ADD_NOTIFICATION",
        payload: { id, message, type },
      });

      const timeout = setTimeout(() => {
        dispatch({
          type: "REMOVE_NOTIFICATION",
          payload: id,
        });
      }, 5000);

      return () => clearTimeout(timeout);
    },
    [],
  );

  const success = (message: string) => {
    addNotification(message, "success");
  };

  const error = (message: string) => {
    addNotification(message, "error");
  };

  const info = (message: string) => {
    addNotification(message, "info");
  };

  const removeNotification = (id: string) => {
    dispatch({
      type: "REMOVE_NOTIFICATION",
      payload: id,
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        success,
        error,
        info,
        removeNotification,
        notifications: state.notifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      "useNotificationContext must be used inside NotificationProvider",
    );
  }

  return context;
}
