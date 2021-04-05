import React from 'react';
import {Link} from "react-router-dom";

const Landing = props => {
    return (
        <div>
            <Link to="/customerLogin">Customer Login</Link>
            <Link to="/customerSignup">Customer Signup</Link>
        </div>
    );
};

Landing.propTypes = {};

export default Landing;