import './App.css';
import {
    HashRouter as Router,
    Switch,
    Route,
} from "react-router-dom";

import Landing from "./components/Landing";
import CustomerSignup from "./components/CustomerSignup";
import CustomerLogin from "./components/CustomerLogin";
import AdminLogin from "./components/AdminLogin";

export default function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact={true}>
                    <Landing/>
                </Route>
                <Route path="/customerlogin" exact={true}>
                    <CustomerLogin/>
                </Route>
                <Route path="/customerSignup" exact={true}>
                    <CustomerSignup/>
                </Route>
                <Route path="/adminlogin" exact={true}>
                    <AdminLogin/>
                </Route>
            </Switch>
        </Router>
    );
}
