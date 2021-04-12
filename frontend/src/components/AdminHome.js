import React from 'react';
import { Link, Route, withRouter } from 'react-router-dom';
import AccountAdjustments from './AccountAdjustments';
import AccountRequests from './AccountRequests';

const AdminHome = ({ history }) => {
  const r = window.appRoutes;

  const onLogout = () => {
    window.localStorage.clear();
    history.push(window.appRoutes.home);
  };

  const routes = [
    [r.accountAdjustments, <AccountAdjustments />, true],
    [r.accountRequests, <AccountRequests />, true],
  ];

  return (
    <div>
      <div className="header">
        <Link to={r.accountRequests}>Account requests</Link>
        <Link to={r.accountAdjustments}>Account adjustments</Link>
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

export default withRouter(AdminHome);
