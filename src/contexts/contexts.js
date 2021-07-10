import { AccountSidebarOpenContextProvider } from "./account-sidebar-open-context";
import { ActivitiesContextProvider } from "./activities-context";
import { ActivityTypesContextProvider } from "./activity-types-context";
import { DateContextProvider } from "./date-context";
import { UserContextProvider } from "./user-context";

export default function ContextProviders({ children }) {
  return (
    <DateContextProvider>
      <ActivitiesContextProvider>
        <ActivityTypesContextProvider>
          <AccountSidebarOpenContextProvider>
            <UserContextProvider>{children}</UserContextProvider>
          </AccountSidebarOpenContextProvider>
        </ActivityTypesContextProvider>
      </ActivitiesContextProvider>
    </DateContextProvider>
  );
}
