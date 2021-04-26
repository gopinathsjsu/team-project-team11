import React, { useEffect, useState } from 'react';
import {
  addAccount, currentCustomer, fileUrl, updateCustomer,
} from '../util/fetch/api';
import FileUpload from './FileUpload';

const CustomerProfile = () => {
  const [accountType, setAccountType] = useState('saving');
  const [customer, setCustomer] = useState(null);
  const [filesUploaded, setFilesUploaded] = useState([]);
  const [accounts, setAccounts] = useState([]);

  const handleOnFileUpload = (f) => {
    setFilesUploaded(f.files);
  };

  const handleOnImageUpload = async ({ files }) => {
    const fileId = files[0];
    await updateCustomer({ profilePic: fileId });
    setCustomer({ ...customer, profilePic: fileId });
  };

  useEffect(() => {
    (async () => {
      const currCustomer = await currentCustomer();
      setCustomer(currCustomer);
      setAccounts(currCustomer.accounts);
    })();
  }, []);

  const handleSavingAccountChange = () => {
    setAccountType('saving');
  };

  const handleCheckingAccountChange = () => {
    setAccountType('checking');
  };

  const handleSelect = (e) => {
    if (e.target.value === 'all') {
      setAccounts(customer.accounts);
    } else {
      setAccounts(customer.accounts.filter((account) => account.accountType === e.target.value));
    }
  };

  const handleOnAccountRequest = async () => {
    if (filesUploaded.length === 0) {
      alert('Upload atleast one document to request new account');
    } else {
      await addAccount({ accountType, files: filesUploaded });
      setFilesUploaded([]);
      alert('Your request for a new account has been sent.');
    }
    const cust = await currentCustomer();
    setCustomer(cust);
    setAccounts(cust.accounts);
    setAccountType('saving');
  };

  return (
    <div className="body">
      {customer ? (
        <>

          <h2>Hello {customer.customer.name}!</h2>
          <div>{customer.email}</div>
          <div className="small-margin-top">
            <div className="imageTile">
              {customer.customer.profilePic
                ? <img src={fileUrl(customer.customer.profilePic)} alt="profile pic" height="200px" width="150px" />
                : <div>No pic uploaded</div>}
            </div>
            <div className="small-margin-top">
              <FileUpload singleFile onUpload={handleOnImageUpload} />
            </div>
          </div>

          <hr />
          <div>You have {customer.accounts.length} account(s)</div>

          <hr />

          <select defaultValue="all" onChange={handleSelect}>
            <option value="all">All</option>
            <option value="checking">Checking</option>
            <option value="saving">Savings</option>
          </select>

          <table className="table">
            <thead>
              <tr>
                <td>Account Id</td>
                <td>Account type</td>
                <td>Balance</td>
                <td>Account status</td>
              </tr>
            </thead>
            <tbody>
              {accounts.map((a) => {
                return (
                  <tr key={a._id}>
                    <td>{a._id}</td>
                    <td>{a.accountType}</td>
                    <td>${a.balance}</td>
                    <td>{a.isActive ? 'Active' : 'Waiting for approval'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <hr />

          <div className="small-margin-top">
            <h4 className="small-margin-top">Open a new account</h4>
            <div>
              <div className="small-margin-top">Account Type</div>
              <div className="small-margin-top">
                Savings
                &nbsp;&nbsp;
                <input type="radio" checked={accountType === 'saving'}
                  onChange={handleSavingAccountChange} />
                &nbsp;&nbsp;
                Checking
                &nbsp;&nbsp;
                <input type="radio" checked={accountType === 'checking'}
                  onChange={handleCheckingAccountChange} />
              </div>
              <div className="small-margin-top">Upload your documents</div>
              <div className="small-margin-top">
                <FileUpload singleFile={false} onUpload={handleOnFileUpload} />
              </div>
              <div className="uploaded-file medium-margin-top">
                {filesUploaded.map((f) => {
                  return <img key={f} src={fileUrl(f)} alt={fileUrl(f)} />;
                })}
              </div>
              <button className="button" onClick={handleOnAccountRequest}>Request account</button>
            </div>
          </div>

        </>
      ) : 'Loading your profile'}
    </div>
  );
};

export default CustomerProfile;
