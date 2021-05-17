import React, { useState } from 'react';
import { Button, Card, Typography, Row, Col, Statistic, Modal } from 'antd';
import styled from 'styled-components';
import Emoji from './Emoji';
import { hasMoreImages } from '../nfts/utils';
import Carousel from './Carousel';

const { Paragraph } = Typography;
const { Countdown } = Statistic;

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

const MoreImagesButton = styled(Button)`
  width: auto;
  height: auto;
  margin: 20px 0px 0px 0px;
  background: transparent;
  border-color: #f23b69;
  border-radius: 50px;
`;

const CenteredDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
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
    body: { background: 'rgb(255,255,255,0.1)', color: 'black' },
    mask: { background: 'transparent' },
    modal: { background: 'transparent' },
  };

  const [moreImages, hasMore] = hasMoreImages(nft.mintAddress.toBase58());
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div style={style.div}>
        <WrappedCard>
          <Row align="middle" justify="center">
            <div style={style.parent}>
              <div style={style.children}>
                <img src={nft.img} alt={nft.name} style={style.img} />
                {hasMore && (
                  <CenteredDiv>
                    <MoreImagesButton onClick={() => setShowModal(true)}>
                      More images
                    </MoreImagesButton>
                  </CenteredDiv>
                )}
                <WrapperParagraph>{nft.redeemDescription}</WrapperParagraph>
                {!!nft.auctionDeadLine && (
                  <WrapperParagraph>
                    {auctionText}
                    <Countdown
                      title="Countdown"
                      value={Date.parse(nft.auctionDeadLine)}
                      style={style.countdown}
                    />
                  </WrapperParagraph>
                )}
                <CenteredDiv>
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
                </CenteredDiv>
              </div>
            </div>
            <Col flex="auto" />
          </Row>
        </WrappedCard>
      </div>
      <Modal
        closable={false}
        visible={showModal}
        onOk={() => setShowModal(false)}
        onCancel={() => setShowModal(false)}
        width="80vw"
        centered={true}
        keyboard={true}
        maskClosable={true}
        bodyStyle={style.body}
        maskStyle={style.mask}
        style={style.modal}
        footer={null}
      >
        <Carousel images={moreImages} />
      </Modal>
    </>
  );
};

export default RedeemCard;

const auctionText = `
The auction will end in
`;
