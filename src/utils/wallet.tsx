import React, { useContext, useEffect, useMemo, useState } from 'react';
import Wallet from '@project-serum/sol-wallet-adapter';
import { notify } from './notifications';
import { useConnectionConfig } from './connection';
import { useLocalStorageState } from './utils';
import { WalletContextValues } from './types';
import { SolongAdapter } from './solong_adapter';

export const WALLET_PROVIDERS = [
  { name: 'sollet.io', url: 'https://www.sollet.io' },
  { name: 'Bonfida', url: 'https://bonfida.com/wallet' },
  { name: 'solong', url: 'https://solongwallet.com/' },
];

const WalletContext = React.createContext<null | WalletContextValues>(null);

export function WalletProvider({ children }) {
  const { endpoint } = useConnectionConfig();

  const [savedProviderUrl, setProviderUrl] = useLocalStorageState(
    'walletProvider',
    'https://www.sollet.io',
  );
  let providerUrl;
  if (!savedProviderUrl) {
    providerUrl = 'https://www.sollet.io';
  } else {
    providerUrl = savedProviderUrl;
  }

  const wallet: any = useMemo(() => {
    if (providerUrl === 'https://solongwallet.com/') {
      return new SolongAdapter(providerUrl, endpoint);
    } else {
      return new Wallet(providerUrl, endpoint);
    }
  }, [providerUrl, endpoint]);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    console.log('trying to connect');
    wallet.on('connect', () => {
      console.log('connected');
      setConnected(true);
      let walletPublicKey = wallet.publicKey.toBase58();
      let keyToDisplay =
        walletPublicKey.length > 20
          ? `${walletPublicKey.substring(0, 7)}.....${walletPublicKey.substring(
              walletPublicKey.length - 7,
              walletPublicKey.length,
            )}`
          : walletPublicKey;
      notify({
        message: 'Wallet update',
        description: 'Connected to wallet ' + keyToDisplay,
      });
    });
    wallet.on('disconnect', () => {
      setConnected(false);
      notify({
        message: 'Wallet update',
        description: 'Disconnected from wallet',
      });
    });
    return () => {
      wallet.disconnect();
      setConnected(false);
    };
  }, [wallet]);

  return (
    <WalletContext.Provider
      value={{
        wallet,
        connected,
        providerUrl,
        setProviderUrl,
        providerName:
          WALLET_PROVIDERS.find(({ url }) => url === providerUrl)?.name ??
          providerUrl,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('Missing wallet context');
  }
  return {
    connected: context.connected,
    wallet: context.wallet,
    providerUrl: context.providerUrl,
    setProvider: context.setProviderUrl,
    providerName: context.providerName,
  };
}
