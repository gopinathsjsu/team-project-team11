import React, { useEffect, useState } from 'react';
import { currentCustomer, fileUrl } from '../util/fetch/api';
import FileUpload from './FileUpload';

const CustomerHome = () => {
  const [customer, setCustomer] = useState(null);
  const [filesUploaded, setFilesUploaded] = useState([]);
  const handleOnFileUpload = (f) => {
    setFilesUploaded(f.files);
  };

  useEffect(() => {
    (async () => {
      setCustomer(await currentCustomer());
    })();
  }, []);

  return (
    <div className="center">
      {customer ? (
        <>
          <h2>Hello {customer.name}!</h2>
          <div>{customer.email}</div>
          <div>You have {customer.accounts.length} account(s)</div>
          <div>
            Request for a new account
          </div>
          <div className="flex center flex-justify-content-space-around medium-margin-top">
            <button className="button">Open a savings account</button>
            <button className="button">Open a checking account</button>
          </div>
          <div>
            <FileUpload singleFile={false} onUpload={handleOnFileUpload} />
          </div>
          <div className="uploaded-file medium-margin-top">
            {filesUploaded.map((f) => {
              return <img key={f} src={fileUrl(f)} alt={fileUrl(f)} />;
            })}
          </div>

        </>
      ) : 'Loading your profile'}

    </div>
  );
};

export default CustomerHome;
