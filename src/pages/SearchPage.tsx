import React, { useState, useEffect } from 'react';
import { Row, Col, Typography } from 'antd';
import { NFT, USE_ALL_NFTS } from '../nfts';
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
  return (
    <>
      {quotien === 0 && <RowCard start={0} end={reste} NFT_ARRAY={NFT_ARRAY} />}
      {MAP_ARRAY.map((e) => {
        return (
          <RowCard
            start={divider * e}
            end={divider * e + divider}
            NFT_ARRAY={NFT_ARRAY}
          />
        );
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

type TParams = { searchParameters: string };

const SearchPage = ({ match }: RouteComponentProps<TParams>) => {
  const windowDimensions = useWindowDimensions();
  const [searchResults, setSearchResults] = useState<NFT[] | null>(null);
  const [keywords, setKeywords] = useState<string[] | null>(null);

  const [notFound, setNotFound] = useState(false);

  // Update results
  useEffect(() => {
    let temp: NFT[] = [];
    keywords?.forEach((keyword) => {
      USE_ALL_NFTS.forEach((nft) => {
        if (searchWord(nft, keyword.toLowerCase())) {
          temp.push(nft);
        }
      });
    });
    setSearchResults(temp);
  }, [keywords]);

  React.useEffect(() => {
    setKeywords(
      match?.params.searchParameters.split('&').map((e) => e.toLowerCase()),
    );
  }, [match]);

  // Not Found
  useEffect(() => {
    if (keywords && searchResults) {
      setNotFound(keywords.length > 0 && searchResults.length === 0);
    }
  }, [keywords, keywords?.length, searchResults, searchResults?.length]);

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
