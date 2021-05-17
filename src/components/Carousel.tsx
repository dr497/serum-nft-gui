import React, { useState } from 'react';
import styled from 'styled-components';
import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons';
import Spin from './Spin';

const CenteredDiv = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const Carousel = ({ images }: { images: Array<any> }) => {
  const nbImages = images.length;
  const [currentImage, setCurrentImage] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const style = {
    icon: { fontSize: '20px', color: 'red', padding: 20 },
    img: {
      width: '80vw',
      maxWidth: '800px',
    },
  };

  return (
    <>
      <CenteredDiv>
        <img
          // @ts-ignore
          src={images[currentImage]}
          style={style.img}
          alt=""
          onLoad={() => setLoaded(true)}
        />
      </CenteredDiv>
      {!loaded && (
        <CenteredDiv>
          <Spin />
        </CenteredDiv>
      )}
      <CenteredDiv style={{ paddingTop: 20 }}>
        {!(currentImage <= 0) && (
          <LeftCircleOutlined
            style={style.icon}
            onClick={() => {
              setCurrentImage((prev) => prev - 1);
              setLoaded(false);
            }}
          />
        )}
        {!(currentImage >= nbImages - 1) && (
          <RightCircleOutlined
            style={style.icon}
            onClick={() => {
              setCurrentImage((prev) => prev + 1);
              setLoaded(false);
            }}
          />
        )}
      </CenteredDiv>
    </>
  );
};

export default Carousel;
