import React, { useState, useEffect } from 'react';
import { Input, Row, Col, Typography } from 'antd';
import USE_NFTS, { NFT } from '../nfts';
import { WrappedCol } from './HomePage';
import { useWindowDimensions } from '../components/utils';
import NftCard from '../components/NftCard';
import notFoundGif from '../assets/not-found.gif';
const { Search } = Input;
const { Title } = Typography;

const RowCard = ({ start, end, NFT_ARRAY }) => {
  return (
    <Row align="middle" justify="center">
      <Col flex="auto" />
      {NFT_ARRAY?.slice(start, end).map((nft: NFT, key: number) => {
        return (
          <WrappedCol>
            <NftCard
              key={key}
              img={nft.img}
              name={nft.name}
              supply={nft.supply}
              mintAddress={nft.mintAddress}
              sold={nft.sold}
              marketAddress={nft.marketAddress}
            />
          </WrappedCol>
        );
      })}
      <Col flex="auto" />
    </Row>
  );
};

const SearchRow = ({ divider, longueur, NFT_ARRAY }) => {
  const quotien = Math.floor(longueur / divider);
  const reste = longueur % 3;
  const MAP_ARRAY_3 = Array.from({ length: quotien }, (v, i) => i);
  return (
    <>
      {quotien === 0 && <RowCard start={0} end={reste} NFT_ARRAY={NFT_ARRAY} />}
      {MAP_ARRAY_3.map((e) => {
        return <RowCard start={e} end={e + 3} NFT_ARRAY={NFT_ARRAY} />;
      })}
      <RowCard
        start={longueur - 3}
        end={longueur + reste - 3}
        NFT_ARRAY={NFT_ARRAY}
      />
    </>
  );
};

const SearchPage = () => {
  const windowDimensions = useWindowDimensions();
  console.log(windowDimensions);
  const [searchResults, setSearchResults] = useState<NFT[] | null>(null);
  const [keywords, setKeywords] = useState<string[] | null>(null);
  const onSearch = (value: string) => {
    setKeywords(value.split(' ').map((e) => e.toLowerCase()));
  };
  const [notFound, setNotFound] = useState(false);

  // Update results
  useEffect(() => {
    let temp: NFT[] = [];
    keywords?.forEach((keyword) => {
      USE_NFTS.forEach((nft) => {
        if (nft.keywords.includes(keyword.toLowerCase())) {
          temp.push(nft);
        }
      });
    });
    setSearchResults(temp);
  }, [keywords]);

  // Not Found
  useEffect(() => {
    if (keywords && searchResults) {
      setNotFound(keywords.length > 0 && searchResults.length === 0);
    }
  }, [keywords, keywords?.length, searchResults, searchResults?.length]);

  const longueur = searchResults ? searchResults.length : 0;

  return (
    <>
      <Row style={{ paddingTop: '50px' }}>
        <Col flex="auto" />
        <Col>
          <Search
            placeholder="Search NFT"
            onSearch={onSearch}
            style={{ width: 200 }}
          />
        </Col>
        <Col flex="auto" />
      </Row>
      {notFound && (
        <Row style={{ paddingTop: '50px' }}>
          <Col flex="auto" />
          <Col>
            <Title level={2}>Nothing found</Title>
            <img src={notFoundGif} width="100%" alt="not found" />
          </Col>
          <Col flex="auto" />
        </Row>
      )}
      {windowDimensions.width > 1600 && (
        <SearchRow divider={3} longueur={longueur} NFT_ARRAY={searchResults} />
      )}
      {1100 < windowDimensions.width && windowDimensions.width < 1600 && (
        <SearchRow divider={2} longueur={longueur} NFT_ARRAY={searchResults} />
      )}
      {windowDimensions.width < 1100 && (
        <>
          {searchResults?.map((NFT, key) => {
            return (
              <WrappedCol style={{ paddingRight: '10%', paddingLeft: '10%' }}>
                <NftCard
                  key={key}
                  img={NFT.img}
                  name={NFT.name}
                  supply={NFT.supply}
                  mintAddress={NFT.mintAddress}
                  sold={NFT.sold}
                  marketAddress={NFT.marketAddress}
                />
              </WrappedCol>
            );
          })}
        </>
      )}
    </>
  );
};

export default SearchPage;
