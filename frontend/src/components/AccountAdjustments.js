import React, { useEffect, useState } from 'react';
import {
  DataGrid, GridCellParams, GridToolbar,
} from '@material-ui/data-grid';
import { getAccounts, updateAccountBalance } from '../util/fetch/api';

const AccountAdjustments = () => {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    (async () => {
      setAccounts(await getAccounts());
    })();
  }, []);

  const updateBalance = (acc, balance) => {
    const updatedAccounts = accounts.map((a) => {
      if (a._id === acc._id) {
        // eslint-disable-next-line no-param-reassign
        a.balance = balance;
      }
      return a;
    });
    setAccounts(updatedAccounts);
  };

  const saveBalance = async (account) => {
    await updateAccountBalance({ _id: account._id, balance: account.balance });
    alert(`Updated balance to ${account.balance}`);
  };

  const columns = [
    { field: 'id', headerName: 'Account ID', flex: 7.5 },
    {
      field: 'balance',
      headerName: 'Balance',
      flex: 5,
      renderCell: (params: GridCellParams) => (
        <input className="form-control" type="number" value={params.value}
          onChange={(e) => { updateBalance(params.value, e.target.value); }} />
      ),
    },
    { field: 'type', headerName: 'Account Type', flex: 7.5 },
    { field: 'name', headerName: 'Customer Name', flex: 7.5 },
    { field: 'email', headerName: 'Customer Email', flex: 7.5 },
    {
      field: 'action',
      headerName: 'Action',
      flex: 5,
      renderCell: (params: GridCellParams) => (
        <button className="btn button">Update balance</button>
      ),
    },
  ];

  return (

    <div className="body" style={{ height: 650, width: '100%' }}>
      <h2>Customer Account</h2>
      <DataGrid
        components={{
          Toolbar: GridToolbar,
        }}
        columns={columns}
        pageSize={9}
        rows={accounts.map((account) => {
          return {
            id: account._id,
            balance: account.balance,
            type: account.accountType,
            name: account.customer.name,
            email: account.customer.email,
            action: account,
          };
        })}
      />
    </div>
  );
};

export default AccountAdjustments;
