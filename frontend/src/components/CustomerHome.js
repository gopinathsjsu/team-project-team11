import React, { useEffect, useState } from 'react';
import { currentCustomer } from '../util/fetch/api';

const CustomerHome = () => {
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    (async () => {
      setCustomer(await currentCustomer());
    })();
  }, []);

  return (
    <div className="center">
      {customer ? (
        <>
          <h2>Hello {customer.name}!</h2>
          <div>{customer.email}</div>
          <div>You have {customer.accounts.length} account(s)</div>
        </>
      ) : 'Loading your profile'}

    </div>
  );
};

export default CustomerHome;
