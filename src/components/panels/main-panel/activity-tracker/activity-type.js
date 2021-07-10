import Activity from "./activity";
import styles from "./activity-type.module.css";

export default function ActivityType({ activityType, activities }) {
  return (
    <section className={styles["activity-type"]}>
      <h3>{activityType?.title || ""}</h3>

      {activities.map((activity) => (
        <Activity key={activity.uid} activityType={activityType} activity={activity} />
      ))}

      <Activity activityType={activityType} />
    </section>
  );
}
