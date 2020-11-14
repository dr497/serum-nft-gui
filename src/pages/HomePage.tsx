import React from 'react';
import NftCard from '../components/NftCard';
import { Col, Row } from 'antd';
import styled from 'styled-components';
import USE_NFTS from '../nfts';
import { useWindowDimensions } from '../components/utils';

export const WrappedCol = styled(Col)`
  padding: 30px;
`;

const RowCard = ({ start, end, array }) => {
  return (
    <Row align="middle" justify="center">
      <Col flex="auto" />
      {array.slice(start, end).map((NFT, key) => {
        return (
          <WrappedCol key={key}>
            <NftCard nft={NFT} />
          </WrappedCol>
        );
      })}
      <Col flex="auto" />
    </Row>
  );
};

const HomePageRow = ({ divider, longueur, array }) => {
  const quotien = Math.floor(longueur / divider);
  const reste = longueur % divider;
  const MAP_ARRAY = Array.from({ length: quotien }, (v, i) => i);
  if (quotien === 0) {
    return <RowCard start={0} end={reste} array={array} />;
  }
  return (
    <>
      {MAP_ARRAY.map((e, key) => {
        return (
          <RowCard
            key={key}
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

const HomePage = () => {
  const windowDimensions = useWindowDimensions();
  const longueur = USE_NFTS.length;
  return (
    <>
      {windowDimensions.width > 1600 && (
        <>
          <HomePageRow divider={3} longueur={longueur} array={USE_NFTS} />
        </>
      )}
      {1100 < windowDimensions.width && windowDimensions.width < 1600 && (
        <>
          <HomePageRow divider={2} longueur={longueur} array={USE_NFTS} />
        </>
      )}
      {windowDimensions.width < 1100 && (
        <>
          {USE_NFTS.map((NFT, key) => {
            return (
              <Row style={{ padding: 20 }} align="middle" justify="center">
                <Col flex="auto" />
                <Col>
                  <NftCard key={key} nft={NFT} />
                </Col>
                <Col flex="auto" />
              </Row>
            );
          })}
        </>
      )}
    </>
  );
};

export default HomePage;
