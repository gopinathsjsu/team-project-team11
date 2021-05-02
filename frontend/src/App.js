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
  customerProfile: '/customerHome/profile',
  customerTransactions: '/customerHome/transactions',
  customerRecurringTransactions: '/customerHome/recurring-transactions',
  customerTransact: '/customerHome/transact',
  billerPayments: '/customerHome/billerPayments',
  accountAdjustments: '/adminHome/accountAdjustments',
  accountRequests: '/adminHome/accountRequests',
  accountDetails: '/customerHome/accountDetails/:accountId',
};

window.appRoutes = r;

export default function App() {
  const routes = [
    [r.home, <Landing />, true],
    [r.customerLogin, <CustomerLogin />, true],
    [r.customerHome, <CustomerHome />, false],
    [r.customerSignup, <CustomerSignup />, true],
    [r.adminLogin, <AdminLogin />, true],
    [r.adminHome, <AdminHome />, false],
  ];

  return (
    <Router>
      <Switch>
        {routes.map((r) => {
          return (
            <Route path={r[0]} exact={r[2]} key={r[0]}>
              {r[1]}
            </Route>
          );
        })}
      </Switch>
    </Router>
  );
}
