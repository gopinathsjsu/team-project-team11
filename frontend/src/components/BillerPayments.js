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
                            &nbsp;&nbsp;
              <span>to&nbsp;&nbsp;</span>
              <select ref={extToRef}>
                {[{ name: 'Electricity' }, { name: 'Water' }].map((e, i) => {
                  return <option key={i}>{e.name}</option>;
                })}
              </select>
            </div>
            <input type="number" ref={extAmountRef} placeholder="Amount" className="small-margin-left" />
            <button className="small-margin-left" onClick={handleOnExternalTransfer}>Transfer</button>
          </div>
        </>
      ) : 'Loading your profile'}

    </div>
  );
};

export default BillerPayments;
