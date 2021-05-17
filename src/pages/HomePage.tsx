import React from 'react';
import NftCard from '../components/NftCard';
import { Col, Row, Typography } from 'antd';
import styled from 'styled-components';
import USE_NFTS, { USE_REDEEMABLE_NFTS } from '../nfts';
import { useWindowDimensions } from '../components/utils';
import CustomDivider from '../components/CustomDivider';
import Space from '../components/Space';

const { Title } = Typography;

export const WrappedCol = styled(Col)`
  padding: 30px;
`;

const CenteredDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  padding-bottom: 20px;
`;

const RowCard = ({ start, end, array }) => {
  return (
    <Row align="middle" justify="center">
      <Col flex="auto" />
      {array.slice(start, end).map((NFT, key) => {
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

const HomePageRow = ({ divider, longueur, array }) => {
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

const HomePage = () => {
  const styles = {
    title: {
      fontSize: '80px',
      fontWeight: 300,
      textAlign: 'center',
      color: 'white',
      marginBottom: 0,
    } as React.CSSProperties,
  };
  const windowDimensions = useWindowDimensions();
  const longueur = USE_NFTS.length;
  return (
    <>
      {windowDimensions.width > 1600 && (
        <>
          <Title level={2} style={styles.title}>
            SHOP.
          </Title>
          <CenteredDiv>
            <CustomDivider
              fromColor={'#3333ff'}
              toColor={'#8080ff'}
              width={300}
            />
          </CenteredDiv>
          <HomePageRow
            divider={3}
            longueur={longueur}
            array={USE_REDEEMABLE_NFTS}
          />
          <Space height={40} />
          <Title level={2} style={styles.title}>
            NFT.
          </Title>
          <CenteredDiv>
            <CustomDivider
              fromColor={'#3333ff'}
              toColor={'#8080ff'}
              width={300}
            />
          </CenteredDiv>
          <HomePageRow divider={3} longueur={longueur} array={USE_NFTS} />
        </>
      )}
      {1100 < windowDimensions.width && windowDimensions.width < 1600 && (
        <>
          <Title level={2} style={styles.title}>
            SHOP.
          </Title>
          <CenteredDiv>
            <CustomDivider
              fromColor={'#3333ff'}
              toColor={'#8080ff'}
              width={300}
            />
          </CenteredDiv>
          <HomePageRow
            divider={2}
            longueur={longueur}
            array={USE_REDEEMABLE_NFTS}
          />
          <Space height={40} />
          <Title level={2} style={styles.title}>
            NFT.
          </Title>
          <CenteredDiv>
            <CustomDivider
              fromColor={'#3333ff'}
              toColor={'#8080ff'}
              width={300}
            />
          </CenteredDiv>
          <HomePageRow divider={2} longueur={longueur} array={USE_NFTS} />
        </>
      )}
      {windowDimensions.width < 1100 && (
        <>
          <Title level={2} style={styles.title}>
            SHOP.
          </Title>
          <CenteredDiv>
            <CustomDivider
              fromColor={'#3333ff'}
              toColor={'#8080ff'}
              width={300}
            />
          </CenteredDiv>
          {USE_REDEEMABLE_NFTS.map((NFT, key) => {
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
          <Title level={2} style={styles.title}>
            NFT.
          </Title>
          <CenteredDiv>
            <CustomDivider
              fromColor={'#3333ff'}
              toColor={'#8080ff'}
              width={300}
            />
          </CenteredDiv>
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
