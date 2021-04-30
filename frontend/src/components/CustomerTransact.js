import React, { useEffect, useRef, useState } from 'react';
import { currentCustomer, transferAmount } from '../util/fetch/api';

const CustomerTransact = () => {
  const [customer, setCustomer] = useState(null);
  const amountRef = useRef(null);
  const fromRef = useRef(null);
  const toRef = useRef(null);
  const frequencyRef = useRef(null);
  const [isExternalTransfer, setIsExternalTransfer] = useState(false);
  const [isRecurringPayment, setIsRecurringPayment] = useState(false);

  const handleOnTransfer = async () => {
    const from = fromRef.current.value;
    const to = toRef.current.value;
    const amount = amountRef.current.value;

    const frequency = frequencyRef && frequencyRef.current ? frequencyRef.current.value : null;
    if (from === to) {
      alert('Cannot transfer between same accounts');
      return;
    }
    if (amount === '') {
      alert('Amount cant be empty');
      return;
    }

    if (isExternalTransfer && to === '') {
      alert('Payee account number cant be empty');
      return;
    }
    await transferAmount({
      from, to, amount, isRecurringPayment, frequency,
    });
    setCustomer(await currentCustomer());
    alert(`$${amount} transferred`);
    amountRef.current.value = '';
  };

  useEffect(() => {
    (async () => {
      setCustomer(await currentCustomer());
    })();
  }, []);

  const loadCustomerTransactionPage = () => {
    if (customer) {
      return customer.accounts.filter((a) => a.isActive).length > 0
        ? (
          <div>
            <h2>Transact between accounts</h2>
            <div className="flex-column">
              <div className="medium-margin-top flex">
                <div className="fixed-width-tags medium-margin-right bolder-text">Is this an exteral transfer?&nbsp;&nbsp;</div>
                <input type="checkbox" value={isExternalTransfer} onClick={(event) => {
                  setIsExternalTransfer(!isExternalTransfer);
                }} />
              </div>
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
                {isExternalTransfer ? (
                  <input type="text" ref={toRef} placeholder="Account Number" />)
                  : (
                    <select ref={toRef}>
                      {customer.accounts.filter((a) => a.isActive).map((a) => {
                        return <option key={a._id} value={a._id}>{a._id} (${a.balance})</option>;
                      })}
                    </select>
                  )}
              </div>
              <div className="medium-margin-top flex">
                <div className="fixed-width-tags medium-margin-right bolder-text">Amount&nbsp;&nbsp;</div>
                <input type="number" ref={amountRef} placeholder="Amount" />
              </div>

              <div className="medium-margin-top flex">
                <div className="fixed-width-tags medium-margin-right bolder-text">Do you want to repeat this transaction?&nbsp;&nbsp;</div>
                <input type="checkbox" value={isRecurringPayment} onClick={(event) => {
                  setIsRecurringPayment(!isRecurringPayment);
                }} />
              </div>

              {isRecurringPayment ? (
                <div className="medium-margin-top flex">
                  <div className="fixed-width-tags medium-margin-right bolder-text">Select frequency&nbsp;&nbsp;</div>
                  <select ref={frequencyRef}>
                    <option key="W" value="W">Weekly</option>;
                    <option key="M" value="M">Monthly</option>;
                  </select>
                </div>
              ) : null}
              <div><button className="large-margin-top button large-margin-left  fixed-width-tags" onClick={handleOnTransfer}>Transfer</button></div>
            </div>
          </div>
        ) : (
          <h2>You dont have any account added yet.
            Please request for an account to use this feature</h2>
        );
    }
    return 'Loading your profile';
  };

  return (
    <div className="body">
      {loadCustomerTransactionPage()}
    </div>
  );
};

export default CustomerTransact;
