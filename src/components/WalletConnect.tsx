import React from 'react';
import { Button, Popover } from 'antd';
import {
  InfoCircleOutlined,
  LockOutlined,
  UnlockOutlined,
} from '@ant-design/icons';
import { useWallet } from '../utils/wallet';
import LinkAddress from './LinkAddress';

export default function WalletConnect() {
  const { connected, wallet } = useWallet();
  const publicKey = wallet?.publicKey?.toBase58();

  return (
    <React.Fragment>
      <Button
        ghost
        type="text"
        size="large"
        onClick={connected ? wallet.disconnect : wallet.connect}
        style={{
          color: 'white',
        }}
      >
        {!connected ? <LockOutlined /> : <UnlockOutlined />}
        {!connected ? 'Connect wallet' : 'Disconnect'}
      </Button>
      {connected && (
        <Popover
          content={<LinkAddress address={publicKey} />}
          placement="bottomRight"
          title="Wallet public key"
          trigger="click"
        >
          <InfoCircleOutlined style={{ color: 'white' }} />
        </Popover>
      )}
    </React.Fragment>
  );
}
