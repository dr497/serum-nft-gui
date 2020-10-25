import { PublicKey } from '@solana/web3.js';
export class NFT {
  img: Object;
  name: string;
  supply: number;
  mintAddress: PublicKey;
  marketAddress: PublicKey;
  sold: boolean;
  keywords: string[];
  constructor(
    img: Object,
    name: string,
    supply: number,
    mintAddress: PublicKey,
    marketAddress: PublicKey,
    sold: boolean,
    keywords: string[],
  ) {
    this.img = img;
    this.name = name;
    this.supply = supply;
    this.mintAddress = mintAddress;
    this.marketAddress = marketAddress;
    this.sold = sold;
    this.keywords = keywords;
  }
}

const USE_NFTS: NFT[] = [
  new NFT(
    require('../assets/nfts/AcstFzGGawvvdVhYV9bftr7fmBHbePUjhv53YK1W3dZo/srm.gif'),
    'LSD',
    1,
    new PublicKey('AcstFzGGawvvdVhYV9bftr7fmBHbePUjhv53YK1W3dZo'),
    new PublicKey('BdU5UYU8AU9iTVJXF6Sxc63M6XY4XWqZpdq2PigoqA92'),
    false,
    ['lsd', 'gif'],
  ),
  new NFT(
    require('../assets/nfts/9CmQwpvVXRyixjiE3LrbSyyopPZohNDN1RZiTk8rnXsQ/9CmQwpvVXRyixjiE3LrbSyyopPZohNDN1RZiTk8rnXsQ.gif'),
    'DeceFi',
    1,
    new PublicKey('9CmQwpvVXRyixjiE3LrbSyyopPZohNDN1RZiTk8rnXsQ'),
    new PublicKey('BKZSAFLqxBHKXJk3cw5pGdFCsKzyrouSG19KmiUQKXBh'),
    false,
    ['decefi', 'DCFI'],
  ),
  new NFT(
    require('../assets/nfts/FkmkTr4en8CXkfo9jAwEMov6PVNLpYMzWr3Udqf9so8Z/FkmkTr4en8CXkfo9jAwEMov6PVNLpYMzWr3Udqf9so8Z.png'),
    'Seldom',
    1500,
    new PublicKey('FkmkTr4en8CXkfo9jAwEMov6PVNLpYMzWr3Udqf9so8Z'),
    new PublicKey('AQWam8CiWsbqQWGToD9vwYRStZTYAuCuUKnV3iorDasA'),
    false,
    ['seldom', 'wallet'],
  ),
  new NFT(
    require('../assets/nfts/2gn1PJdMAU92SU5inLSp4Xp16ZC5iLF6ScEi7UBvp8ZD/satoshi-closeup.JPG'),
    'Satoshi Closeup',
    10,
    new PublicKey('2gn1PJdMAU92SU5inLSp4Xp16ZC5iLF6ScEi7UBvp8ZD'),
    new PublicKey('7CGbje815jANonTXSBsdP7nkRLwy3ShLLvZFZRjtU7g2'),
    false,
    ['satoshi', 'closeup', 'genesis', 'block'],
  ),
  new NFT(
    require('../assets/nfts/7mhZHtPL4GFkquQR4Y6h34Q8hNkQvGc1FaNtyE43NvUR/satoshi-gb.JPG'),
    'Satoshi GB',
    10,
    new PublicKey('7mhZHtPL4GFkquQR4Y6h34Q8hNkQvGc1FaNtyE43NvUR'),
    new PublicKey('EHKqPgFnWHzUvgqzhroSeEDp4mD2em2RasxMmTPHDP6x'),
    false,
    ['satoshi', 'gb', 'genesis', 'block'],
  ),
  new NFT(
    require('../assets/nfts/8RoKfLx5RCscbtVh8kYb81TF7ngFJ38RPomXtUREKsT2/satoshi-og.gif'),
    'Satoshi OG',
    10,
    new PublicKey('8RoKfLx5RCscbtVh8kYb81TF7ngFJ38RPomXtUREKsT2'),
    new PublicKey('4uedKfwhVWreNYeQwzfd3nXSxR8A3muGpYdTxm88U7TX'),
    false,
    ['satoshi', 'og', 'genesis', 'block', 'gif'],
  ),
  new NFT(
    require('../assets/nfts/9rw5hyDngBQ3yDsCRHqgzGHERpU2zaLh1BXBUjree48J/satoshi-btc.gif'),
    'Satoshi BTC',
    10,
    new PublicKey('9rw5hyDngBQ3yDsCRHqgzGHERpU2zaLh1BXBUjree48J'),
    new PublicKey('4H9oaHZ5pqtyEiKdcySFJnzNrWdXiG2H8HZG8fwx3kGM'),
    false,
    ['satoshi', 'btc', 'genesis', 'block', 'gif'],
  ),
  new NFT(
    require('../assets/nfts/AiD7J6D5Hny5DJB1MrYBc2ePQqy2Yh4NoxWwYfR7PzxH/satoshi-gb.gif'),
    'Satoshi GB',
    10,
    new PublicKey('AiD7J6D5Hny5DJB1MrYBc2ePQqy2Yh4NoxWwYfR7PzxH'),
    new PublicKey('5W39A7d5iqHzh7oUHyu37HBN2nx7Ptg4yrSvgz1A8sq9'),
    false,
    ['satoshi', 'gb', 'genesis', 'block', 'gif'],
  ),
  new NFT(
    require('../assets/nfts/bxiA13fpU1utDmYuUvxvyMT8odew5FEm96MRv7ij3eb/satoshi.gif'),
    'Satoshi',
    10,
    new PublicKey('bxiA13fpU1utDmYuUvxvyMT8odew5FEm96MRv7ij3eb'),
    new PublicKey('GXS6UKiTewG6FxwmwzkBKLRGyXfhZ5sbHwUcJZBZXrVT'),
    false,
    ['satoshi', 'genesis', 'block', 'gif'],
  ),
  new NFT(
    require('../assets/nfts/GoC24kpj6TkvjzspXrjSJC2CVb5zMWhLyRcHJh9yKjRF/satoshi-closeup.gif'),
    'Satoshi Closeup',
    10,
    new PublicKey('GoC24kpj6TkvjzspXrjSJC2CVb5zMWhLyRcHJh9yKjRF'),
    new PublicKey('AfuXKRbioPV9WkxiCJvVwgCVY3Y5D2dHhr2NMUaKoXiD'),
    false,
    ['satoshi', 'closeup', 'genesis', 'block', 'gif'],
  ),
  new NFT(
    require('../assets/nfts/oCUduD44ETuZ65bpWdPzPDSnAdreg1sJrugfwyFZVHV/satoshi-btc.JPG'),
    'Satoshi BTC',
    10,
    new PublicKey('oCUduD44ETuZ65bpWdPzPDSnAdreg1sJrugfwyFZVHV'),
    new PublicKey('5rfx5u8aPY4MiSAvUxAqDFFhGgLGb8Luy1DQJVPcTt3e'),
    false,
    ['satoshi', 'btc', 'genesis', 'block'],
  ),
  new NFT(
    require('../assets/nfts/9Vvre2DxBB9onibwYDHeMsY1cj6BDKtEDccBPWRN215E/9Vvre2DxBB9onibwYDHeMsY1cj6BDKtEDccBPWRN215E.gif'),
    'Satoshi Nakamoto',
    1,
    new PublicKey('9Vvre2DxBB9onibwYDHeMsY1cj6BDKtEDccBPWRN215E'),
    new PublicKey('F4euXHP7KWijkhGqsGEqWy9iZKeNc1jg2LVodKHQ13PV'),
    false,
    ['satoshi', 'nakamoto'],
  ),
  new NFT(
    require('../assets/nfts/7RpFk44cMTAUt9CcjEMWnZMypE9bYQsjBiSNLn5qBvhP/7RpFk44cMTAUt9CcjEMWnZMypE9bYQsjBiSNLn5qBvhP.gif'),
    'Charles Hoskinson',
    1,
    new PublicKey('7RpFk44cMTAUt9CcjEMWnZMypE9bYQsjBiSNLn5qBvhP'),
    new PublicKey('474bvPo2KH3L9E8fpBspKgeDGqW51ysiH5LTnbko1Njq'),
    false,
    ['charles', 'hoskinson'],
  ),
];

export default USE_NFTS;
