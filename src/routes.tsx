import React, { lazy } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import HomePage from './pages/HomePage';
import BasicLayout from './components/BasicLayout';

const TradePage = lazy(() => import('./pages/TradePage'));
const OpenOrdersPage = lazy(() => import('./pages/OpenOrdersPage'));
const BalancesPage = lazy(() => import('./pages/BalancesPage'));
const SearchPage = lazy(() => import('./pages/SearchPage'));
const BitcoinTram = lazy(() => import('./pages/BitcoinTram'));
const ListNFT = lazy(() => import('./pages/ListNFT'));

export function Routes() {
  return (
    <>
      <HashRouter basename={'/'}>
        <BasicLayout>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/trade/:marketAddress">
              <TradePage />
            </Route>
            <Route exact path="/trade">
              <TradePage />
            </Route>
            <Route exact path="/orders" component={OpenOrdersPage} />
            <Route exact path="/balances" component={BalancesPage} />
            <Route
              exact
              path="/search/:searchParameters"
              component={SearchPage}
            />
            <Route exact path="/bitcoin-tram" component={BitcoinTram} />
            <Route exact path="/list-nft" component={ListNFT} />
          </Switch>
        </BasicLayout>
      </HashRouter>
    </>
  );
}
