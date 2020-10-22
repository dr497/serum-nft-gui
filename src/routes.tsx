import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import TradePage from './pages/TradePage';
import OpenOrdersPage from './pages/OpenOrdersPage';
import BalancesPage from './pages/BalancesPage';
import BasicLayout from './components/BasicLayout';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';

export function Routes() {
  return (
    <>
      <HashRouter basename={'/'}>
        <BasicLayout>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/trade" component={TradePage} />
          <Route exact path="/orders" component={OpenOrdersPage} />
          <Route exact path="/balances" component={BalancesPage} />
          <Route exact path="/search" component={SearchPage} />
        </BasicLayout>
      </HashRouter>
    </>
  );
}
