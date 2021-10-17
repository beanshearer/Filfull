import { CircularProgressbar } from "react-circular-progressbar";
import styles from "./activity-tracker-header.module.css";

export default function ActivityTrackerHeader({ activities }) {
  const totalDailyScore = activities.reduce(
    (totalScore, activity) => totalScore + Number(activity.score),
    0,
  );
  const dailyAverage = totalDailyScore / activities.length || 0;

  return (
    <header className={styles["activity-tracker-header"]}>
      <div>
        <p>Hello,</p>
        <p>This is your space to rank your achievements and track your productivity.</p>
        <p>What have you done today?</p>
      </div>

      <div className={styles["fulfillment-progressbar"]}>
        <CircularProgressbar
          value={dailyAverage}
          maxValue={10}
          text={`${dailyAverage.toFixed(2) || 0}/10`}
          styles={{ path: { stroke: "#4b86b4" } }}
        />

        <p>Daily Average</p>
      </div>
    </header>
  );
}
