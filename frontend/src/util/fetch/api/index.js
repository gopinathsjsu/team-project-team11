import {
  get, post, destroy, put, apiUrl,
} from '..';

export const signupCustomer = (d) => post('customer', d);
export const currentCustomer = () => get('customer');
export const loginCustomer = (d) => post('loginCustomer', d);
