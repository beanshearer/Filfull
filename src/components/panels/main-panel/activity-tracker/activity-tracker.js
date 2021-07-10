import { ActivitiesContext } from "../../../../contexts/activities-context";
import ActivityTrackerHeader from "./activity-tracker-header";
import ActivityType from "./activity-type";
import { ActivityTypesContext } from "../../../../contexts/activity-types-context";
import styles from "./activity-tracker.module.css";
import { useContext } from "react";

export default function ActivityTracker() {
  const { activityTypes } = useContext(ActivityTypesContext);
  const { activities } = useContext(ActivitiesContext);

  return (
    <section className={styles["activity-tracker"]}>
      <ActivityTrackerHeader activities={activities} />

      <div className={styles["activities"]}>
        {activityTypes.map((activityType) => {
          const correspondingActivities = activities.filter(
            ({ activityTypeUid }) => activityTypeUid === activityType.uid,
          );

          return (
            <ActivityType
              key={activityType.uid}
              activityType={activityType}
              activities={correspondingActivities}
            />
          );
        })}
      </div>
    </section>
  );
}
