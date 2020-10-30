import React from 'react';
import { Button, Card, Typography, Row, Col } from 'antd';
import styled from 'styled-components';
import Emoji from './Emoji';

const { Paragraph } = Typography;

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
  };
  return (
    <div style={style.div}>
      <WrappedCard>
        <Row align="middle" justify="center">
          <div style={style.parent}>
            <div style={style.children}>
              <img src={nft.img} alt={nft.name} style={style.img} />
              <WrapperParagraph>
                {redeemText}
                <Emoji symbol="✉️" label="burn" class="emoji-redeem" />
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
Once you have bought this NFT you can keep it in your wallet, resell it or redeem it for a physical collectible item and mailed to your door
`;
