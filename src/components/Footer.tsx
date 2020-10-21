import React from 'react';
import { Layout, Row, Col, Grid } from 'antd';
import Link from './Link';

const { Footer } = Layout;
const { useBreakpoint } = Grid;

const footerElements = [
  { description: 'Bonfida', link: 'https://bonfida.com' },
  { description: 'Twitter', link: 'https://twitter.com/bonfidadotcom' },
];

export const CustomFooter = () => {
  const smallScreen = !useBreakpoint().lg;

  return (
    <Footer
      style={{
        height: '45px',
        paddingBottom: 10,
        paddingTop: 10,
      }}
    >
      <Row align="middle" gutter={[16, 4]}>
        {!smallScreen && (
          <>
            <Col flex="auto" />
            {footerElements.map((elem, index) => {
              return (
                <Col key={index + ''}>
                  <Link external to={elem.link}>
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
