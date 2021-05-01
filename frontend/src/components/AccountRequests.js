import React, { useEffect, useState } from 'react';
import { DataGrid, GridToolbar } from '@material-ui/data-grid';
import CustomNoRowsOverlay from './Overlay';
import {
  approveAccountRequest,
  getAccountRequests,
} from '../util/fetch/api';

const AccountRequests = () => {
  const [accountRequests, setAccountRequests] = useState([]);
  useEffect(() => {
    (
      async () => {
        setAccountRequests(await getAccountRequests());
      }
    )();
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

  const columns = [
    { field: 'id', headerName: 'Account ID', flex: 7.5 },
    { field: 'balance', headerName: 'Balance', flex: 5 },
    { field: 'type', headerName: 'Account Type', flex: 5 },
    { field: 'name', headerName: 'Customer Name', flex: 5 },
    { field: 'email', headerName: 'Customer Email', flex: 5 },
    {
      field: 'action',
      headerName: 'Action',
      flex: 5,
      renderCell: (params) => (
        <button className="small-margin-left"
          onClick={() => { approveRequest(params.value); }}
        >
          Approve
        </button>
      ),
    },
  ];

  return (
    <div className="body" style={{ height: 650, width: '100%' }}>
      <h2>Account requests</h2>
      <DataGrid
        pageSize={9}
        columns={columns}
        rows={accountRequests.map((account) => {
          return {
            id: account._id,
            balance: account.balance,
            type: account.accountType,
            name: account.customer.name,
            email: account.customer.email,
            action: account,
          };
        })}
        components={{
          Toolbar: GridToolbar,
          NoRowsOverlay: CustomNoRowsOverlay,
        }}
      />

    </div>
  );
};

export default AccountRequests;
