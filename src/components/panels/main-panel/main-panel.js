import ActivityTracker from "./activity-tracker/activity-tracker";
import styles from "./main-panel.module.css";

export default function MainPanel() {
  return (
    <div className={`${styles["main-panel"]} ease-fade-in`}>
      <ActivityTracker />
    </div>
  );
}
