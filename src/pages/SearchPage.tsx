import React, { useState, useEffect } from 'react';
import { Row, Col, Typography } from 'antd';
import { NFT, useNFTs } from '../nfts';
import { WrappedCol } from './HomePage';
import { useWindowDimensions } from '../components/utils';
import NftCard from '../components/NftCard';
import notFoundGif from '../assets/not-found.gif';
import { RouteComponentProps } from 'react-router-dom';
const { Title } = Typography;

const RowCard = ({ start, end, NFT_ARRAY }) => {
  return (
    <Row align="middle" justify="center">
      <Col flex="auto" />
      {NFT_ARRAY?.slice(start, end).map((nft: NFT, key: number) => {
        return (
          <WrappedCol>
            <NftCard key={key} nft={nft} />
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
  if (quotien === 0) {
    return <RowCard start={0} end={reste} NFT_ARRAY={NFT_ARRAY} />;
  }
  return (
    <>
      {MAP_ARRAY.map((e) => {
        return (
          <RowCard
            start={divider * e}
            end={divider * e + divider}
            NFT_ARRAY={NFT_ARRAY}
          />
        );
      })}
      <RowCard start={longueur - reste} end={longueur} NFT_ARRAY={NFT_ARRAY} />
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

type TParams = { searchParameters: string };

const SearchPage = ({ match }: RouteComponentProps<TParams>) => {
  const windowDimensions = useWindowDimensions();
  const [searchResults, setSearchResults] = useState<NFT[] | null>(null);
  const [keywords, setKeywords] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [NFTs, setFilter] = useNFTs({});

  // Update results
  useEffect(() => {
    setSearchResults(NFTs);
    console.log(NFTs.length);
  }, [JSON.stringify(NFTs)]);

  useEffect(() => {
    if (keywords)
      setFilter({name : keywords})
  }, [keywords]);

  React.useEffect(() => {
    setKeywords(
      match?.params.searchParameters.toString().toLowerCase(),
    );
  }, [match]);

  const notFoundArray = [
    keywords,
    keywords?.length,
    searchResults,
    searchResults?.length,
  ];

  // Not Found
  useEffect(() => {
    if (keywords && searchResults) {
      setNotFound(keywords.length > 0 && searchResults.length === 0);
    }
  }, [keywords, searchResults, notFoundArray]);

  const longueur = searchResults ? searchResults.length : 0;

  return (
    <>
      {notFound && (
        <Row style={{ paddingTop: '50px' }}>
          <Col flex="auto" />
          <Col>
            <Title level={2} style={{ color: 'white' }}>
              Nothing found
            </Title>
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
                <NftCard key={key} nft={NFT} />
              </WrappedCol>
            );
          })}
        </>
      )}
    </>
  );
};

export default SearchPage;
