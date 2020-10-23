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
  const reste = longueur % divider;
  const MAP_ARRAY = Array.from({ length: quotien }, (v, i) => i);
  return (
    <>
      {quotien === 0 && <RowCard start={0} end={reste} NFT_ARRAY={NFT_ARRAY} />}
      {MAP_ARRAY.map((e) => {
        return <RowCard start={e} end={e + divider} NFT_ARRAY={NFT_ARRAY} />;
      })}
      <RowCard
        start={longueur - divider}
        end={longueur + reste - divider}
        NFT_ARRAY={NFT_ARRAY}
      />
    </>
  );
};

const searchWord = (nft: NFT, word: string): boolean => {
  for (let i = 0; i < nft.keywords.length; i++) {
    if (
      nft.keywords[i].includes(word) ||
      nft.marketAddress.toBase58().toLowerCase().includes(word.toLowerCase()) ||
      nft.mintAddress.toBase58().toLowerCase().includes(word.toLowerCase())
    ) {
      return true;
    }
  }
  return false;
};

const SearchPage = () => {
  const windowDimensions = useWindowDimensions();
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
        if (searchWord(nft, keyword.toLowerCase())) {
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
