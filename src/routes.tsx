import React, { lazy } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import HomePage from './pages/HomePage';
import BasicLayout from './components/BasicLayout';

const TradePage = lazy(() => import('./pages/TradePage'));
const OpenOrdersPage = lazy(() => import('./pages/OpenOrdersPage'));
const BalancesPage = lazy(() => import('./pages/BalancesPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const BitcoinTram = lazy(() => import('./pages/BitcoinTram'));

export function Routes() {
  return (
    <>
      <HashRouter basename={'/'}>
        <BasicLayout>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/trade" component={TradePage} />
            <Route exact path="/orders" component={OpenOrdersPage} />
            <Route exact path="/balances" component={BalancesPage} />
            <Route
              exact
              path="/search/:searchParameters"
              component={SearchPage}
            />
            <Route exact path="/bitcoin-tram" component={BitcoinTram} />
          </Switch>
        </BasicLayout>
      </HashRouter>
    </>
  );
}
