import { useContext, useState } from "react";
import { ActivitiesContext } from "../../../../contexts/activities-context";
import { CircularProgressbar } from "react-circular-progressbar";
import { DateContext } from "../../../../contexts/date-context";
import MainButton from "../../../form-elements/main-button";
import MainInput from "../../../form-elements/main-input";
import MainLabel from "../../../form-elements/main-label";
import MainTextArea from "../../../form-elements/main-text-area";
import { UserContext } from "../../../../contexts/user-context";
import { db } from "../../../../firebase";
import isRequired from "../../../../utility-functions/validators/is-required";
import { notify } from "react-notify-toast";
import styles from "./activity.module.css";
import { v4 } from "uuid";

export default function Activity({ activity, activityType }) {
  const { date } = useContext(DateContext);
  const { user } = useContext(UserContext);
  const { activitiesDispatch } = useContext(ActivitiesContext);
  const [score, setScore] = useState(activity?.score || "");
  const [isEditable, setIsEditable] = useState(activity?.uid ? false : true);
  const [showInvalid, setShowInvalid] = useState(false);
  const [description, setDescription] = useState(activity?.description || "");

  return (
    <form
      className={styles["activity"]}
      onSubmit={async (event) => {
        event.preventDefault();

        const uid = activity?.uid || v4();
        const newActivity = { activityTypeUid: activityType.uid, date, description, score, uid };
        const preventUpdate = description === activity?.description && score === activity?.score;

        if (preventUpdate) return setIsEditable(false);

        if (user?.uid && activityType?.uid) {
          try {
            await db.collection(`users/${user?.uid}/activities`).doc(uid).set(newActivity);
          } catch (error) {
            if (error?.message) notify.show(error.message, "error");
          }
        }

        activitiesDispatch({ activity: newActivity, type: activity?.uid ? "update" : "add" });
        setShowInvalid(false);

        if (activity?.uid) return setIsEditable(false);

        setScore("");
        setDescription("");
      }}
    >
      <div className={styles.fulfillment}>
        <MainLabel htmlFor="score" text="Score">
          {isEditable ? (
            <MainInput
              inputStyle="main-input"
              max={10}
              min={1}
              invalidMessage={isRequired("Score", score)}
              placeholder="e.g. 7"
              setText={(score) => {
                if (Number(score) > 10) return;

                setScore(score);
              }}
              showInvalid={showInvalid}
              text={score}
              type="number"
            />
          ) : (
            score
          )}
        </MainLabel>

        <div className={styles["fulfillment-progressbar"]}>
          <CircularProgressbar
            maxValue={10}
            styles={{ path: { stroke: "#4b86b4" }, trail: { stroke: "#e7eff6" } }}
            text={`${score || 0}/10`}
            value={score}
          />
        </div>
      </div>

      <MainLabel htmlFor="description" text="Description" labelStyle="negative-top-margin">
        {isEditable ? (
          <MainTextArea
            invalidMessage={isRequired("Description", description)}
            placeholder="Your activity..."
            setText={setDescription}
            showInvalid={showInvalid}
            text={description}
            textAreaStyle="main-text-area"
          />
        ) : (
          description
        )}
      </MainLabel>

      {isEditable ? (
        <MainButton
          key="save"
          buttonStyle="add-button"
          onClick={() => setShowInvalid(true)}
          title={activity?.uid ? "Save" : "Add"}
          type="submit"
        />
      ) : (
        <MainButton
          key="edit"
          buttonStyle="add-button"
          onClick={() => setIsEditable(true)}
          title="Edit"
          type="button"
        />
      )}
    </form>
  );
}
