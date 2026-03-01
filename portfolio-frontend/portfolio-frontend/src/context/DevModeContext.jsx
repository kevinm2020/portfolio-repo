import { createContext, useState, useEffect } from "react";
export const DevModeContext = createContext();

/**
 * DevModeProvider - Context provider component for managing developer mode state
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to wrap with DevModeContext
 * @returns {JSX.Element} Provider component that supplies devMode state and setDevMode setter to all child components
 * 
 * @description
 * Provides a global developer mode context that persists user preference to localStorage.
 * Initializes devMode state from localStorage on mount, and syncs any state changes back to storage.
 * 
 * @example
 * <DevModeProvider>
 *   <App />
 * </DevModeProvider>
 */
export function DevModeProvider({ children }) 
{
  const [devMode, setDevMode] = useState(() => {
    const saved = localStorage.getItem("devMode");
    return saved === "true";
  });

  useEffect(() => {
    localStorage.setItem("devMode", devMode);
  }, [devMode]);

  return (
    <DevModeContext.Provider value={{ devMode, setDevMode }}>
      {children}
    </DevModeContext.Provider>
  );
}