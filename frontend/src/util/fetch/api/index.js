import {
  get, post, destroy, put, apiUrl,
} from '..';

export const signupCustomer = (d) => post('customer', d);
export const currentCustomer = () => get('customer');
export const updateCustomer = (d) => put('updateCustomer', d);
export const loginCustomer = (d) => post('loginCustomer', d);
export const loginAdmin = (d) => post('loginAdmin', d);
export const addAccount = (d) => post('addAccount', d);
export const getAccountRequests = () => get('accountRequests');
export const getAccountDetails = (d) => get(`accountDetails/${d}`);
export const approveAccountRequest = (d) => post('approveAccountRequest', d);
export const updateAccountBalance = (d) => post('accountBalance', d);
export const deleteAccount = (id) => destroy(`account/${id}`);
export const transferAmount = (d) => post('transferAmount', d);
export const transferExternalAmount = (d) => post('transferExternalAmount', d);
export const getAccounts = () => get('accounts');
export const getTransactions = () => get('transactions');
export const getScheduledTransactions = () => get('scheduled-transactions');

export const fileUrl = (fileId) => {
  return `${apiUrl}/file/${fileId}`;
};
