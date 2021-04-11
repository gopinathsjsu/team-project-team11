import React from 'react';
import { Link, Route } from 'react-router-dom';
import CustomerProfile from './CustomerProfile';
import CustomerTransactions from './CustomerTransactions';

const CustomerHome = () => {
  const r = window.appRoutes;

  const routes = [
    [r.customerProfile, <CustomerProfile />, true],
    [r.customerTransactions, <CustomerTransactions />, true],
  ];

  return (
    <div>
      <div>
        <Link to={r.customerProfile}>Profile</Link>
        <Link to={r.customerTransactions}>Transaction</Link>
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

export default CustomerHome;
