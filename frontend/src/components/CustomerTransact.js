import React, { useEffect, useRef, useState } from 'react';
import { currentCustomer, transferAmount } from '../util/fetch/api';

const CustomerTransact = () => {
  const [customer, setCustomer] = useState(null);
  const amountRef = useRef(null);
  const fromRef = useRef(null);
  const toRef = useRef(null);

  const handleOnTransfer = async () => {
    const from = fromRef.current.value;
    const to = toRef.current.value;
    const amount = amountRef.current.value;
    if (from === to) {
      alert('Cannot transfer between same accounts');
      return;
    }
    await transferAmount({ from, to, amount });
    setCustomer(await currentCustomer());
    alert(`$${amount} transferred`);
    amountRef.current.value = '';
  };

  useEffect(() => {
    (async () => {
      setCustomer(await currentCustomer());
    })();
  }, []);

  return (
    <div className="body">
      {customer ? (
        <>
          <h2>Transact between accounts</h2>
          <div className="flex-column">
            <div className="medium-margin-top flex">
              <div className="fixed-width-tags medium-margin-right bolder-text">From&nbsp;&nbsp;</div>
              <select ref={fromRef}>
                {customer.accounts.filter((a) => a.isActive).map((a) => {
                  return <option key={a._id} value={a._id}>{a._id} (${a.balance})</option>;
                })}
              </select>
            </div>
            <div className="medium-margin-top flex">
              <div className="fixed-width-tags medium-margin-right bolder-text">To&nbsp;&nbsp;</div>
              <select ref={toRef}>
                {customer.accounts.filter((a) => a.isActive).map((a) => {
                  return <option key={a._id} value={a._id}>{a._id} (${a.balance})</option>;
                })}
              </select>
            </div>
            <div className="medium-margin-top flex">
              <div className="fixed-width-tags medium-margin-right bolder-text">Amount&nbsp;&nbsp;</div>
              <input type="number" ref={amountRef} placeholder="Amount" />
            </div>
            <div><button className="large-margin-top button large-margin-left  fixed-width-tags" onClick={handleOnTransfer}>Transfer</button></div>
          </div>
        </>
      ) : 'Loading your profile'}

    </div>
  );
};

export default CustomerTransact;
