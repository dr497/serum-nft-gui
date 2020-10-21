import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Col, Row } from 'antd';
import styled from 'styled-components';
import Orderbook from '../components/Orderbook';
import UserInfoTable from '../components/UserInfoTable';
import StandaloneBalancesDisplay from '../components/StandaloneBalancesDisplay';
import { useMarket } from '../utils/markets';
import USE_NFTS from '../nfts';
import { NftCardTrade } from '../components/NftCard';

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px 16px;
  .borderNone .ant-select-selector {
    border: none !important;
  }
`;

export default function TradePage() {
  const { marketName } = useMarket();
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    document.title = marketName ? `${marketName} — Solible` : 'Solible';
  }, [marketName]);

  const changeOrderRef = useRef<
    ({ size, price }: { size?: number; price?: number }) => void
  >();

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const width = dimensions?.width;
  const componentProps = {
    onChangeOrderRef: (ref: any) => (changeOrderRef.current = ref),
    onPrice: useCallback(
      (price) => changeOrderRef.current && changeOrderRef.current({ price }),
      [],
    ),
    onSize: useCallback(
      (size) => changeOrderRef.current && changeOrderRef.current({ size }),
      [],
    ),
  };
  const getComponent = useCallback(() => {
    if (width < 1000) {
      return <RenderSmaller {...componentProps} />;
    } else if (width < 1450) {
      return <RenderSmall {...componentProps} />;
    } else {
      return <RenderNormal {...componentProps} />;
    }
  }, [width, componentProps]);

  return (
    <>
      <Wrapper>{getComponent()}</Wrapper>
    </>
  );
}

const RenderNormal = ({ onChangeOrderRef, onPrice, onSize }) => {
  const { market } = useMarket();

  let NFT: any;
  if (market) {
    NFT = USE_NFTS.filter(
      (nft) => nft.marketAddress.toBase58() === market.address.toBase58(),
    )[0];
  }

  return (
    <>
      <Col flex="auto" />
      <Col>
        <Row
          style={{
            minHeight: '900px',
            flexWrap: 'nowrap',
          }}
        >
          <Col flex="auto" />
          <Col style={{ paddingRight: '50px' }}>
            <Orderbook smallScreen={false} onPrice={onPrice} onSize={onSize} />
            <div style={{ paddingTop: '20px' }} />
            <StandaloneBalancesDisplay />
          </Col>
          <Col>
            {NFT && (
              <NftCardTrade
                img={NFT.img}
                name={NFT.name}
                supply={NFT.supply}
                mintAddress={NFT.mintAddress}
                setChangeOrderRef={onChangeOrderRef}
              />
            )}
          </Col>
          <Col flex="auto" />
        </Row>

        <Row style={{ paddingTop: '50px' }}>
          <Col flex="auto" />
          <Col flex="auto">
            <UserInfoTable />
          </Col>
          <Col flex="auto" />
        </Row>
      </Col>
      <Col flex="auto" />
    </>
  );
};

const RenderSmall = ({ onChangeOrderRef, onPrice, onSize }) => {
  const { market } = useMarket();

  let NFT: any;
  if (market) {
    NFT = USE_NFTS.filter(
      (nft) => nft.marketAddress.toBase58() === market.address.toBase58(),
    )[0];
  }
  return (
    <>
      <Row
        style={{
          height: '900px',
        }}
      >
        <Col flex="auto" style={{ height: '100%', display: 'flex' }}>
          {NFT && (
            <NftCardTrade
              img={NFT.img}
              name={NFT.name}
              supply={NFT.supply}
              mintAddress={NFT.mintAddress}
              setChangeOrderRef={onChangeOrderRef}
            />
          )}
          <Orderbook
            smallScreen={true}
            depth={13}
            onPrice={onPrice}
            onSize={onSize}
          />
        </Col>
        <Col
          flex="400px"
          style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
        >
          <StandaloneBalancesDisplay />
        </Col>
      </Row>
      <Row>
        <Col flex="auto">
          <UserInfoTable />
        </Col>
      </Row>
    </>
  );
};

const RenderSmaller = ({ onChangeOrderRef, onPrice, onSize }) => {
  const { market } = useMarket();

  let NFT: any;
  if (market) {
    NFT = USE_NFTS.filter(
      (nft) => nft.marketAddress.toBase58() === market.address.toBase58(),
    )[0];
  }
  return (
    <>
      <Row>
        <Col xs={24} sm={12} style={{ height: '100%', display: 'flex' }}>
          {NFT && (
            <NftCardTrade
              img={NFT.img}
              name={NFT.name}
              supply={NFT.supply}
              mintAddress={NFT.mintAddress}
              setChangeOrderRef={onChangeOrderRef}
            />
          )}
        </Col>
        <Col xs={24} sm={12}>
          <StandaloneBalancesDisplay />
        </Col>
      </Row>
      <Row
        style={{
          height: '500px',
        }}
      >
        <Col xs={24} sm={12} style={{ height: '100%', display: 'flex' }}>
          <Orderbook smallScreen={true} onPrice={onPrice} onSize={onSize} />
        </Col>
      </Row>
      <Row>
        <Col flex="auto">
          <UserInfoTable />
        </Col>
      </Row>
    </>
  );
};
