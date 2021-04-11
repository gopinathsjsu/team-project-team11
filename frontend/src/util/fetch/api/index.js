import {
  get, post, destroy, put, apiUrl,
} from '..';

export const signupCustomer = (d) => post('customer', d);
export const currentCustomer = () => get('customer');
export const loginCustomer = (d) => post('loginCustomer', d);
export const loginAdmin = (d) => post('loginAdmin', d);

export const fileUrl = (fileId) => {
  return `${apiUrl}/file/${fileId}`;
};
