import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className="full">
      <div className="header">
        <div className="center">
          Welcome to UnitedBank
        </div>
      </div>
      <div className="flex flex-align-center medium-margin-top">
        <div className="flex-full center landing-block">
          <div>Do you have an account?</div>
          <Link to={window.appRoutes.customerLogin}>Login here</Link>
        </div>
        <div className="flex-full center landing-block">
          <div>Do you want to create an account?</div>
          <Link to={window.appRoutes.customerSignup}>Signup here</Link>
        </div>
        <div className="flex-full center landing-block">
          <div>Are you a bank admin?</div>
          <Link to={window.appRoutes.adminLogin}>Login here</Link>
        </div>
      </div>
    </div>
  );
};

Landing.propTypes = {};

export default Landing;
