import React, { useEffect, useState } from 'react';
import {
  getScheduledTransactions,
} from '../util/fetch/api';

const RecurringTransactions = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    (async () => {
      setTransactions(await getScheduledTransactions());
    })();
  }, []);

  return (
    <div className="body">
      <h2>Recurring payments</h2>
      <table className="table">
        <thead>
          <tr>
            <td>Amount</td>
            <td>To</td>
            <td>Description</td>
            <td>Frequency</td>
            <td>Start date</td>
            <td>End date</td>
          </tr>
        </thead>
        <tbody>
          {transactions.length === 0 && (
          <tr className="center">
            <td colSpan={8}>No scheduled transactions to show</td>
          </tr>
          )}
          {transactions.map((t) => {
            return (
              <tr key={t._id}>
                <td>${t.amount}</td>
                <td>{t.toExternal}</td>
                <td>{t.description}</td>
                <td>{t.frequency}</td>
                <td>{(new Date(t.startDate).toDateString())}</td>
                <td>{(new Date(t.endDate).toDateString())}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default RecurringTransactions;
