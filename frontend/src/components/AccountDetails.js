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
                <tr>
                  <td>Account Holder</td>
                  <td>{customer.customer.name}</td>
                </tr>
                <tr>
                  <td>Account Id</td>
                  <td>{account._id}</td>
                </tr>
                <tr>
                  <td>Account type</td>
                  <td>{account.accountType}</td>
                </tr>
                <tr>
                  <td>Balance</td>
                  <td>${account.balance}</td>
                </tr>
                <tr>
                  <td>Account status</td>
                  <td>{account.isActive ? 'Active' : 'Waiting for approval'}</td>
                </tr>
                <tr>
                  <td>
                    Supporting documents
                  </td>
                  <td>
                    <div className="uploaded-file">
                      {account.files.map((f) => {
                        return <img key={f} src={fileUrl(f)} alt={fileUrl(f)} />;
                      })}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <button className="button">
              <Link to={{ pathname: window.appRoutes.customerProfile }}>
                Back
              </Link>
            </button>
          </div>

        </>
      ) : 'Loading account details'}
    </div>
  );
};

export default withRouter(AccountDetails);
