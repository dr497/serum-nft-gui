import React from 'react';
import { Card, Button, Row, Col, Typography, Modal } from 'antd';
import { ZoomInOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { useMarket } from '../utils/markets';
import TradeForm from './TradeForm';
import Orderbook from './Orderbook';
const { Title, Paragraph } = Typography;

const EXPLORER_URL = 'https://explorer.solana.com/address/';

const getExplorerLink = (address: string) => {
  const url = EXPLORER_URL + address;
  return url;
};

const FancyTitle = styled(Title)`
  color: white;
  bordertop: 1px solid;
  borderbottom: 1px solid;
  borderleftwidth: 0;
  borderrightwidth: 0;
  borderimage: linear-gradient(to right, #d07d7a, #d05651) 1 stretch;
`;

const WrappedButton = styled(Button)`
  color: #8f5cff;
  border: solid 2px;
  border-radius: 25px;
  width: 50%;
  height: 50px;
  &:hover: {
    color: #000;
    background: #8f5cff;
  }
`;

const WrappedCard = styled(Card)`
  maxwidth: 600px;
  height: 750px;
  background: transparent;
  bordercolor: transparent;
  width: auto;
  border-radius: 25px;
  border: solid 3px;
  cursor: pointer;
`;

const WrappedCardTrade = styled(Card)`
  maxwidth: 600px;
  background: transparent;
  bordercolor: transparent;
  width: auto;
  border-radius: 25px;
  border: solid 3px;
  cursor: pointer;
  overflow: hidden;
`;

const WrappedBalance = styled(Card)`
  maxwidth: 600px;
  height: auto;
  background: transparent;
  bordercolor: transparent;
  width: auto;
  border-radius: 25px;
  border: solid 3px;
  cursor: pointer;
`;

const WrappedParagraph = styled(Paragraph)`
  textalign: center;
`;

const NftCard = ({ nft }) => {
  let history = useHistory();
  const { setMarketAddress } = useMarket();
  const handleClick = () => {
    setMarketAddress(nft.marketAddress.toBase58());
    history.push('/trade');
  };

  return (
    <>
      <WrappedCard onClick={handleClick} style={{ overflow: 'hidden' }}>
        <Title level={2} style={{ color: 'white', textAlign: 'center' }}>
          {nft.name}
        </Title>
        <Row align="middle" justify="center" style={{ paddingTop: 10 }}>
          {nft.type === 'IMAGE' ? (
            <img
              src={nft.imgSmall}
              alt={nft.name}
              style={{ padding: 10, height: '300px' }}
            />
          ) : (
            <video height="300" muted loop autoPlay playsInline>
              <source src={nft.imgSmall} type="video/webm" />
            </video>
          )}
        </Row>
        <Row align="middle" justify="center" style={{ paddingTop: 10 }}>
          <FancyTitle level={3}>Mint Address</FancyTitle>
        </Row>
        <Row align="middle" justify="center" style={{ width: '100%' }}>
          <Col>
            <Paragraph copyable ellipsis>
              {nft.mintAddress.toString()}
            </Paragraph>
          </Col>
          <Col
            style={{ paddingBottom: 15, paddingLeft: 10, cursor: 'pointer' }}
            onClick={() =>
              window.open(getExplorerLink(nft.mintAddress), '_blank')
            }
          >
            <ZoomInOutlined style={{ color: '#8f5cff' }} />
          </Col>
        </Row>
        <Row align="middle" justify="center" style={{ paddingTop: 10 }}>
          <FancyTitle level={3}>Supply</FancyTitle>
        </Row>
        <Row align="middle" justify="center" style={{ paddingTop: 10 }}>
          <WrappedParagraph>{nft.supply}</WrappedParagraph>
        </Row>
        <Row align="middle" justify="center">
          <WrappedButton disabled={nft.sold} block onClick={handleClick}>
            {nft.sold ? 'Sold' : 'Buy'}
          </WrappedButton>
        </Row>
      </WrappedCard>
    </>
  );
};

export default NftCard;

export const NftCardTrade = ({
  img,
  name,
  supply,
  mintAddress,
  setChangeOrderRef,
  smallScreen,
  onPrice,
  onSize,
}) => {
  const [showModal, setShowModal] = React.useState(false);
  const handleClick = () => {
    setShowModal((prev) => !prev);
  };
  return (
    <>
      <WrappedCardTrade>
        <Title level={2} style={{ color: 'white', textAlign: 'center' }}>
          {name}
        </Title>
        <Row align="middle" justify="center" style={{ paddingTop: 10 }}>
          <img
            src={img}
            alt={name}
            style={{ padding: 10, height: 'auto', maxHeight: '400px' }}
            onClick={handleClick}
          />
        </Row>
        <Row align="middle" justify="center" style={{ paddingTop: 10 }}>
          <FancyTitle level={3}>Mint Address</FancyTitle>
        </Row>
        <Row align="middle" justify="center" style={{ width: '100%' }}>
          <Col>
            <Paragraph copyable ellipsis>
              {mintAddress.toString()}
            </Paragraph>
          </Col>
          <Col
            style={{ paddingBottom: 15, paddingLeft: 10, cursor: 'pointer' }}
            onClick={() => window.open(getExplorerLink(mintAddress), '_blank')}
          >
            <ZoomInOutlined style={{ color: '#8f5cff' }} />
          </Col>
        </Row>
        <Row align="middle" justify="center" style={{ paddingTop: 10 }}>
          <FancyTitle level={3}>Supply</FancyTitle>
        </Row>
        <Row align="middle" justify="center" style={{ paddingTop: 10 }}>
          <WrappedParagraph>{supply}</WrappedParagraph>
        </Row>
        <Row align="middle" justify="center">
          <TradeForm setChangeOrderRef={setChangeOrderRef} />
        </Row>
        <Row align="middle" justify="center">
          <Orderbook
            smallScreen={smallScreen}
            onPrice={onPrice}
            onSize={onSize}
          />
        </Row>
      </WrappedCardTrade>
      <Modal
        visible={showModal}
        onOk={handleClick}
        onCancel={handleClick}
        width="50%"
      >
        <img src={img} width="100%" alt={name} />
      </Modal>
    </>
  );
};

export const NftCardBalance = ({
  img,
  name,
  supply,
  mintAddress,
  marketAddress,
  walletBalance,
}) => {
  let history = useHistory();
  const { setMarketAddress } = useMarket();
  const handleClick = () => {
    setMarketAddress(marketAddress.toBase58());
    history.push('/trade');
  };

  return (
    <>
      <WrappedBalance onClick={handleClick} style={{ overflow: 'hidden' }}>
        <Title level={2} style={{ color: 'white', textAlign: 'center' }}>
          {name}
        </Title>
        <Row align="middle" justify="center" style={{ paddingTop: 10 }}>
          <img src={img} alt={name} style={{ padding: 10, height: '300px' }} />
        </Row>
        <Row align="middle" justify="center" style={{ paddingTop: 10 }}>
          <FancyTitle level={3}>Mint Address</FancyTitle>
        </Row>
        <Row align="middle" justify="center" style={{ width: '100%' }}>
          <Col>
            <Paragraph copyable ellipsis>
              {mintAddress.toString()}
            </Paragraph>
          </Col>
          <Col
            style={{ paddingBottom: 15, paddingLeft: 10, cursor: 'pointer' }}
            onClick={() => window.open(getExplorerLink(mintAddress), '_blank')}
          >
            <ZoomInOutlined style={{ color: '#8f5cff' }} />
          </Col>
        </Row>
        <SectionRow title="Wallet Balance" description={walletBalance} />
        <SectionRow title="Supply" description={supply} />
      </WrappedBalance>
    </>
  );
};

const SectionRow = ({ title, description }) => {
  return (
    <>
      <Row align="middle" justify="center" style={{ paddingTop: 10 }}>
        <FancyTitle level={3}>{title}</FancyTitle>
      </Row>
      <Row align="middle" justify="center" style={{ paddingTop: 10 }}>
        <WrappedParagraph>{description}</WrappedParagraph>
      </Row>
    </>
  );
};
