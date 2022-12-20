import { createContext, useContext } from "react";

// Create Context object.
export const ChainContext = createContext(null);

// Export Provider.
export function ChainProvider(props) {
  const { value, children } = props;

  return (
    <ChainContext.Provider value={value}>{children}</ChainContext.Provider>
  );
}

// Export useContext Hook.
export function useChainContext() {
  return useContext(ChainContext);
}
