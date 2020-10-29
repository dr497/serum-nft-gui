import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import TradePage from './pages/TradePage';
import OpenOrdersPage from './pages/OpenOrdersPage';
import BalancesPage from './pages/BalancesPage';
import BasicLayout from './components/BasicLayout';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import BitcoinTram from './pages/BitcoinTram';

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
