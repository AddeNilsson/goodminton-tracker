import React from 'react';
import { withAuthorization } from '../Session';

const Home = () => (
  <div>
    <h1>Home!</h1>
  </div>
);

const condition = user => !!user;
export default withAuthorization(condition)(Home);
