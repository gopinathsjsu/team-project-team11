import React, { useEffect, useRef, useState } from 'react';
import { currentCustomer, getTransactions } from '../util/fetch/api';

const CustomerTransactions = () => {
  const [customer, setCustomer] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    (async () => {
      setCustomer(await currentCustomer());
      setTransactions(await getTransactions());
    })();
  }, []);

  const handleOnSearch = async () => {
    const text = searchRef.current.value;
    let transactions = await getTransactions();
    if (text.length) {
      transactions = transactions.filter((t) => {
        return t.from._id.match(text);
      });
    }
    setTransactions(transactions);
  };

  return (
    <div className="body">
      {customer ? (
        <>
          <h2>Your transactions</h2>
          <div>
            <input type="text" ref={searchRef} placeholder="Search account number" />
            <button className="button" onClick={handleOnSearch}>Search account</button>
          </div>
          <table className="table">
            <thead>
              <tr>
                <td>From Account</td>
                <td>To Account</td>
                <td>Description</td>
                <td>Amount</td>
                <td>Time</td>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 && (
              <tr>
                <td className="center" colSpan={5}>No transactions yet</td>
              </tr>
              )}
              {transactions.map((t, i) => {
                return (
                  <tr key={i}>
                    <td>{t.from._id}</td>
                    <td>{t.isExternal ? t.toExternal : t.to._id}</td>
                    <td>{t.description}</td>
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
