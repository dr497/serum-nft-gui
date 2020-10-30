import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Col, Row, Modal } from 'antd';
import styled from 'styled-components';
import { useMarket } from '../utils/markets';
import { NftCardTrade } from '../components/NftCard';
import { USE_REDEEMABLE_NFTS } from '../nfts';
import RedeemCard from '../components/RedeemCard';
import { useWindowDimensions } from '../components/utils';
import { useWalletBalancesForAllMarkets } from '../utils/markets';
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
  };

  const onClick = () => {
    setShowModal(true);
  };

  if (!BTC_TRAM) {
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
              visible={showModal}
              onOk={() => setShowModal(false)}
              onCancel={() => setShowModal(false)}
              width="50%"
            >
              {<ModalText />}
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

const ModalText = () => {
  return (
    <>
      To redeem your NFT:
      <ul>
        <li style={{ paddingTop: 15 }}>
          Send the NFT to the following address{' '}
          <a
            href="https://explorer.solana.com/address/8uKHDXE1hosqSYEp3wbjzvWPnoZF1GNmLeVwYXgLaoAX"
            target="_blank"
            rel="noopener noreferrer"
          >
            8uKHDXE1hosqSYEp3wbjzvWPnoZF1GNmLeVwYXgLaoAX
          </a>{' '}
        </li>
        <li>
          Then email <a href="mailto:redeem@solible.com">redeem@solible.com</a>{' '}
          with the transaction ID and your shipping information.
        </li>
      </ul>
      <div>
        <Emoji symbol="🔥" label="burn" class="emoji-redeem" /> Your NFT will be
        redeemed and shipped within 48 hours
      </div>
      <div>
        <Emoji symbol="🚫" label="warning" class="emoji-redeem" /> NFTs sent
        without an email will be returned to the sender after 72 hours
      </div>
    </>
  );
};

export default BitcoinTram;
