import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Col, Row, Modal } from 'antd';
import styled from 'styled-components';
import { useMarket } from '../utils/markets';
import { NftCardTrade } from '../components/NftCard';
import { useNFTs, NFT } from '../nfts';
import RedeemCard from '../components/RedeemCard';
import { useWindowDimensions } from '../components/utils';
import { useWalletBalancesForAllMarkets } from '../utils/markets';
import RedeemForm from '../components/RedeemForm';
import { useWallet } from '../utils/wallet';

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
  const [markets, setFilter] = useNFTs({redeemable: true});
  const [btcTram, setBtcTram] = useState<NFT | null>(null);

  useEffect(()=> {
    if(markets.length > 0) setBtcTram(markets[0]);
  }, [markets.length])

  useEffect(() => {
    if (btcTram)
      setMarketAddress(btcTram.marketAddress.toBase58());
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
        <RenderTradePage {...componentProps} nft={btcTram}/>
      </Wrapper>
    </>
  );
};

const RenderTradePage = ({ onChangeOrderRef, onPrice, onSize, nft }) => {
  const windowDimensions = useWindowDimensions();
  const walletBalances = useWalletBalancesForAllMarkets();
  const [disabled, setDisabled] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { connected } = useWallet();

  useEffect(() => {
    if (walletBalances) {
      setDisabled(
        walletBalances.filter((e) => e.mint === nft.mintAddress.toBase58())
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

  if (!nft || !nft.redeemAddress) {
    return null;
  }

  return (
    <>
      {windowDimensions.width > 1210 && (
        <div style={styles.parent}>
          <>
            <div style={styles.child}>
              <RedeemCard
                nft={nft}
                disabled={disabled}
                onClick={onClick}
              />
            </div>
            <div style={styles.child}>
              <NftCardTrade
                nft={nft}
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
                nftMint={nft.mintAddress}
                destination={nft.redeemAddress}
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
                src={nft.img}
                alt={nft.name}
                style={styles.img}
              />
            </Col>
            <Col flex="auto" />
          </Row>
          <Row align="middle" justify="center">
            <Col flex="auto" />
            <Col>
              <NftCardTrade
                nft={nft}
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
