import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Col, Row, Modal, Typography } from 'antd';
import styled from 'styled-components';
import { useMarket } from '../utils/markets';
import { USE_ALL_NFTS } from '../nfts';
import { NftCardTrade, NftView } from '../components/NftCard';
import { useWindowDimensions } from '../components/utils';
import { useWallet } from '../utils/wallet';
import { useWalletBalancesForAllMarkets } from '../utils/markets';
import RedeemCard from '../components/RedeemCard';
import RedeemForm from '../components/RedeemForm';
import { NFT } from '../nfts';
import { PublicKey } from '@solana/web3.js';
import Spin from '../components/Spin';

const { Paragraph } = Typography;

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 16px 16px;
  .borderNone .ant-select-selector {
    border: none !important;
  }
`;

const isValidPublicKey = (publicKeyString: string) => {
  try {
    new PublicKey(publicKeyString);
    return true;
  } catch (err) {
    return false;
  }
};

export default function TradePage() {
  const { marketAddress } = useParams();
  const { marketName, setMarketAddress } = useMarket();

  if (marketAddress && isValidPublicKey(marketAddress)) {
    setMarketAddress(marketAddress);
  } else {
    setMarketAddress('7EapwYqr6ev4W6PH5DoXJfDsziynfma3318uQt99E6AA');
  }

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
}

const RenderTradePage = ({ onChangeOrderRef, onPrice, onSize }) => {
  const { market } = useMarket();
  const windowDimensions = useWindowDimensions();

  const walletBalances = useWalletBalancesForAllMarkets();
  const [disabled, setDisabled] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { connected } = useWallet();

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

  const [nft, setNft] = useState<NFT | null>(null);

  useEffect(() => {
    if (market) {
      const _nft = USE_ALL_NFTS.filter(
        (e) => e.marketAddress.toBase58() === market.address.toBase58(),
      )[0];
      setNft(_nft);
    }
    if (walletBalances) {
      setDisabled(
        walletBalances.filter((e) => e.mint === nft?.mintAddress.toBase58())
          .length > 0
          ? false
          : true,
      );
    }
  }, [market, nft, walletBalances]);

  if (!nft) {
    return <Spin />;
  }

  const onClick = () => {
    setShowModal(true);
  };

  if (!nft.redeembable) {
    return (
      <>
        {windowDimensions.width > 1210 && (
          <div style={styles.parent}>
            <>
              <div style={styles.child}>
                <NftView nft={nft} />
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
            </>
          </div>
        )}
        {windowDimensions.width < 1210 && (
          <>
            <Row align="middle" justify="center">
              <Col flex="auto" />
              <Col>
                <img
                  // @ts-ignore
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
                  nft={NFT}
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
  }
  return (
    <>
      {windowDimensions.width > 1210 && (
        <div style={styles.parent}>
          <>
            <div style={styles.child}>
              <RedeemCard nft={nft} disabled={disabled} onClick={onClick} />
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
                //@ts-ignore
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
              <img src={nft.img.toString()} alt={nft.name} style={styles.img} />
            </Col>
            <Col flex="auto" />
          </Row>
          <Paragraph style={{ textAlign: 'center' }}>
            {nft.redeemDescription}
          </Paragraph>
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
