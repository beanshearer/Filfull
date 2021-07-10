import { createContext } from "react";
import { useState } from "react";

export const AccountSidebarOpenContext = createContext({});

export function AccountSidebarOpenContextProvider({ children }) {
  const [accountSidebarOpen, setAccountSidebarOpen] = useState(false);

  return (
    <AccountSidebarOpenContext.Provider value={{ accountSidebarOpen, setAccountSidebarOpen }}>
      {children}
    </AccountSidebarOpenContext.Provider>
  );
}
