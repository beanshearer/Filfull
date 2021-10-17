import MainCalendar from "../calendars/main-calendar";
import MainPanel from "../panels/main-panel/main-panel";
import styles from "./main-body.module.css";

export default function MainBody() {
  return (
    <div className={styles["main-body"]} data-testid="main-body">
      <MainPanel />

      <MainCalendar />
    </div>
  );
}
