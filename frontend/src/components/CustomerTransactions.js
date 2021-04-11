import React, { useEffect, useState } from 'react';
import { currentCustomer, fileUrl } from '../util/fetch/api';

const CustomerTransactions = () => {
  const [customer, setCustomer] = useState(null);
  const [filesUploaded, setFilesUploaded] = useState([]);
  const handleOnFileUpload = (f) => {
    setFilesUploaded(f.files);
  };

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
          <div>
            Your transactions
          </div>
        </>
      ) : 'Loading your profile'}

    </div>
  );
};

export default CustomerTransactions;
