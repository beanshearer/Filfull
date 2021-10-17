import "./styles/colours.css";
import "./styles/shadows.css";
import "./styles/animations.css";
import "react-circular-progressbar/dist/styles.css";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import AccountSidebar from "./components/menus/account-sidebar";
import ContextProvider from "./contexts/contexts";
import Home from "./pages/home";
import Notifications from "react-notify-toast";
import Signin from "./pages/signin";
import Signup from "./pages/signup";

export default function App() {
  return (
    <ContextProvider>
      <Notifications />

      <AccountSidebar />

      <Router>
        <Switch>
          <Route path="/signin">
            <Signin />
          </Route>

          <Route path="/signup">
            <Signup />
          </Route>

          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </ContextProvider>
  );
}
