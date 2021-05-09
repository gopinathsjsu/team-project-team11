import React, { useEffect, useState } from 'react';
import { approveAccountRequest, fileUrl, getAccountRequests } from '../util/fetch/api';

const AccountRequests = () => {
  const [accountRequests, setAccountRequests] = useState([]);

  useEffect(() => {
    (async () => {
      setAccountRequests(await getAccountRequests());
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
        <div className="center">{accountRequests.length === 0 && 'You have no new requests to approve'}</div>
        <table className="table">
          <thead>
            <tr>
              <td>Account ID</td>
              <td>Balance</td>
              <td>Account Type</td>
              <td>Customer Name</td>
              <td>Customer Email</td>
              <td>&nbsp;</td>
            </tr>
          </thead>
          <tbody>
            {accountRequests.map((account) => {
              return (
                <>
                  <tr key={account._id}>
                    <td>{account._id}</td>
                    <td>${account.balance}</td>
                    <td>{account.accountType}</td>
                    <td>{account.customer.name}</td>
                    <td>{account.customer.email}</td>
                    <td>
                      <button onClick={(acc) => { approveRequest(account); }} className="button no-margin-top">
                        Approve
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={6}>
                      <div className="uploaded-file">
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
