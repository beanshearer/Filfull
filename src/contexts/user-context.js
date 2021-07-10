import { auth, db } from "../firebase";
import { createContext, useContext, useEffect } from "react";
import { ActivitiesContext } from "./activities-context";
import { ActivityTypesContext } from "./activity-types-context";
import { DateContext } from "./date-context";
import { notify } from "react-notify-toast";
import { useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const { allActivities, activitiesDispatch } = useContext(ActivitiesContext);
  const { date } = useContext(DateContext);
  const { activityTypes, setActivityTypes } = useContext(ActivityTypesContext);
  const [user, setUser] = useState({});

  useEffect(
    () =>
      auth.onAuthStateChanged(async (userDetails) => {
        if (!user?.uid && userDetails?.uid) {
          const requestedActivityTypes = [];
          const requestedActivities = [];
          const start = new Date(date.getTime());
          const end = new Date(date.getTime());

          start.setHours(0, 0, 0, 0);
          end.setHours(23, 59, 59, 999);

          if (!Object.values(allActivities).length) {
            try {
              const activityTypes = await db
                .collection(`users/${userDetails.uid}/activityTypes`)
                .get();
              const activities = await db
                .collection(`users/${userDetails.uid}/activities`)
                .where("date", ">", start)
                .where("date", "<", end)
                .get();

              activityTypes.forEach((activityType) =>
                requestedActivityTypes.push(activityType.data()),
              );

              activities.forEach((activity) => requestedActivities.push(activity.data()));

              setActivityTypes(requestedActivityTypes);
              activitiesDispatch({ activities: requestedActivities, type: "replace" });
            } catch (error) {
              if (error?.message) notify.show(error.message, "error");
            }
          }

          setUser({
            email: userDetails.email,
            name: userDetails.displayName,
            uid: userDetails.uid,
          });
        }
      }),
    [activitiesDispatch, activityTypes.length, allActivities, date, setActivityTypes, user?.uid],
  );

  return <UserContext.Provider value={{ setUser, user }}>{children}</UserContext.Provider>;
}
