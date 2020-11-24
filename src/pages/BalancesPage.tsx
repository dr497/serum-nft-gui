import React, { useState, useEffect } from 'react';
import { Row, Col, Typography } from 'antd';
import {
  useAllOpenOrdersBalances,
  useWalletBalancesForAllMarkets,
} from '../utils/markets';
import { useWindowDimensions } from '../components/utils';
import { NFT, useNFTs } from '../nfts';
import { NftCardBalance } from '../components/NftCard';
import styled from 'styled-components';
import { useWallet } from '../utils/wallet';
import notConnected from '../assets/not-connected.gif';
import notFoundGif from '../assets/not-found.gif';
import { JsxEmit } from 'typescript';
const { Title } = Typography;

const WrappedCol = styled(Col)`
  padding: 30px;
`;

const RowCard = ({ start, end, array }) => {
  return (
    <Row align="middle" justify="center">
      <Col flex="auto" />
      {array?.slice(start, end).map((balance: any, key: number) => {
        return (
          <>
            <WrappedCol key={key}>
              <NftCardBalance
                img={balance.nft.imgSmall}
                name={balance.nft.name}
                supply={balance.nft.supply}
                mintAddress={balance.nft.mintAddress}
                marketAddress={balance.nft.marketAddress}
                walletBalance={balance.walletBalance}
              />
            </WrappedCol>
          </>
        );
      })}
      <Col flex="auto" />
    </Row>
  );
};

const BalanceRow = ({ divider, longueur, array }) => {
  const quotien = Math.floor(longueur / divider);
  const reste = longueur % divider;
  const MAP_ARRAY = Array.from({ length: quotien }, (v, i) => i);
  if (quotien === 0) {
    return <RowCard start={0} end={reste} array={array} />;
  }
  return (
    <>
      {MAP_ARRAY.map((e) => {
        return (
          <RowCard
            start={divider * e}
            end={divider * e + divider}
            array={array}
          />
        );
      })}
      <RowCard start={longueur - reste} end={longueur} array={array} />
    </>
  );
};

const TopPage = () => {
  const { connected } = useWallet();
  return (
    <>
      <Row style={{ paddingTop: '50px' }} align="middle" justify="center">
        <Col flex="auto" />
        <Col>
          {connected ? (
            <Title level={2} style={{ textAlign: 'center' }}>
              Your Collection
            </Title>
          ) : (
            <Title level={2}>Connect your wallet</Title>
          )}
        </Col>
        <Col flex="auto" />
      </Row>
      <Row style={{ paddingTop: '10px' }} align="middle" justify="center">
        <Col flex="auto" />
        <Col>
          {connected ? null : (
            <img
              src={notConnected}
              height="300px"
              alt="not connected"
              style={{ borderRadius: '20px' }}
            />
          )}
        </Col>
        <Col flex="auto" />
      </Row>
    </>
  );
};

interface BalanceData {
  nft: NFT;
  mint: string;
  walletBalance: number;
  openOrdersFree: number;
  openOrdersTotal: number; 
}

export default function BalancesPage() {
  const walletBalances = useWalletBalancesForAllMarkets();
  const openOrdersBalances = useAllOpenOrdersBalances();
  const windowDimensions = useWindowDimensions();
  const { connected } = useWallet();
  const mintAddresses = walletBalances.map((w) => w.mint);
  const [NFTs, setFilter] = useNFTs({
    mintAddress: mintAddresses,
  });
  const [data, setData] = useState<BalanceData[]>([]);

  // todo: here needs test
  useEffect(() => {
    if (!connected) return;
    let tempArray : BalanceData[] = [];
    for (let nft of NFTs) {
      let idx = mintAddresses.indexOf(nft.mintAddress.toString());
      if (idx > -1 && walletBalances[idx].balance > 0) {
        let e : BalanceData= {
          nft: nft,
          mint: mintAddresses[idx],
          walletBalance: walletBalances[idx].balance,
          openOrdersFree: 0,
          openOrdersTotal: 0,
        };

        for (let openOrdersAccount of openOrdersBalances[mintAddresses[idx]] ||
          []) {
          e['openOrdersFree'] += openOrdersAccount.free;
          e['openOrdersTotal'] += openOrdersAccount.total;
        }
        tempArray.push(e);
      }
    }
    setData(tempArray);

  }, [connected, NFTs.length]);

  const longueur = data.length;

  return (
    <>
      <TopPage />
      {longueur === 0 && connected && (
        <Row style={{ paddingTop: '50px' }}>
          <Col flex="auto" />
          <Col>
            <Title level={2}>You don't have any NFT in your collection</Title>
            <img src={notFoundGif} width="100%" alt="not found" />
          </Col>
          <Col flex="auto" />
        </Row>
      )}
      {windowDimensions.width > 1600 && (
        <BalanceRow divider={3} longueur={longueur} array={data} />
      )}
      {1100 < windowDimensions.width && windowDimensions.width < 1600 && (
        <BalanceRow divider={2} longueur={longueur} array={data} />
      )}
      {windowDimensions.width < 1100 && (
        <>
          {data.map((balance, key) => {
            return (
              <WrappedCol
                style={{ paddingRight: '10%', paddingLeft: '10%' }}
                key={key}
              >
                <NftCardBalance
                  img={balance.nft?.img}
                  name={balance.nft?.name}
                  supply={balance.nft?.supply}
                  mintAddress={balance.nft?.mintAddress}
                  marketAddress={balance.nft?.marketAddress}
                  walletBalance={balance.walletBalance}
                />
              </WrappedCol>
            );
          })}
        </>
      )}
    </>
  );
}
