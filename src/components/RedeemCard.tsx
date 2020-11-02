import React from 'react';
import { Button, Card, Typography, Row, Col, Statistic } from 'antd';
import styled from 'styled-components';
import Emoji from './Emoji';

const { Paragraph } = Typography;
const { Countdown } = Statistic;

const deadline = Date.parse('2020-11-06T21:00:00.000+08:00');

const RedeemButton = styled(Button)`
  width: auto;
  height: auto;
  margin: 20px 0px 0px 0px;
  background: #f23b69;
  border-color: #f23b69;
  &:hover {
    background: #000;
    border-color: #000;
    color: #f23b69;
  }
`;

const WrappedCard = styled(Card)`
  background: linear-gradient(
    162.92deg,
    rgb(43, 43, 43) 12.36%,
    rgb(0, 0, 0) 94.75%
  );
  bordercolor: transparent;
  border-radius: 25px;
  cursor: pointer;
  overflow: hidden;
  width: 50vw;
  height: 100%;
`;

const WrapperParagraph = styled(Paragraph)`
  padding-top: 20px;
  font-size: 16px;
  text-align: center;
`;

const RedeemCard = ({ nft, disabled, onClick }) => {
  const style = {
    img: {
      maxWidth: '100%',
    } as React.CSSProperties,
    parent: { display: 'flex', minHeight: '100vh' } as React.CSSProperties,
    children: { margin: 'auto' } as React.CSSProperties,
    div: {
      height: '100%',
    },
    countdown: {
      paddingTop: '10px',
    },
  };
  return (
    <div style={style.div}>
      <WrappedCard>
        <Row align="middle" justify="center">
          <div style={style.parent}>
            <div style={style.children}>
              <img src={nft.img} alt={nft.name} style={style.img} />
              <WrapperParagraph>{redeemText}</WrapperParagraph>
              <WrapperParagraph>
                {auctionText}
                <Countdown
                  title="Countdown"
                  value={deadline}
                  style={style.countdown}
                />
              </WrapperParagraph>
              <Row align="middle" justify="center">
                <Col flex="auto" />
                <Col>
                  <RedeemButton
                    disabled={disabled}
                    onClick={onClick}
                    block
                    type="primary"
                    size="large"
                  >
                    <span style={{ paddingRight: 10 }}>{'Redeem'}</span>{' '}
                    <Emoji symbol="🔥" label="burn" class="emoji-redeem" />
                  </RedeemButton>
                </Col>
                <Col flex="auto" />
              </Row>
            </div>
          </div>
          <Col flex="auto" />
        </Row>
      </WrappedCard>
    </div>
  );
};

export default RedeemCard;

const redeemText = `
This NFT can be redeemed for a physical Bitcoin Tram model mailed to your door
`;

const auctionText = `
The auction will end on 06/11/2020 at 9pm UTC+8
`;
