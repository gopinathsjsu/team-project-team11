import React, { useEffect, useState } from 'react';
import {
  getScheduledTransactions,
} from '../util/fetch/api';

const RecurringTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    (async () => {
      const transactions = await getScheduledTransactions();
      console.log(transactions);
      setTransactions(transactions);
    })();
  }, []);

  return (
    <div className="body">
      <>
        <hr />
        <table className="table">
          <thead>
            <tr>
              <td>From</td>
              <td>To</td>
              <td>Description</td>
              <td>Frequency</td>
              <td>First Transaction</td>
              <td>Last Transaction</td>
              <td>Next Scheduled Transactions</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {transactions.map((a) => {
              const startDate = new Date(a.startDate);
              const lastTransactionDate = new Date(a.lastTransactionDate);
              const nextTransactionDate = new Date(a.lastTransactionDate);

              if (a.frequency === 'W') {
                nextTransactionDate.setDate(nextTransactionDate.getDate() + 7);
              } else {
                nextTransactionDate.setMonth(
                  lastTransactionDate.getMonth() + 1,
                );
              }

              return (
                <tr key={a._id}>
                  <td>{a.from._id}</td>
                  <td>{a.to._id}</td>
                  <td>{a.description}</td>
                  <td>{a.frequency === 'W' ? 'Weekly' : 'Monthly'}</td>
                  <td>
                    {startDate.getMonth() + 1}/{startDate.getDate()}/{startDate.getFullYear()}</td>
                  <td>{lastTransactionDate.getMonth() + 1}/{lastTransactionDate.getDate()}
                    /{lastTransactionDate.getFullYear()}</td>
                  <td>{nextTransactionDate.getMonth() + 1}/{nextTransactionDate.getDate()}
                    /{nextTransactionDate.getFullYear()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <hr />
      </>
    </div>
  );
};

export default RecurringTransactions;
