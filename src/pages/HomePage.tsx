import React from 'react';
import NftCard from '../components/NftCard';
import { Col, Row } from 'antd';
import styled from 'styled-components';
import USE_NFTS from '../nfts';
import { useWindowDimensions } from '../components/utils';

export const WrappedCol = styled(Col)`
  padding: 30px;
`;

const RowHomePage = ({ start, end }) => {
  return (
    <Row align="middle" justify="center">
      <Col flex="auto" />
      {USE_NFTS.slice(start, end).map((NFT, key) => {
        return (
          <WrappedCol>
            <NftCard key={key} nft={NFT} />
          </WrappedCol>
        );
      })}
      <Col flex="auto" />
    </Row>
  );
};

const HomePage = () => {
  const windowDimensions = useWindowDimensions();
  return (
    <>
      {windowDimensions.width > 1600 && (
        <>
          <RowHomePage start={0} end={3} />
          <RowHomePage start={3} end={6} />
          <RowHomePage start={6} end={9} />
          <RowHomePage start={9} end={12} />
          <RowHomePage start={12} end={15} />
        </>
      )}
      {1100 < windowDimensions.width && windowDimensions.width < 1600 && (
        <>
          <RowHomePage start={0} end={2} />
          <RowHomePage start={2} end={4} />
          <RowHomePage start={4} end={6} />
          <RowHomePage start={6} end={8} />
          <RowHomePage start={9} end={12} />
          <RowHomePage start={12} end={15} />
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
