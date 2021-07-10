import "./main-calendar.css";
import { ActivitiesContext } from "../../contexts/activities-context";
import Calendar from "react-calendar";
import { DateContext } from "../../contexts/date-context";
import { UserContext } from "../../contexts/user-context";
import { db } from "../../firebase";
import { notify } from "react-notify-toast";
import { useContext } from "react";

export default function MainCalendar() {
  const { date, setDate } = useContext(DateContext);
  const { user } = useContext(UserContext);
  const { activities, activitiesDispatch } = useContext(ActivitiesContext);

  return (
    <Calendar
      onChange={async (newDate) => {
        const formattedDate = newDate.toLocaleDateString("en-GB");

        if (!user?.uid || activities[formattedDate]) return setDate(newDate);

        const requestedActivities = [];

        const start = new Date(newDate.getTime());
        const end = new Date(newDate.getTime());

        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);

        try {
          const savedActivities = await db
            .collection(`users/${user.uid}/activities`)
            .where("date", ">=", start)
            .where("date", "<=", end)
            .get();
          savedActivities.forEach((activity) => requestedActivities.push(activity.data()));

          activitiesDispatch({
            activities: requestedActivities,
            date: formattedDate,
            type: "replaceDate",
          });
          setDate(newDate);
        } catch (error) {
          if (error?.message) notify.show(error.message, "error");
        }
      }}
      value={date}
    />
  );
}
