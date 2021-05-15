import React, { useEffect, useRef, useState } from 'react';
import { currentCustomer, transferExternalAmount } from '../util/fetch/api';

const BillerPayments = () => {
  const [customer, setCustomer] = useState(null);
  const [isRecurring, setIsRecurring] = useState(false);

  const extAmountRef = useRef(null);
  const extFromRef = useRef(null);
  const extToRef = useRef(null);
  const descriptionRef = useRef(null);
  const frequencyRef = useRef(null);
  const startRef = useRef(null);
  const endRef = useRef(null);

  const handleOnExternalTransfer = async () => {
    const from = extFromRef.current.value;
    const amount = extAmountRef.current.value;
    const toExternal = extToRef.current.value;
    const description = descriptionRef.current.value;
    const isRecurringPayment = isRecurring;

    if (amount === '') {
      alert('Amount cant be empty');
      return;
    }
    const d = {
      from, amount, description, toExternal,
    };

    if (isRecurringPayment) {
      d.startDate = startRef.current.value;
      d.endDate = endRef.current.value;
      d.frequency = frequencyRef.current.value;
      d.isRecurringPayment = true;
    }

    await transferExternalAmount(d);
    setCustomer(await currentCustomer());
    alert(`$${amount} transferred`);
    extAmountRef.current.value = '';
  };

  useEffect(() => {
    (async () => {
      setCustomer(await currentCustomer());
    })();
  }, []);

  const handleOnRecurringChange = () => {
    setIsRecurring(!isRecurring);
  };

  return customer
    ? (
      <div className="body">
        <h2>Transfer to external accounts</h2>
        <div className="flex">
          <div>
            <span>From&nbsp;&nbsp;</span>
            <select ref={extFromRef}>
              {customer.accounts.filter((a) => a.isActive).map((a) => {
                return <option key={a._id} value={a._id}>{a._id} (${a.balance})</option>;
              })}
            </select>
          </div>
          <div>
            <span>&nbsp;&nbsp;to&nbsp;&nbsp;</span>
            <select ref={extToRef}>
              {[{ name: 'Electricity' }, { name: 'Water' }].map((e, i) => {
                return <option key={i}>{e.name}</option>;
              })}
            </select>
          </div>
          <input type="number" ref={extAmountRef} placeholder="Amount" className="small-margin-left" />
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
          <button className="button" onClick={handleOnExternalTransfer}>Transfer</button>
        </div>
      </div>
    )
    : <div>Loading customer</div>;
};

export default BillerPayments;
