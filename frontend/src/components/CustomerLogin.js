import React, { useRef } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { loginCustomer } from '../util/fetch/api';

const CustomerLogin = ({ history }) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleOnLogin = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const { token } = await loginCustomer({ email, password });
    window.localStorage.setItem('token', token);
    history.push(window.appRoutes.customerProfile);
  };

  return (
    <div className="center">
      <h2>Customer Login</h2>
      <div>
        <input type="text" placeholder="Email" ref={emailRef} />
      </div>
      <div>
        <input type="password" placeholder="Password" ref={passwordRef} />
      </div>
      <div>
        <button className="button" onClick={handleOnLogin}>Log in</button>
      </div>
      <div className="small-margin-top">
        Dont have an account <Link to={window.appRoutes.customerSignup}>Sign up</Link>
      </div>
    </div>
  );
};

export default withRouter(CustomerLogin);
