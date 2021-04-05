import './App.css';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import React from 'react';
import Landing from './components/Landing';
import CustomerSignup from './components/CustomerSignup';
import CustomerLogin from './components/CustomerLogin';
import AdminLogin from './components/AdminLogin';
import CustomerHome from './components/CustomerHome';
import AdminHome from './components/AdminHome';

const r = {
  home: '/',
  customerLogin: '/customerLogin',
  customerHome: '/customerHome',
  customerSignup: '/customerSignup',
  adminLogin: '/adminLogin',
  adminHome: '/adminHome',
};

window.appRoutes = r;

export default function App() {
  const routes = [
    [r.home, <Landing />],
    [r.customerLogin, <CustomerLogin />],
    [r.customerHome, <CustomerHome />],
    [r.customerSignup, <CustomerSignup />],
    [r.adminLogin, <AdminLogin />],
    [r.adminHome, <AdminHome />],
  ];
  return (
    <Router>
      <Switch>
        {routes.map((r) => {
          return (
            <Route path={r[0]} exact key={r[0]}>
              {r[1]}
            </Route>
          );
        })}
      </Switch>
    </Router>
  );
}
