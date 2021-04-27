import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef, GridCellParams } from '@material-ui/data-grid';
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
    { field: 'id', headerName: 'Account ID', flex: 5 },
    { field: 'balance', headerName: 'Balance', flex: 5 },
    { field: 'type', headerName: 'Account Type', flex: 5 },
    { field: 'name', headerName: 'Customer Name', flex: 5 },
    { field: 'email', headerName: 'Customer Email', flex: 5 },
    {
      field: '',
      headerName: 'btn',
      renderCell: (params: GridCellParams) => (
        <button style={{ marginLeft: 16, color: 'blue' }}>Approve</button>
      ),
    },
  ];
  console.log({accountRequests});
  return (
    

    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        columns={columns}
        
        rows={accountRequests}
        pageSize={10}
      />
    </div>
  );

  // return (
  //   <div className="body">
  //     <h2>Account requests</h2>
  //     <div>
  //       <div>{accountRequests.length === 0 && 'You have no new requests to approve'}</div>
  //       <table className="table">
  //         <thead>
  //           <tr>
  //             <td>Account ID</td>
  //             <td>Balance</td>
  //             <td>Account Type</td>
  //             <td>Customer Name</td>
  //             <td>Customer Email</td>
  //             <td>&nbsp;</td>
  //           </tr>
  //         </thead>
  //         <tbody>
  //           {accountRequests.map((account) => {
  //             return (
  //               <React.Fragment key={account._id}>
  //                 <tr>
  //                   <td>{account._id}</td>
  //                   <td>${account.balance}</td>
  //                   <td>{account.type}</td>
  //                   <td>{account.customer.name}</td>
  //                   <td>{account.customer.email}</td>
  //                   <td>
  //                     <button onClick={(acc) => { approveRequest(account); }}>
  //                       Approve
  //                     </button>
  //                   </td>
  //                 </tr>
  //                 <tr className="border-bottom">
  //                   <td colSpan={6}>
  //                     <div className="uploaded-file medium-margin-top">
  //                       {account.files.map((f) => {
  //                         return <img key={f} src={fileUrl(f)} alt={fileUrl(f)} />;
  //                       })}
  //                     </div>
  //                   </td>
  //                 </tr>
  //               </React.Fragment>
  //             );
  //           })}
  //         </tbody>
  //       </table>
  //     </div>
  //   </div>
  // );
};

export default AccountRequests;
