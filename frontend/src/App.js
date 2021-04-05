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
import CustomerHome from "./components/CustomerHome";
import AdminHome from "./components/AdminHome";

export default function App() {
    const routes = [
        ["/", Landing],
        ["/customerLogin", CustomerLogin],
        ["/customerHome", CustomerHome],
        ["/customerSignup", CustomerSignup],
        ["/adminLogin", AdminLogin],
        ["/adminHome", AdminHome],
    ];
    return (
        <Router>
            <Switch>
                {routes.map((r, i) => {
                    return <Route path={r[0]} exact={true} key={r[0]}>
                        {r[1]}
                    </Route>
                })}
            </Switch>
        </Router>
    );
}
