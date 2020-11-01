import React from 'react';
import { Typography, Timeline, Row, Col } from 'antd';
import Emoji from '../components/Emoji';

const { Title, Paragraph, Text } = Typography;

const styles = {
  title: {
    color: 'white',
    fontFamily: 'Source Sans Pro',
    paddingTop: 15,
    paddingRight: 10,
  },
  paragraph: {
    fontSize: '16px',
  },
  list: { fontSize: '16px', fontWeight: 'bold' } as React.CSSProperties,
};

const BookEmoji = <Emoji symbol="🛠" label="book" class="emoji-list-book" />;

const email = 'contact@solible.com';

const informationList = [
  'Object of the email must be: NFT Listing',
  'Name of the NFT',
  'Total supply of the NFT',
  'Your creator name',
  'Your SOL address (so we can send you the NFT)',
  'High resolution version of the NFT',
];

const ListNFT = () => {
  return (
    <Row align="middle" justify="center">
      <Col flex="auto" />
      <Col>
        <Row align="middle" justify="center">
          <Col>
            <Title level={1} style={styles.title}>
              How to list an NFT on Solible
            </Title>
          </Col>
          <Col>{BookEmoji}</Col>
        </Row>
        <Paragraph style={styles.paragraph}>
          To list an NFT on Solible please email:{' '}
          <a href={`mailto:${email}`}>{email}</a> with the following:
        </Paragraph>

        <Timeline>
          {informationList.map((e, i) => {
            return (
              <Timeline.Item key={i}>
                <Text style={styles.list}>{e}</Text>
              </Timeline.Item>
            );
          })}
        </Timeline>
        <Paragraph style={styles.paragraph}>
          Emails that do to not follow the above format will not be listed
        </Paragraph>
      </Col>
      <Col flex="auto" />
    </Row>
  );
};

export default ListNFT;
