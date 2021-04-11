import React, { useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { loginAdmin } from '../util/fetch/api';

const AdminLogin = ({ history }) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleOnLogin = async () => {
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const { token } = await loginAdmin({ email, password });
    window.localStorage.setItem('token', token);
    history.push(window.appRoutes.adminHome);
  };

  return (
    <div className="center">
      <h2>Admin Login</h2>
      <div>
        (admin@unitedbank.com/admin)
      </div>
      <div>
        <input type="text" placeholder="Email" ref={emailRef} />
      </div>
      <div>
        <input type="password" placeholder="Password" ref={passwordRef} />
      </div>
      <div>
        <button className="button" onClick={handleOnLogin}>Log in</button>
      </div>
    </div>
  );
};

export default withRouter(AdminLogin);
