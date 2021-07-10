import { createContext, useContext } from "react";
import { DateContext } from "./date-context";
import { useReducer } from "react";

export const ActivitiesContext = createContext({ activities: [] });

function activitiesReducer(activitiesByDate, action) {
  const activities = activitiesByDate[action.date] || [];

  switch (action.type) {
    case "add":
      return { ...activitiesByDate, [action.date]: [...activities, action.activity] };
    case "remove":
      return {
        ...activitiesByDate,
        [action.date]: activities.filter((activity) => activity.uid !== action.activity.uid),
      };
    case "update":
      return {
        ...activitiesByDate,
        [action.date]: activities.map((activity) =>
          activity.uid === action.activity.uid ? action.activity : activity,
        ),
      };
    case "replace":
      return { [action.date]: action.activities };
    case "replaceDate":
      return { ...activitiesByDate, [action.date]: action.activities };
    case "removeAll":
      return {};
    default:
      throw new Error("No action.type provided to the activitiesReducer");
  }
}

export function ActivitiesContextProvider({ children }) {
  const { date } = useContext(DateContext);
  const formattedDate = date.toLocaleDateString("en-GB");
  const [allActivities, allActivitiesDispatch] = useReducer(activitiesReducer, {});

  return (
    <ActivitiesContext.Provider
      value={{
        activities: allActivities[formattedDate] || [],
        activitiesDispatch: (action) => allActivitiesDispatch({ date: formattedDate, ...action }),
        allActivities,
      }}
    >
      {children}
    </ActivitiesContext.Provider>
  );
}
