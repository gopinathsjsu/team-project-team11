import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="full">
      <h1 className="center">Welcome to UnitedBank</h1>
      <div className="flex flex-align-center">
        <div className="flex-full center">
          <div>Do you have an account?</div>
          <Link to="/customerLogin">Login here</Link>
        </div>
        <div className="flex-full center">
          <div>Do you want to create an account?</div>
          <Link to="/customerSignup">Signup here</Link>
        </div>
        <div className="flex-full center">
          <div>Are you a bank admin?</div>
          <Link to="/adminLogin">Login here</Link>
        </div>
      </div>
    </div>
  );
};

Landing.propTypes = {};

export default Landing;
