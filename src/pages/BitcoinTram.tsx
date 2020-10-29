import React, { useCallback, useEffect, useRef } from 'react';
import { Col, Row, Button } from 'antd';
import styled from 'styled-components';
import UserInfoTable from '../components/UserInfoTable';
import { useMarket } from '../utils/markets';
import { NftCardTrade } from '../components/NftCard';
import { USE_REDEEMABLE_NFTS } from '../nfts';
import Emoji from '../components/Emoji';

const BTC_TRAM = USE_REDEEMABLE_NFTS[0];

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px 16px;
  .borderNone .ant-select-selector {
    border: none !important;
  }
`;

const RedeemButton = styled(Button)`
  margin: 20px 0px 0px 0px;
  background: #f23b69;
  border-color: #f23b69;
  &:hover {
    background: #000;
    border-color: #000;
    color: #f23b69;
    border: solid 2px;
  }
`;

const BitcoinTram = () => {
  const { marketName, setMarketAddress } = useMarket();

  useEffect(() => {
    setMarketAddress(BTC_TRAM.marketAddress.toBase58());
  }, [setMarketAddress]);

  useEffect(() => {
    document.title = marketName ? `${marketName} — Solible` : 'Solible';
  }, [marketName]);

  const changeOrderRef = useRef<
    ({ size, price }: { size?: number; price?: number }) => void
  >();

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

  return (
    <>
      <Wrapper>
        <RenderTradePage {...componentProps} />
      </Wrapper>
    </>
  );
};

const RenderTradePage = ({ onChangeOrderRef, onPrice, onSize }) => {
  const NFT = BTC_TRAM;

  return (
    <>
      <Row>
        <Col>
          <Emoji symbol="🔥" label="burn" class="emoji-redeem" />
        </Col>
      </Row>
      <Row align="middle" justify="center">
        <Col flex="auto" />
        <Col>
          {NFT && (
            <NftCardTrade
              nft={NFT}
              setChangeOrderRef={onChangeOrderRef}
              smallScreen={false}
              onPrice={onPrice}
              onSize={onSize}
            />
          )}
          <RedeemButton>Redeem</RedeemButton>
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
    </>
  );
};
// TODO: Create redeem button on this pages
// TODO: Create redeem page that explains everything

export default BitcoinTram;
