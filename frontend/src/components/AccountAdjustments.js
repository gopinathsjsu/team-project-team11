import React, { useEffect, useState } from 'react';
import { getAccounts, updateAccountBalance } from '../util/fetch/api';

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
    alert(`Updated balance to ${account.balance}`);
  };

  return (
    <div className="body">
      <h2>Customer account</h2>
      <div>
        <div>{accounts.length === 0 && 'No accounts to show'}</div>
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
            {accounts.map((account) => {
              return (
                <tr key={account._id}>
                  <td>{account._id}</td>
                  <td>
                    <input type="number" value={account.balance}
                      onChange={(e) => {
                        updateBalance(account, e.target.value);
                      }} />
                  </td>
                  <td>{account.type}</td>
                  <td>{account.customer.name}</td>
                  <td>{account.customer.email}</td>
                  <td>
                    <button onClick={(acc) => {
                      saveBalance(account);
                    }}>
                      Update balance
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
