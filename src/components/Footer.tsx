import React from 'react';
import { Layout, Row, Col, Grid } from 'antd';
import Link from './Link';

const { Footer } = Layout;
const { useBreakpoint } = Grid;

const footerElements = [
  { description: 'Bonfida', link: 'https://bonfida.com', external: true },
  {
    description: 'Twitter',
    link: 'https://twitter.com/bonfidadotcom',
    external: true,
  },
  { description: 'List NFT', link: '/list-nft', external: false },
  {
    description: 'Customer Support',
    link: 'https://help.bonfida.com',
    external: true,
  },
];
const styles = {
  footer: {
    height: '45px',
    paddingBottom: 10,
    paddingTop: 10,
  },
};

export const CustomFooter = () => {
  const smallScreen = !useBreakpoint().lg;

  return (
    <Footer style={styles.footer}>
      <Row align="middle" gutter={[16, 4]}>
        {!smallScreen && (
          <>
            <Col flex="auto" />
            {footerElements.map((elem, index) => {
              return (
                <Col key={index + ''}>
                  <Link external={elem.external} to={elem.link}>
                    {elem.description}
                  </Link>
                </Col>
              );
            })}
            <Col flex="auto" />
          </>
        )}
      </Row>
    </Footer>
  );
};
