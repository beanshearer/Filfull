import { ActivityTypeDefaults } from "../factory/activity-type-defaults";
import { createContext } from "react";
import { useState } from "react";

export const ActivityTypesContext = createContext({ activityTypes: [] });

export function ActivityTypesContextProvider({ children }) {
  const [activityTypes, setActivityTypes] = useState(() => new ActivityTypeDefaults());

  return (
    <ActivityTypesContext.Provider value={{ activityTypes, setActivityTypes }}>
      {children}
    </ActivityTypesContext.Provider>
  );
}
