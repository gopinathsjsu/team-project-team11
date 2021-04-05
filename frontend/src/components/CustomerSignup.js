import React from 'react';
import { withRouter } from 'react-router-dom';
import { signupCustomer } from '../util/fetch/api';

function CustomerSignup({ history }) {
  const nameRef = React.useRef(null);
  const emailRef = React.useRef(null);
  const passwordRef = React.useRef(null);

  const handleOnSignup = async () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const { token } = await signupCustomer({ name, email, password });
    window.localStorage.setItem('token', token);
    history.push(window.appRoutes.customerHome);
  };

  return (
    <div className="center">
      <h2>Signup with us</h2>
      <div>
        <input type="text" name="name" placeholder="Name" ref={nameRef} />
      </div>
      <div>
        <input type="text" name="email" placeholder="Email" ref={emailRef} />
      </div>
      <div>
        <input type="password" name="password" placeholder="Password" ref={passwordRef} />
      </div>
      <div>
        <button className="button" onClick={handleOnSignup}>Sign up</button>
      </div>
    </div>
  );
}

export default withRouter(CustomerSignup);
