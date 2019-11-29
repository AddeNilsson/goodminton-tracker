import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppHeader from './components/AppHeader';
import Menu from './components/Menu';
import Routes from './Routes';
import { withAuthentication } from './components/Session';

const AppBarHeight = 50;

const App = () => {
  const [menuOpen, toggleMenu] = useState(false);
  console.log('todo: pswforget & pswchange');
  return (
      <Router>
        <>
        <AppHeader handleMenu={() => toggleMenu(!menuOpen)} height={AppBarHeight} />
        <Menu closeMenu={() => toggleMenu(false)} open={menuOpen} />
        <main style={{ marginTop: AppBarHeight }}>
          <Routes />
        </main>
        </>
    </Router>
  );
}

export default withAuthentication(App);
