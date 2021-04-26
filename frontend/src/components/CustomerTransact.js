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
          <div className="flex">
            <div>
              <span>From&nbsp;&nbsp;</span>
              <select ref={fromRef}>
                {customer.accounts.filter((a) => a.isActive).map((a) => {
                  return <option key={a._id} value={a._id}>{a._id} (${a.balance})</option>;
                })}
              </select>
            </div>
            <div>
                            &nbsp;&nbsp;
              <span>to&nbsp;&nbsp;</span>
              <select ref={toRef}>
                {customer.accounts.filter((a) => a.isActive).map((a) => {
                  return <option key={a._id} value={a._id}>{a._id} (${a.balance})</option>;
                })}
              </select>
            </div>
            <input type="number" ref={amountRef} placeholder="Amount" className="small-margin-left" />
            <button className="small-margin-left" onClick={handleOnTransfer}>Transfer</button>
          </div>
        </>
      ) : 'Loading your profile'}

    </div>
  );
};

export default CustomerTransact;
