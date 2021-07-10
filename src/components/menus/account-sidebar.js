import "./account-sidebar.css";
import { useContext, useState } from "react";
import { AccountSidebarOpenContext } from "../../contexts/account-sidebar-open-context";
import DeleteAccountDialog from "../dialogs/delete-account-dialog";
import MainButton from "../form-elements/main-button";
import { slide as SideMenu } from "react-burger-menu";
import { auth } from ".././../firebase";

export default function AccountSidebar() {
  const { accountSidebarOpen, setAccountSidebarOpen } = useContext(AccountSidebarOpenContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div>
      <SideMenu
        isOpen={accountSidebarOpen}
        onStateChange={({ isOpen }) => setAccountSidebarOpen(isOpen)}
        right
      >
        <h2>Account</h2>

        <MainButton
          buttonStyle="link"
          onClick={async () => {
            await auth.signOut();

            document.location.reload();
          }}
          title="Sign Out"
        />

        <MainButton
          buttonStyle="link"
          onClick={async () => {
            setIsDialogOpen(true);
          }}
          title="Delete Account"
        />

        <DeleteAccountDialog isDialogOpen={isDialogOpen} setIsDialogOpen={setIsDialogOpen} />
      </SideMenu>
    </div>
  );
}
