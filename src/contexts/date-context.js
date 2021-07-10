import { createContext } from "react";
import { useState } from "react";

export const DateContext = createContext({});

export function DateContextProvider({ children }) {
  const [date, setDate] = useState(() => new Date());

  return <DateContext.Provider value={{ date, setDate }}>{children}</DateContext.Provider>;
}
