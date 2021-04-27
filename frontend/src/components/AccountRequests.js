import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridCellParams, GridToolbar } from '@material-ui/data-grid';
import { map } from "lodash"
import {
  approveAccountRequest, fileUrl, getAccountRequests, getAccounts,
} from '../util/fetch/api';

const AccountRequests = () => {
  const [accountRequests, setAccountRequests] = useState([]);

  useEffect(() => {
    (async () => {
      setAccountRequests(await getAccountRequests());
    })();
  }, []);

  const approveRequest = async (account) => {
    const initialBalance = prompt('Enter initial balance', 0);
    const balance = parseInt(initialBalance);
    if (Number.isNaN(balance)) {
      alert('Please enter a number');
    } else {
      await approveAccountRequest({ _id: account._id, balance });
      setAccountRequests(await getAccountRequests());
      alert('Account request has been approved');
    }
  };
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Account ID', flex: 7.5 },
    { field: 'balance', headerName: 'Balance', flex: 5 },
    { field: 'type', headerName: 'Account Type', flex: 5 },
    { field: 'name', headerName: 'Customer Name', flex: 5 },
    { field: 'email', headerName: 'Customer Email', flex: 5 },
    {
      field: 'action',
      headerName: 'Action',
      flex: 5,
      renderCell: (params: GridCellParams) => (
        <button style={{ marginLeft: 16, color: 'blue' }}
          onClick={(acc) => { approveRequest(params.value); }}
        >
          Approve
        </button>
      ),
    },
  ];
  console.log(accountRequests);
  return (
    <div className="body" style={{ height: 650, width: '100%' }}>
      <h2>Account requests</h2>
      <DataGrid
        components={{
          Toolbar: GridToolbar,
        }}
        columns={columns}
        pageSize={9}
        rows={map(accountRequests, account => {
          return {
            id: account._id,
            balance: account.balance,
            type: account.type,
            name: account.customer.name,
            email: account.customer.email,
            action: account
          }
        })}
      />

    </div>
  );
};

export default AccountRequests;
