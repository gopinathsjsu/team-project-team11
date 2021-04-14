import React, { useEffect, useState } from 'react';
import { currentCustomer, getTransactions } from '../util/fetch/api';

const CustomerTransactions = () => {
  const [customer, setCustomer] = useState(null);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    (async () => {
      setCustomer(await currentCustomer());
      setTransactions(await getTransactions());
    })();
  }, []);

  return (
    <div className="body">
      {customer ? (
        <>
          <h2>Your transactions</h2>
          <table className="table">
            <thead>
              <tr>
                <td>From Account</td>
                <td>To Account</td>
                <td>Amount</td>
                <td>Time</td>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, i) => {
                return (
                  <tr key={i}>
                    <td>{t.from._id}</td>
                    <td>{t.isExternal ? t.toExternal : t.to._id}</td>
                    <td>${t.amount}</td>
                    <td>{new Date(t.createdAt).toDateString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

        </>
      ) : 'Loading your profile'}

    </div>
  );
};

export default CustomerTransactions;
