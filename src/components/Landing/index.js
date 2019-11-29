import React from 'react';
import { Redirect } from 'react-router-dom';

const Landing = () => (
  <div>
    <h1>Landing!</h1>
    <Redirect to={'/home'} />
  </div>
);

export default Landing;
