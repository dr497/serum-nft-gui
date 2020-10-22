import { SettingOutlined } from '@ant-design/icons';
import { Button, Col, Menu, Popover, Row, Select } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import logo from '../assets/logo-deep.png';
import styled from 'styled-components';
import { useWallet, WALLET_PROVIDERS } from '../utils/wallet';
import { ENDPOINTS, useConnectionConfig } from '../utils/connection';
import Settings from './Settings';
import CustomClusterEndpointDialog from './CustomClusterEndpointDialog';
import { EndpointInfo } from '../utils/types';
import { notify } from '../utils/notifications';
import { Connection } from '@solana/web3.js';
import WalletConnect from './WalletConnect';
import { useWindowDimensions } from './utils';

const Wrapper = styled.div`
  background: #000;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 0px 30px;
  flex-wrap: wrap;
`;
const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  color: #2abdd2;
  font-weight: bold;
  cursor: pointer;
  img {
    height: 60px;
    margin: 10px;
  }
`;

export default function TopBar() {
  const { connected, wallet, providerUrl, setProvider } = useWallet();
  const {
    endpoint,
    endpointInfo,
    setEndpoint,
    availableEndpoints,
    setCustomEndpoints,
  } = useConnectionConfig();
  const [addEndpointVisible, setAddEndpointVisible] = useState(false);
  const [testingConnection, setTestingConnection] = useState(false);
  const location = useLocation();
  const history = useHistory();

  let windowDimensions = useWindowDimensions();

  const handleClick = useCallback(
    (e) => {
      history.push(e.key);
    },
    [history],
  );

  const onAddCustomEndpoint = (info: EndpointInfo) => {
    const existingEndpoint = availableEndpoints.some(
      (e) => e.endpoint === info.endpoint,
    );
    if (existingEndpoint) {
      notify({
        message: `An endpoint with the given url already exists`,
        type: 'error',
      });
      return;
    }

    const handleError = (e) => {
      console.log(`Connection to ${info.endpoint} failed: ${e}`);
      notify({
        message: `Failed to connect to ${info.endpoint}`,
        type: 'error',
      });
    };

    try {
      const connection = new Connection(info.endpoint, 'recent');
      connection
        .getEpochInfo()
        .then((result) => {
          setTestingConnection(true);
          console.log(`testing connection to ${info.endpoint}`);
          const newCustomEndpoints = [
            ...availableEndpoints.filter((e) => e.custom),
            info,
          ];
          setEndpoint(info.endpoint);
          setCustomEndpoints(newCustomEndpoints);
        })
        .catch(handleError);
    } catch (e) {
      handleError(e);
    } finally {
      setTestingConnection(false);
    }
  };

  const endpointInfoCustom = endpointInfo && endpointInfo.custom;
  useEffect(() => {
    const handler = () => {
      if (endpointInfoCustom) {
        setEndpoint(ENDPOINTS[0].endpoint);
      }
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, [endpointInfoCustom, setEndpoint]);

  return (
    <>
      <CustomClusterEndpointDialog
        visible={addEndpointVisible}
        testingConnection={testingConnection}
        onAddCustomEndpoint={onAddCustomEndpoint}
        onClose={() => setAddEndpointVisible(false)}
      />
      <Wrapper>
        <LogoWrapper>
          <img src={logo} alt="" onClick={() => history.push('/')} />
        </LogoWrapper>
        <Menu
          mode="horizontal"
          onClick={handleClick}
          selectedKeys={[location.pathname]}
          style={{
            borderBottom: 'none',
            backgroundColor: 'transparent',
            display: 'flex',
            alignItems: 'flex-end',
            flex: 1,
          }}
        >
          <Menu.Item key="/">Home</Menu.Item>
        </Menu>

        {windowDimensions.width > 1000 && (
          <>
            <div>
              <Row
                align="middle"
                style={{ paddingLeft: 5, paddingRight: 5 }}
                gutter={16}
              >
                <Col>
                  <Select
                    onSelect={setEndpoint}
                    value={endpoint}
                    style={{ marginRight: 8, width: '150px' }}
                  >
                    {availableEndpoints.map(({ name, endpoint }) => (
                      <Select.Option value={endpoint} key={endpoint}>
                        {name}
                      </Select.Option>
                    ))}
                  </Select>
                </Col>
              </Row>
            </div>
            {connected && (
              <div>
                <Popover
                  content={<Settings autoApprove={wallet?.autoApprove} />}
                  placement="bottomRight"
                  title="Settings"
                  trigger="click"
                >
                  <Button style={{ marginRight: 8 }}>
                    <SettingOutlined />
                    Settings
                  </Button>
                </Popover>
              </div>
            )}
            <div>
              <Select onSelect={setProvider} value={providerUrl}>
                {WALLET_PROVIDERS.map(({ name, url }) => (
                  <Select.Option value={url} key={url}>
                    {name}
                  </Select.Option>
                ))}
              </Select>
            </div>
          </>
        )}

        <div>
          <WalletConnect />
        </div>
      </Wrapper>
    </>
  );
}
