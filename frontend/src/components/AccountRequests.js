import React, { useEffect, useState } from 'react';
import {
  approveAccountRequest, fileUrl, getAccountRequests, getAccounts,
} from '../util/fetch/api';

const AccountRequests = () => {
  const [accountRequests, setAccountRequests] = useState([]);

  useEffect(() => {
    (async () => {
      setAccountRequests(await getAccounts());
    })();
  }, []);

  const approveRequest = async (account) => {
    const initialBalance = prompt('Enter initial balance', 0);
    const balance = parseInt(initialBalance);
    if (Number.isNaN(balance)) {
      alert('Please enter a number');
    } else {
      await approveAccountRequest({ _id: account._id, balance });
      alert('Account request has been approved');
      setAccountRequests(await getAccountRequests());
    }
  };

  return (
    <div className="body">
      <h2>Account requests</h2>
      <div>
        <div>{accountRequests.length === 0 && 'You have no new requests to approve'}</div>
        <table className="table">
          <thead>
            <th>Account ID</th>
            <th>Balance</th>
            <th>Account Type</th>
            <th>Customer Name</th>
            <th>Customer Email</th>
            <th>&nbsp;</th>
          </thead>
          <tbody>
            {accountRequests.map((account) => {
              return (
                <>
                  <tr>
                    <td>{account._id}</td>
                    <td>${account.balance}</td>
                    <td>{account.type}</td>
                    <td>{account.customer.name}</td>
                    <td>{account.customer.email}</td>
                    <td>
                      <button onClick={(acc) => { approveRequest(account); }}>
                        Approve
                      </button>
                    </td>
                  </tr>
                  <tr className="border-bottom">
                    <td colSpan={6}>
                      <div className="uploaded-file medium-margin-top">
                        {account.files.map((f) => {
                          return <img key={f} src={fileUrl(f)} alt={fileUrl(f)} />;
                        })}
                      </div>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountRequests;
