import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Col, Row, Modal } from 'antd';
import styled from 'styled-components';
import { useMarket } from '../utils/markets';
import { NftCardTrade } from '../components/NftCard';
import { USE_REDEEMABLE_NFTS } from '../nfts';
import RedeemCard from '../components/RedeemCard';
import { useWindowDimensions } from '../components/utils';
import { useWalletBalancesForAllMarkets } from '../utils/markets';
import RedeemForm from '../components/RedeemForm';
import { useWallet } from '../utils/wallet';

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
  const windowDimensions = useWindowDimensions();
  const walletBalances = useWalletBalancesForAllMarkets();
  const [disabled, setDisabled] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { connected } = useWallet();

  useEffect(() => {
    if (walletBalances) {
      setDisabled(
        walletBalances.filter((e) => e.mint === BTC_TRAM.mintAddress.toBase58())
          .length > 0
          ? false
          : true,
      );
    }
  }, [walletBalances]);

  const styles = {
    parent: {
      display: 'flex',
      flexWrap: 'wrap',
    } as React.CSSProperties,
    child: {
      flex: 1,
      paddingRight: 20,
      paddingLeft: 20,
    } as React.CSSProperties,
    img: {
      width: '100%',
      paddingBottom: 30,
    } as React.CSSProperties,
    body: { background: 'white', color: 'black' },
    mask: { background: 'transparent' },
    modal: { background: 'transparent' },
  };

  const onClick = () => {
    setShowModal(true);
  };

  if (!BTC_TRAM || !BTC_TRAM.redeemAddress) {
    return null;
  }

  return (
    <>
      {windowDimensions.width > 1210 && (
        <div style={styles.parent}>
          <>
            <div style={styles.child}>
              <RedeemCard
                nft={BTC_TRAM}
                disabled={disabled}
                onClick={onClick}
              />
            </div>
            <div style={styles.child}>
              <NftCardTrade
                nft={BTC_TRAM}
                setChangeOrderRef={onChangeOrderRef}
                smallScreen={false}
                onPrice={onPrice}
                onSize={onSize}
              />
            </div>
            <Modal
              closable={false}
              visible={showModal && connected}
              onOk={() => setShowModal(false)}
              onCancel={() => setShowModal(false)}
              width="800px"
              centered={true}
              keyboard={true}
              maskClosable={true}
              bodyStyle={styles.body}
              maskStyle={styles.mask}
              style={styles.modal}
              footer={null}
            >
              <RedeemForm
                nftMint={BTC_TRAM.mintAddress}
                destination={BTC_TRAM.redeemAddress}
              />
            </Modal>
          </>
        </div>
      )}
      {windowDimensions.width < 1210 && (
        <>
          <Row align="middle" justify="center">
            <Col flex="auto" />
            <Col>
              <img
                src={BTC_TRAM.img.toString()}
                alt={BTC_TRAM.name}
                style={styles.img}
              />
            </Col>
            <Col flex="auto" />
          </Row>
          <Row align="middle" justify="center">
            <Col flex="auto" />
            <Col>
              <NftCardTrade
                nft={BTC_TRAM}
                setChangeOrderRef={onChangeOrderRef}
                smallScreen={false}
                onPrice={onPrice}
                onSize={onSize}
              />
            </Col>
            <Col flex="auto" />
          </Row>
        </>
      )}
    </>
  );
};

export default BitcoinTram;
