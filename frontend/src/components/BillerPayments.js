import React, { useEffect, useRef, useState } from 'react';
import { currentCustomer, transferExternalAmount } from '../util/fetch/api';

const BillerPayments = () => {
  const [customer, setCustomer] = useState(null);

  const extAmountRef = useRef(null);
  const extFromRef = useRef(null);
  const extToRef = useRef(null);

  const handleOnExternalTransfer = async () => {
    const from = extFromRef.current.value;
    const amount = extAmountRef.current.value;
    const toExternal = extToRef.current.value;
    if (amount === '') {
      alert('Amount cant be empty');
      return;
    }
    await transferExternalAmount({ toExternal, from, amount });
    setCustomer(await currentCustomer());
    alert(`$${amount} transferred`);
    extAmountRef.current.value = '';
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
          <h2>Transfer to external accounts</h2>
          <div className="flex-column">
            <div className="medium-margin-top flex">
              <div className="fixed-width-tags medium-margin-right bolder-text">From&nbsp;&nbsp;</div>
              <select ref={extFromRef}>
                {customer.accounts.filter((a) => a.isActive).map((a) => {
                  return <option key={a._id} value={a._id}>{a._id} (${a.balance})</option>;
                })}
              </select>
            </div>
            <div className="medium-margin-top flex">
              <div className="fixed-width-tags medium-margin-right  bolder-text">Select Biller&nbsp;&nbsp;</div>
              <div><select ref={extToRef}>
                {[{ name: 'Electricity' }, { name: 'Water' }].map((e, i) => {
                  return <option key={i}>{e.name}</option>;
                })}
              </select></div>
            </div>

            <div className="medium-margin-top flex">
              <div className="fixed-width-tags medium-margin-right bolder-text">Amount&nbsp;&nbsp;</div>
              <input type="number" ref={extAmountRef} placeholder="Amount" />
            </div>
            <div><button className="large-margin-top button large-margin-left  fixed-width-tags" onClick={handleOnExternalTransfer}>Transfer</button></div>
          </div>
        </>
      ) : 'Loading your profile'}

    </div>
  );
};

export default BillerPayments;
