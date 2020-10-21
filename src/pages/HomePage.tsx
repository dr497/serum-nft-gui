import React from 'react';
import NftCard from '../components/NftCard';
import { Col, Row } from 'antd';
import styled from 'styled-components';
import USE_NFTS from '../nfts';

const WrappedCol = styled(Col)`
  padding: 30px;
`;

const RowHomePage = ({ start, end }) => {
  return (
    <Row align="middle" justify="center">
      <Col flex="auto" />
      {USE_NFTS.slice(start, end).map((NFT, key) => {
        return (
          <WrappedCol>
            <NftCard
              key={key}
              img={NFT.img}
              name={NFT.name}
              supply={NFT.supply}
              mintAddress={NFT.mintAddress}
              sold={NFT.sold}
              marketAddress={NFT.marketAddress}
            />
          </WrappedCol>
        );
      })}
      <Col flex="auto" />
    </Row>
  );
};

const HomePage = () => {
  return (
    <>
      <RowHomePage start={0} end={3} />
      <RowHomePage start={3} end={6} />
      <RowHomePage start={6} end={9} />
      <RowHomePage start={9} end={10} />
    </>
  );
};

export default HomePage;
