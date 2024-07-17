import {
  type ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import clsx from "clsx";
import { addSeconds } from "date-fns";
import { AlertTriangle, Check } from "lucide-react";

import { WithinTimeRange } from "./time";

type NotificationsProps = {
  type: `alert-${string}`;
  message: string;
  timestamp: number;
};

type NotificationsContextProps = {
  notify: (notification: Omit<NotificationsProps, "timestamp">) => void;
};

const NotificationsContext = createContext<NotificationsContextProps>({
  notify: () => {},
});

export function Layout({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<NotificationsProps[]>([]);

  const notify = useCallback((notification: Omit<NotificationsProps, "timestamp">) => {
    setNotifications((notifications) => [
      ...notifications,
      { ...notification, timestamp: Date.now() },
    ]);
  }, []);

  useEffect(() => {
    window.addEventListener("unhandledrejection", handleException);
    return () => window.removeEventListener("unhandledrejection", handleException);

    function handleException(e: PromiseRejectionEvent) {
      notify({ type: "alert-error", message: e.reason.message });
    }
  }, [notify]);

  return (
    <NotificationsContext.Provider value={{ notify }}>
      <div className="flex min-h-dvh w-full flex-col">
        {children}
        <div className="toast z-50">
          {notifications.map((props, i) => (
            <Notifications {...props} key={i} />
          ))}
        </div>
      </div>
    </NotificationsContext.Provider>
  );
}

function Notifications({ type, message, timestamp }: NotificationsProps) {
  const end = useMemo(() => addSeconds(timestamp, 10), [timestamp]);

  return (
    <WithinTimeRange end={end}>
      <div className={clsx("alert w-screen max-w-sm", type)}>
        <div className="flex gap-4">
          {type === "alert-success" ? <Check /> : <AlertTriangle />}
          <div className="text-wrap">{message}</div>
        </div>
      </div>
    </WithinTimeRange>
  );
}

export function useNotifications() {
  const { notify } = useContext(NotificationsContext);

  const notifySuccess = useCallback(
    (message: string) => notify({ type: "alert-success", message }),
    [notify],
  );
  const notifyError = useCallback(
    (err: Error) => notify({ type: "alert-error", message: err.message }),
    [notify],
  );

  return {
    notifySuccess,
    notifyError,
  };
}
