import React from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import CustomerProfile from './CustomerProfile';
import CustomerTransactions from './CustomerTransactions';
import CustomerTransact from './CustomerTransact';
import BillerPayments from './BillerPayments';
import AccountDetails from './AccountDetails';

const CustomerHome = ({ history }) => {
  const r = window.appRoutes;

  const onLogout = () => {
    window.localStorage.clear();
    history.push(window.appRoutes.home);
  };

  const routes = [
    [r.customerProfile, <CustomerProfile />, true],
    [r.customerTransactions, <CustomerTransactions />, true],
    [r.customerTransact, <CustomerTransact />, true],
    [r.billerPayments, <BillerPayments />, true],
    [r.accountDetails, <AccountDetails />, true],
  ];

  return (
    <div>
      <div className="header">
        <Link to={r.customerProfile}>My Profile</Link>
        <Link to={r.customerTransactions}>My Transaction</Link>
        <Link to={r.customerTransact}>Transact</Link>
        <Link to={r.billerPayments}>Biller Payments</Link>
        <button className="button no-margin-top" onClick={onLogout}>Logout</button>
      </div>
      <div>
        {routes.map((r) => {
          return (
            <Route path={r[0]} exact={r[2]} key={r[0]}>
              {r[1]}
            </Route>
          );
        })}
      </div>
    </div>
  );
};

export default withRouter(CustomerHome);
