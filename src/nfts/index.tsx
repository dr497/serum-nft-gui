import { PublicKey } from '@solana/web3.js';

export enum NFT_Types {
  VIDEO = 'VIDEO',
  IMAGE = 'IMAGE',
  REDEEMABLE = 'REDEEMABLE',
}

export class NFT {
  img: Object;
  imgSmall: Object;
  name: string;
  supply: number;
  mintAddress: PublicKey;
  marketAddress: PublicKey;
  redeembale: boolean;
  keywords: string[];
  type: NFT_Types;
  redeemAddress?: PublicKey;
  constructor(
    img: Object,
    imgSmall: Object,
    name: string,
    supply: number,
    mintAddress: PublicKey,
    marketAddress: PublicKey,
    redeembale: boolean,
    keywords: string[],
    type: NFT_Types,
    redeemAddress?: PublicKey,
  ) {
    this.img = img;
    this.imgSmall = imgSmall;
    this.name = name;
    this.supply = supply;
    this.mintAddress = mintAddress;
    this.marketAddress = marketAddress;
    this.redeembale = redeembale;
    this.keywords = keywords;
    this.type = type;
    this.redeemAddress = redeemAddress;
  }
}

const USE_NFTS: NFT[] = [
  new NFT(
    require('../assets/nfts/AcstFzGGawvvdVhYV9bftr7fmBHbePUjhv53YK1W3dZo/AcstFzGGawvvdVhYV9bftr7fmBHbePUjhv53YK1W3dZo.gif'),
    require('../assets/nfts/AcstFzGGawvvdVhYV9bftr7fmBHbePUjhv53YK1W3dZo/small.mp4'),
    'LSD',
    1,
    new PublicKey('AcstFzGGawvvdVhYV9bftr7fmBHbePUjhv53YK1W3dZo'),
    new PublicKey('BdU5UYU8AU9iTVJXF6Sxc63M6XY4XWqZpdq2PigoqA92'),
    false,
    ['lsd', 'gif'],
    NFT_Types.VIDEO,
  ),
  new NFT(
    require('../assets/nfts/91fSFQsPzMLat9DHwLdQacW3i3EGnWds5tA5mt7yLiT9/91fSFQsPzMLat9DHwLdQacW3i3EGnWds5tA5mt7yLiT9.gif'),
    require('../assets/nfts/91fSFQsPzMLat9DHwLdQacW3i3EGnWds5tA5mt7yLiT9/small.mp4'),
    'Unlimited Energy',
    10,
    new PublicKey('91fSFQsPzMLat9DHwLdQacW3i3EGnWds5tA5mt7yLiT9'),
    new PublicKey('BnWVMg9dvBLbQDR9j96QP8q85SFPWEsyouZUEMLevkE3'),
    false,
    ['unlimited', 'energy', 'bonfida', 'front'],
    NFT_Types.VIDEO,
  ),
  new NFT(
    require('../assets/nfts/29PEpZeuqWf9tS2gwCjpeXNdXLkaZSMR2s1ibkvGsfnP/29PEpZeuqWf9tS2gwCjpeXNdXLkaZSMR2s1ibkvGsfnP.gif'),
    require('../assets/nfts/29PEpZeuqWf9tS2gwCjpeXNdXLkaZSMR2s1ibkvGsfnP/small.mp4'),
    'Need for Speed',
    25,
    new PublicKey('29PEpZeuqWf9tS2gwCjpeXNdXLkaZSMR2s1ibkvGsfnP'),
    new PublicKey('6u8M7NH853WRpxnLs9qKKZn3ShR9QK4Y6kE6X9A1s7wK'),
    false,
    ['need', 'speed', 'front'],
    NFT_Types.VIDEO,
  ),
  new NFT(
    require('../assets/nfts/HsY8PNar8VExU335ZRYzg89fX7qa4upYu6vPMPFyCDdK/HsY8PNar8VExU335ZRYzg89fX7qa4upYu6vPMPFyCDdK.gif'),
    require('../assets/nfts/HsY8PNar8VExU335ZRYzg89fX7qa4upYu6vPMPFyCDdK/small.mp4'),
    'ADOR OPENS',
    111,
    new PublicKey('HsY8PNar8VExU335ZRYzg89fX7qa4upYu6vPMPFyCDdK'),
    new PublicKey('CWMXgar54YBisdbSCM2JPd7kHkkX9fZMgCsvkWG5j4zo'),
    false,
    ['ador', 'opens', 'adors org'],
    NFT_Types.VIDEO,
  ),
  new NFT(
    require('../assets/nfts/EDP8TpLJ77M3KiDgFkZW4v4mhmKJHZi9gehYXenfFZuL/EDP8TpLJ77M3KiDgFkZW4v4mhmKJHZi9gehYXenfFZuL.jpeg'),
    require('../assets/nfts/EDP8TpLJ77M3KiDgFkZW4v4mhmKJHZi9gehYXenfFZuL/small.jpeg'),
    'CMS - Rare',
    1,
    new PublicKey('EDP8TpLJ77M3KiDgFkZW4v4mhmKJHZi9gehYXenfFZuL'),
    new PublicKey('GgWVyfbM1tfJ72vGfCinmqxhdQQkyy8t67YzWzc9izsA'),
    false,
    ['cms', 'holding'],
    NFT_Types.IMAGE,
  ),
  new NFT(
    require('../assets/nfts/BrUKFwAABkExb1xzYU4NkRWzjBihVQdZ3PBz4m5S8if3/BrUKFwAABkExb1xzYU4NkRWzjBihVQdZ3PBz4m5S8if3.png'),
    require('../assets/nfts/BrUKFwAABkExb1xzYU4NkRWzjBihVQdZ3PBz4m5S8if3/small.png'),
    'Tesla',
    10,
    new PublicKey('BrUKFwAABkExb1xzYU4NkRWzjBihVQdZ3PBz4m5S8if3'),
    new PublicKey('5vH2BhEqpBw7ouE1g4dYLstigj6zin1k9n9FzNfExYJK'),
    false,
    ['ftx', 'tsla', 'tesla', 'pepe', 'frog'],
    NFT_Types.IMAGE,
  ),
  new NFT(
    require('../assets/nfts/9CmQwpvVXRyixjiE3LrbSyyopPZohNDN1RZiTk8rnXsQ/9CmQwpvVXRyixjiE3LrbSyyopPZohNDN1RZiTk8rnXsQ.gif'),
    require('../assets/nfts/9CmQwpvVXRyixjiE3LrbSyyopPZohNDN1RZiTk8rnXsQ/small.mp4'),
    'DeceFi',
    1,
    new PublicKey('9CmQwpvVXRyixjiE3LrbSyyopPZohNDN1RZiTk8rnXsQ'),
    new PublicKey('BKZSAFLqxBHKXJk3cw5pGdFCsKzyrouSG19KmiUQKXBh'),
    false,
    ['decefi', 'DCFI'],
    NFT_Types.VIDEO,
  ),
  new NFT(
    require('../assets/nfts/F6ST1wWkx2PeH45sKmRxo1boyuzzWCfpnvyKL4BGeLxF/F6ST1wWkx2PeH45sKmRxo1boyuzzWCfpnvyKL4BGeLxF.jpg'),
    require('../assets/nfts/F6ST1wWkx2PeH45sKmRxo1boyuzzWCfpnvyKL4BGeLxF/small.jpg'),
    'Power User',
    50,
    new PublicKey('F6ST1wWkx2PeH45sKmRxo1boyuzzWCfpnvyKL4BGeLxF'),
    new PublicKey('3qgMuJsYwmYh66bu2LjurTciwDPnoiDPoXdyBAEjs8ss'),
    false,
    ['power', 'user'],
    NFT_Types.IMAGE,
  ),
  new NFT(
    require('../assets/nfts/dZytJ7iPDcCu9mKe3srL7bpUeaR3zzkcVqbtqsmxtXZ/dZytJ7iPDcCu9mKe3srL7bpUeaR3zzkcVqbtqsmxtXZ.jpg'),
    require('../assets/nfts/dZytJ7iPDcCu9mKe3srL7bpUeaR3zzkcVqbtqsmxtXZ/small.jpg'),
    'VIP Member',
    20,
    new PublicKey('dZytJ7iPDcCu9mKe3srL7bpUeaR3zzkcVqbtqsmxtXZ'),
    new PublicKey('2sF1kCMEUh3RW4x4znGj73sGqhsrHfzWS2KyTML4RD3u'),
    false,
    ['vip', 'member'],
    NFT_Types.IMAGE,
  ),
  new NFT(
    require('../assets/nfts/8T4vXgwZUWwsbCDiptHFHjdfexvLG9UP8oy1psJWEQdS/8T4vXgwZUWwsbCDiptHFHjdfexvLG9UP8oy1psJWEQdS.gif'),
    require('../assets/nfts/8T4vXgwZUWwsbCDiptHFHjdfexvLG9UP8oy1psJWEQdS/small.mp4'),
    'Uni Christmas',
    1,
    new PublicKey('8T4vXgwZUWwsbCDiptHFHjdfexvLG9UP8oy1psJWEQdS'),
    new PublicKey('Ev6wW561tdrsFakA9G9TddMbCsCnkbGGRy4d5B5Q43fQ'),
    false,
    ['uni', 'uniswap', 'christmas'],
    NFT_Types.VIDEO,
  ),
  new NFT(
    require('../assets/nfts/EjFGGJSyp9UDS8aqafET5LX49nsG326MeNezYzpiwgpQ/EjFGGJSyp9UDS8aqafET5LX49nsG326MeNezYzpiwgpQ.jpg'),
    require('../assets/nfts/EjFGGJSyp9UDS8aqafET5LX49nsG326MeNezYzpiwgpQ/small.jpg'),
    'BNB',
    1,
    new PublicKey('7RpFk44cMTAUt9CcjEMWnZMypE9bYQsjBiSNLn5qBvhP'),
    new PublicKey('474bvPo2KH3L9E8fpBspKgeDGqW51ysiH5LTnbko1Njq'),
    false,
    ['bnb', 'binance'],
    NFT_Types.IMAGE,
  ),
  new NFT(
    require('../assets/nfts/FkmkTr4en8CXkfo9jAwEMov6PVNLpYMzWr3Udqf9so8Z/FkmkTr4en8CXkfo9jAwEMov6PVNLpYMzWr3Udqf9so8Z.png'),
    require('../assets/nfts/FkmkTr4en8CXkfo9jAwEMov6PVNLpYMzWr3Udqf9so8Z/small.png'),
    'Seldom',
    1500,
    new PublicKey('FkmkTr4en8CXkfo9jAwEMov6PVNLpYMzWr3Udqf9so8Z'),
    new PublicKey('AQWam8CiWsbqQWGToD9vwYRStZTYAuCuUKnV3iorDasA'),
    false,
    ['seldom', 'wallet'],
    NFT_Types.IMAGE,
  ),
  new NFT(
    require('../assets/nfts/2gn1PJdMAU92SU5inLSp4Xp16ZC5iLF6ScEi7UBvp8ZD/2gn1PJdMAU92SU5inLSp4Xp16ZC5iLF6ScEi7UBvp8ZD.JPG'),
    require('../assets/nfts/2gn1PJdMAU92SU5inLSp4Xp16ZC5iLF6ScEi7UBvp8ZD/small.JPG'),
    'Satoshi Closeup',
    10,
    new PublicKey('2gn1PJdMAU92SU5inLSp4Xp16ZC5iLF6ScEi7UBvp8ZD'),
    new PublicKey('7CGbje815jANonTXSBsdP7nkRLwy3ShLLvZFZRjtU7g2'),
    false,
    ['satoshi', 'closeup', 'genesis', 'block'],
    NFT_Types.IMAGE,
  ),
  new NFT(
    require('../assets/nfts/7mhZHtPL4GFkquQR4Y6h34Q8hNkQvGc1FaNtyE43NvUR/7mhZHtPL4GFkquQR4Y6h34Q8hNkQvGc1FaNtyE43NvUR.JPG'),
    require('../assets/nfts/7mhZHtPL4GFkquQR4Y6h34Q8hNkQvGc1FaNtyE43NvUR/small.JPG'),
    'Satoshi GB',
    10,
    new PublicKey('7mhZHtPL4GFkquQR4Y6h34Q8hNkQvGc1FaNtyE43NvUR'),
    new PublicKey('EHKqPgFnWHzUvgqzhroSeEDp4mD2em2RasxMmTPHDP6x'),
    false,
    ['satoshi', 'gb', 'genesis', 'block'],
    NFT_Types.IMAGE,
  ),
  new NFT(
    require('../assets/nfts/8RoKfLx5RCscbtVh8kYb81TF7ngFJ38RPomXtUREKsT2/8RoKfLx5RCscbtVh8kYb81TF7ngFJ38RPomXtUREKsT2.gif'),
    require('../assets/nfts/8RoKfLx5RCscbtVh8kYb81TF7ngFJ38RPomXtUREKsT2/small.mp4'),
    'Satoshi OG',
    10,
    new PublicKey('8RoKfLx5RCscbtVh8kYb81TF7ngFJ38RPomXtUREKsT2'),
    new PublicKey('4uedKfwhVWreNYeQwzfd3nXSxR8A3muGpYdTxm88U7TX'),
    false,
    ['satoshi', 'og', 'genesis', 'block', 'gif'],
    NFT_Types.VIDEO,
  ),
  new NFT(
    require('../assets/nfts/9rw5hyDngBQ3yDsCRHqgzGHERpU2zaLh1BXBUjree48J/9rw5hyDngBQ3yDsCRHqgzGHERpU2zaLh1BXBUjree48J.gif'),
    require('../assets/nfts/9rw5hyDngBQ3yDsCRHqgzGHERpU2zaLh1BXBUjree48J/small.mp4'),
    'Satoshi BTC',
    10,
    new PublicKey('9rw5hyDngBQ3yDsCRHqgzGHERpU2zaLh1BXBUjree48J'),
    new PublicKey('4H9oaHZ5pqtyEiKdcySFJnzNrWdXiG2H8HZG8fwx3kGM'),
    false,
    ['satoshi', 'btc', 'genesis', 'block', 'gif'],
    NFT_Types.VIDEO,
  ),
  new NFT(
    require('../assets/nfts/AiD7J6D5Hny5DJB1MrYBc2ePQqy2Yh4NoxWwYfR7PzxH/AiD7J6D5Hny5DJB1MrYBc2ePQqy2Yh4NoxWwYfR7PzxH.gif'),
    require('../assets/nfts/AiD7J6D5Hny5DJB1MrYBc2ePQqy2Yh4NoxWwYfR7PzxH/small.mp4'),
    'Satoshi GB',
    10,
    new PublicKey('AiD7J6D5Hny5DJB1MrYBc2ePQqy2Yh4NoxWwYfR7PzxH'),
    new PublicKey('5W39A7d5iqHzh7oUHyu37HBN2nx7Ptg4yrSvgz1A8sq9'),
    false,
    ['satoshi', 'gb', 'genesis', 'block', 'gif'],
    NFT_Types.VIDEO,
  ),
  new NFT(
    require('../assets/nfts/bxiA13fpU1utDmYuUvxvyMT8odew5FEm96MRv7ij3eb/bxiA13fpU1utDmYuUvxvyMT8odew5FEm96MRv7ij3eb.gif'),
    require('../assets/nfts/bxiA13fpU1utDmYuUvxvyMT8odew5FEm96MRv7ij3eb/small.mp4'),
    'Satoshi',
    10,
    new PublicKey('bxiA13fpU1utDmYuUvxvyMT8odew5FEm96MRv7ij3eb'),
    new PublicKey('GXS6UKiTewG6FxwmwzkBKLRGyXfhZ5sbHwUcJZBZXrVT'),
    false,
    ['satoshi', 'genesis', 'block', 'gif'],
    NFT_Types.VIDEO,
  ),
  new NFT(
    require('../assets/nfts/GoC24kpj6TkvjzspXrjSJC2CVb5zMWhLyRcHJh9yKjRF/GoC24kpj6TkvjzspXrjSJC2CVb5zMWhLyRcHJh9yKjRF.gif'),
    require('../assets/nfts/GoC24kpj6TkvjzspXrjSJC2CVb5zMWhLyRcHJh9yKjRF/small.mp4'),
    'Satoshi Closeup',
    10,
    new PublicKey('GoC24kpj6TkvjzspXrjSJC2CVb5zMWhLyRcHJh9yKjRF'),
    new PublicKey('AfuXKRbioPV9WkxiCJvVwgCVY3Y5D2dHhr2NMUaKoXiD'),
    false,
    ['satoshi', 'closeup', 'genesis', 'block', 'gif'],
    NFT_Types.VIDEO,
  ),
  new NFT(
    require('../assets/nfts/oCUduD44ETuZ65bpWdPzPDSnAdreg1sJrugfwyFZVHV/oCUduD44ETuZ65bpWdPzPDSnAdreg1sJrugfwyFZVHV.JPG'),
    require('../assets/nfts/oCUduD44ETuZ65bpWdPzPDSnAdreg1sJrugfwyFZVHV/small.JPG'),
    'Satoshi BTC',
    10,
    new PublicKey('oCUduD44ETuZ65bpWdPzPDSnAdreg1sJrugfwyFZVHV'),
    new PublicKey('5rfx5u8aPY4MiSAvUxAqDFFhGgLGb8Luy1DQJVPcTt3e'),
    false,
    ['satoshi', 'btc', 'genesis', 'block'],
    NFT_Types.IMAGE,
  ),
  new NFT(
    require('../assets/nfts/9Vvre2DxBB9onibwYDHeMsY1cj6BDKtEDccBPWRN215E/9Vvre2DxBB9onibwYDHeMsY1cj6BDKtEDccBPWRN215E.gif'),
    require('../assets/nfts/9Vvre2DxBB9onibwYDHeMsY1cj6BDKtEDccBPWRN215E/small.mp4'),
    'Satoshi Nakamoto',
    1,
    new PublicKey('9Vvre2DxBB9onibwYDHeMsY1cj6BDKtEDccBPWRN215E'),
    new PublicKey('F4euXHP7KWijkhGqsGEqWy9iZKeNc1jg2LVodKHQ13PV'),
    false,
    ['satoshi', 'nakamoto'],
    NFT_Types.VIDEO,
  ),
  new NFT(
    require('../assets/nfts/7RpFk44cMTAUt9CcjEMWnZMypE9bYQsjBiSNLn5qBvhP/7RpFk44cMTAUt9CcjEMWnZMypE9bYQsjBiSNLn5qBvhP.gif'),
    require('../assets/nfts/7RpFk44cMTAUt9CcjEMWnZMypE9bYQsjBiSNLn5qBvhP/small.mp4'),
    'Charles Hoskinson',
    1,
    new PublicKey('7RpFk44cMTAUt9CcjEMWnZMypE9bYQsjBiSNLn5qBvhP'),
    new PublicKey('474bvPo2KH3L9E8fpBspKgeDGqW51ysiH5LTnbko1Njq'),
    false,
    ['charles', 'hoskinson'],
    NFT_Types.VIDEO,
  ),
  new NFT(
    require('../assets/nfts/GyRkPAxpd9XrMHcBF6fYHVRSZQvQBwAGKAGQeBPSKzMq/GyRkPAxpd9XrMHcBF6fYHVRSZQvQBwAGKAGQeBPSKzMq.gif'),
    require('../assets/nfts/GyRkPAxpd9XrMHcBF6fYHVRSZQvQBwAGKAGQeBPSKzMq/small.mp4'),
    'SBF',
    1,
    new PublicKey('GyRkPAxpd9XrMHcBF6fYHVRSZQvQBwAGKAGQeBPSKzMq'),
    new PublicKey('HFmsR4XGcSPbUv4sG4Km1TVr1V9reXZKgUQaYzSiKTpD'),
    false,
    ['sam', 'sbf', 'bankman-fried'],
    NFT_Types.VIDEO,
  ),
];

export default USE_NFTS;

export const USE_REDEEMABLE_NFTS: NFT[] = [
  new NFT(
    require('../assets/nfts/AgdBQN2Sy2abiZ2KToWeUsQ9PHdCv95wt6kVWRf5zDkx/AgdBQN2Sy2abiZ2KToWeUsQ9PHdCv95wt6kVWRf5zDkx.jpg'),
    require('../assets/nfts/AgdBQN2Sy2abiZ2KToWeUsQ9PHdCv95wt6kVWRf5zDkx/small.jpg'),
    'Bitcoin Tram',
    5,
    new PublicKey('AgdBQN2Sy2abiZ2KToWeUsQ9PHdCv95wt6kVWRf5zDkx'),
    new PublicKey('CWkuMPt24aZFA4sHTUs43zwp3N8Lh9UfKNAScQqQ8uUg'),
    false,
    ['bitcoin', 'tram', 'hong', 'kong'],
    NFT_Types.IMAGE,
    new PublicKey('FCHmpXY6AQifAwe6SjAEGfF6APTPEcCjyNFAHn83ijdb'),
  ),
];

export const USE_ALL_NFTS = [...USE_NFTS, ...USE_REDEEMABLE_NFTS];
