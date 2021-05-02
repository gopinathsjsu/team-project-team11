import React, { useEffect, useState } from 'react';
import {
  Link, useParams, withRouter,
} from 'react-router-dom';
import { currentCustomer, getAccountDetails, fileUrl } from '../util/fetch/api';

const AccountDetails = () => {
  const [customer, setCustomer] = useState(null);
  const [account, setAccount] = useState(null);
  const { accountId } = useParams();

  useEffect(() => {
    (async () => {
      setCustomer(await currentCustomer());
      setAccount(await getAccountDetails(accountId));
    })();
  }, []);

  return (
    <div className="body">
      {account ? (
        <>
          <div className="small-margin-top">
            <table className="table">
              <tbody>
                <tr key={1}>
                  <td><b>Account Holder: </b>{customer.customer.name}</td>
                </tr>
                <tr key={2}>
                  <td><b>Account Id: </b>{account._id}</td>
                  <td><b>Account type: </b>{account.accountType}</td>
                </tr>
                <tr key={3}>
                  <td><b>Balance: </b>${account.balance}</td>
                  <td><b>Account status: </b>{account.isActive ? 'Active' : 'Waiting for approval'}</td>
                </tr>
                <tr key={4}>
                  <td>
                    <b>Supporting documents:</b>
                    <div className="uploaded-file medium-margin-top">
                      {account.files.map((f) => {
                        return <img key={f} src={fileUrl(f)} alt={fileUrl(f)} />;
                      })}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="button"><Link to={{ pathname: '/customerHome/profile' }}>Back</Link></button>
          </div>

        </>
      ) : 'Loading account details'}
    </div>
  );
};

export default withRouter(AccountDetails);
