import { DeleteDialogStyle } from "../../factory/dialog-styles";
import MainButton from "../form-elements/main-button";
import Modal from "react-modal";
import { auth } from "../../firebase";
import styles from "./delete-account-dialog.module.css";

export default function DeleteAccountDialog({ isDialogOpen, setIsDialogOpen }) {
  return (
    <Modal
      isOpen={isDialogOpen}
      onRequestClose={() => setIsDialogOpen(false)}
      style={new DeleteDialogStyle()}
      contentLabel="Example Modal"
    >
      <h1>Delete Account</h1>

      <p>Are you sure you wish to delete your account and all data associated with it?</p>

      <p>There will be no way to retrieve this data once deleted.</p>

      <div className={styles.buttons}>
        <MainButton buttonStyle="link" onClick={() => setIsDialogOpen(false)} title="Cancel" />

        <MainButton
          buttonStyle="delete-button"
          onClick={async () => {
            await auth?.currentUser?.delete?.();

            document.location.reload();
          }}
          title="Delete"
        />
      </div>
    </Modal>
  );
}
