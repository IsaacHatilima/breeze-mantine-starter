import React, {createContext, ReactNode, useContext, useState} from 'react';

// Define the shape of the context
interface NotificationContextType {
    showNotification: boolean;
    triggerNotification: () => void;
}

// Create the context with a default value of `undefined`
const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Provider component
export const NotificationProvider = ({children}: { children: ReactNode }) => {
    const [showNotification, setShowNotification] = useState(false);

    const triggerNotification = () => {
        setShowNotification(true);
        setTimeout(() => setShowNotification(false), 2500); // Hide after 2.5 seconds
    };

    return (
        <NotificationContext.Provider value={{showNotification, triggerNotification}}>
            {children}
        </NotificationContext.Provider>
    );
};

// Custom hook to use the Notification context
export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within a NotificationProvider');
    }
    return context;
};
