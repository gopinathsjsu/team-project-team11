import React, { useEffect, useState } from 'react';
import { deleteAccount, getAccounts, updateAccountBalance } from '../util/fetch/api';

const AccountAdjustments = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    (async () => {
      setAccounts(await getAccounts());
    })();
  }, []);

  const updateBalance = (acc, balance) => {
    const updatedAccounts = accounts.map((a) => {
      if (a._id === acc._id) {
        // eslint-disable-next-line no-param-reassign
        a.balance = balance;
      }
      return a;
    });
    setAccounts(updatedAccounts);
  };

  const saveBalance = async (account) => {
    await updateAccountBalance({ _id: account._id, balance: account.balance });
    setAccounts(await getAccounts());
  };

  const closeAccount = async (account) => {
    if (window.confirm(`Are you sure you want to close the account ${account._id}`)) {
      await deleteAccount(account._id);
      alert(`Account ${account._id} was delete`);
      setAccounts(await getAccounts());
    }
  };

  return (
    <div className="body">
      <h2>Customer accounts</h2>
      <div>
        <div>{accounts.length === 0 && 'No accounts to show'}</div>
        <table className="table">
          <thead>
            <tr>
              <td>Account ID</td>
              <td>Balance</td>
              <td>Account Type</td>
              <td>Customer Name</td>
              <td>Customer Email</td>
              <td>&nbsp;</td>
              <td>&nbsp;</td>
            </tr>
          </thead>
          <tbody>
            {accounts.length === 0
            && (
            <tr>
              <td className="center" colSpan="6">No accounts to show</td>
            </tr>
            )}
            {accounts.map((account) => {
              return (
                <tr key={account._id}>
                  <td>{account._id}</td>
                  <td>
                    <input type="number" value={account.balance} onChange={(e) => {
                      updateBalance(account, e.target.value);
                    }} />
                  </td>
                  <td>{account.accountType}</td>
                  <td>{account.customer.name}</td>
                  <td>{account.customer.email}</td>
                  <td>
                    <button onClick={() => { saveBalance(account); }} className="button">
                      Update
                    </button>
                  </td>
                  <td>
                    <button onClick={() => { closeAccount(account); }} className="button">
                      Close
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountAdjustments;
