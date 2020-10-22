import React from 'react';
import NftCard from '../components/NftCard';
import { Col, Row } from 'antd';
import styled from 'styled-components';
import USE_NFTS from '../nfts';
import { useWindowDimensions } from '../components/utils';

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
  let windowDimensions = useWindowDimensions();
  return (
    <>
      {windowDimensions.width > 1600 && (
        <>
          <RowHomePage start={0} end={3} />
          <RowHomePage start={3} end={6} />
          <RowHomePage start={6} end={9} />
          <RowHomePage start={9} end={10} />
        </>
      )}
      {1100 < windowDimensions.width && windowDimensions.width < 1600 && (
        <>
          <RowHomePage start={0} end={2} />
          <RowHomePage start={2} end={4} />
          <RowHomePage start={4} end={6} />
          <RowHomePage start={6} end={8} />
          <RowHomePage start={8} end={10} />
        </>
      )}
      {windowDimensions.width < 1100 && (
        <>
          {USE_NFTS.map((NFT, key) => {
            return (
              <WrappedCol style={{ paddingRight: '10%', paddingLeft: '10%' }}>
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
        </>
      )}
    </>
  );
};

export default HomePage;
