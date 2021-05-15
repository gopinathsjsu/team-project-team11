import React, { useEffect, useRef, useState } from 'react';
import { currentCustomer, transferAmount } from '../util/fetch/api';

const CustomerTransact = () => {
  const [customer, setCustomer] = useState(null);
  const [isRecurring, setIsRecurring] = useState(false);
  const amountRef = useRef(null);
  const fromRef = useRef(null);
  const toRef = useRef(null);
  const descriptionRef = useRef(null);
  const frequencyRef = useRef(null);
  const startRef = useRef(null);
  const endRef = useRef(null);

  const handleOnTransfer = async () => {
    const from = fromRef.current.value;
    const to = toRef.current.value;
    const amount = amountRef.current.value;
    const description = descriptionRef.current.value;
    const isRecurringPayment = isRecurring;
    if (from === to) {
      alert('Cannot transfer between same accounts');
      return;
    }
    const d = {
      from, to, amount, description,
    };
    if (isRecurringPayment) {
      d.startDate = startRef.current.value;
      d.endDate = endRef.current.value;
      d.frequency = frequencyRef.current.value;
      d.isRecurringPayment = true;
    }
    await transferAmount(d);
    setCustomer(await currentCustomer());
    alert(`$${amount} transferred`);
    amountRef.current.value = '';
  };
  const handleOnRecurringChange = () => {
    setIsRecurring(!isRecurring);
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
          {/*  Internal */}
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
              <span>&nbsp;&nbsp;to&nbsp;&nbsp;</span>
              <select ref={toRef}>
                {customer.accounts.filter((a) => a.isActive).map((a) => {
                  return <option key={a._id} value={a._id}>{a._id} (${a.balance})</option>;
                })}
              </select>
            </div>
            <input type="number" ref={amountRef} placeholder="Amount" className="small-margin-left" />

          </div>

          <div className="small-margin-top">
            Description <br />
            <textarea ref={descriptionRef} cols="50" rows="4" className="small-margin-top" />
          </div>
          <div className="small-margin-top">
            Is recurring&nbsp;&nbsp;
            <input type="checkbox" checked={isRecurring} onChange={handleOnRecurringChange} />
          </div>
          {isRecurring && (
          <div className="small-margin-top">
            Frequency <br />
            <div className="small-margin-top">
              <select ref={frequencyRef}>
                <option value="week">Week</option>
                <option value="month">Month</option>
                <option value="year">Annual</option>
              </select>
                  &nbsp;&nbsp;Start&nbsp;&nbsp;<input type="date" ref={startRef} />
                  &nbsp;&nbsp;End&nbsp;&nbsp;<input type="date" ref={endRef} />
            </div>
          </div>
          )}
          <div className="small-margin-top">
            <button className="button" onClick={handleOnTransfer}>Transfer</button>
          </div>
        </>
      ) : 'Loading your profile'}

    </div>
  );
};

export default CustomerTransact;
