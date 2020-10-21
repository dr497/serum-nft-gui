import { PublicKey } from '@solana/web3.js';
export class NFT {
  img: Object;
  name: string;
  supply: number;
  mintAddress: PublicKey;
  marketAddress: PublicKey;
  sold: boolean;
  constructor(
    img: Object,
    name: string,
    supply: number,
    mintAddress: PublicKey,
    marketAddress: PublicKey,
    sold: boolean,
  ) {
    this.img = img;
    this.name = name;
    this.supply = supply;
    this.mintAddress = mintAddress;
    this.marketAddress = marketAddress;
    this.sold = sold;
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
  ),
  new NFT(
    require('../assets/nfts/2gn1PJdMAU92SU5inLSp4Xp16ZC5iLF6ScEi7UBvp8ZD/satoshi-closeup.JPG'),
    'Satoshi Closeup',
    10,
    new PublicKey('2gn1PJdMAU92SU5inLSp4Xp16ZC5iLF6ScEi7UBvp8ZD'),
    new PublicKey('7CGbje815jANonTXSBsdP7nkRLwy3ShLLvZFZRjtU7g2'),
    false,
  ),
  new NFT(
    require('../assets/nfts/7mhZHtPL4GFkquQR4Y6h34Q8hNkQvGc1FaNtyE43NvUR/satoshi-gb.JPG'),
    'Satoshi GB',
    10,
    new PublicKey('7mhZHtPL4GFkquQR4Y6h34Q8hNkQvGc1FaNtyE43NvUR'),
    new PublicKey('EHKqPgFnWHzUvgqzhroSeEDp4mD2em2RasxMmTPHDP6x'),
    false,
  ),
  new NFT(
    require('../assets/nfts/8RoKfLx5RCscbtVh8kYb81TF7ngFJ38RPomXtUREKsT2/satoshi-og.gif'),
    'Satoshi OG',
    10,
    new PublicKey('8RoKfLx5RCscbtVh8kYb81TF7ngFJ38RPomXtUREKsT2'),
    new PublicKey('4uedKfwhVWreNYeQwzfd3nXSxR8A3muGpYdTxm88U7TX'),
    false,
  ),
  new NFT(
    require('../assets/nfts/9rw5hyDngBQ3yDsCRHqgzGHERpU2zaLh1BXBUjree48J/satoshi-btc.gif'),
    'Satoshi BTC',
    10,
    new PublicKey('9rw5hyDngBQ3yDsCRHqgzGHERpU2zaLh1BXBUjree48J'),
    new PublicKey('4H9oaHZ5pqtyEiKdcySFJnzNrWdXiG2H8HZG8fwx3kGM'),
    false,
  ),
  new NFT(
    require('../assets/nfts/AiD7J6D5Hny5DJB1MrYBc2ePQqy2Yh4NoxWwYfR7PzxH/satoshi-gb.gif'),
    'Satoshi GB',
    10,
    new PublicKey('AiD7J6D5Hny5DJB1MrYBc2ePQqy2Yh4NoxWwYfR7PzxH'),
    new PublicKey('5W39A7d5iqHzh7oUHyu37HBN2nx7Ptg4yrSvgz1A8sq9'),
    false,
  ),
  new NFT(
    require('../assets/nfts/bxiA13fpU1utDmYuUvxvyMT8odew5FEm96MRv7ij3eb/satoshi.gif'),
    'Satoshi',
    10,
    new PublicKey('bxiA13fpU1utDmYuUvxvyMT8odew5FEm96MRv7ij3eb'),
    new PublicKey('GXS6UKiTewG6FxwmwzkBKLRGyXfhZ5sbHwUcJZBZXrVT'),
    false,
  ),
  new NFT(
    require('../assets/nfts/GoC24kpj6TkvjzspXrjSJC2CVb5zMWhLyRcHJh9yKjRF/satoshi-closeup.gif'),
    'Satoshi Closeup',
    10,
    new PublicKey('GoC24kpj6TkvjzspXrjSJC2CVb5zMWhLyRcHJh9yKjRF'),
    new PublicKey('AfuXKRbioPV9WkxiCJvVwgCVY3Y5D2dHhr2NMUaKoXiD'),
    false,
  ),
  new NFT(
    require('../assets/nfts/oCUduD44ETuZ65bpWdPzPDSnAdreg1sJrugfwyFZVHV/satoshi-btc.JPG'),
    'Satoshi BTC',
    10,
    new PublicKey('oCUduD44ETuZ65bpWdPzPDSnAdreg1sJrugfwyFZVHV'),
    new PublicKey('5rfx5u8aPY4MiSAvUxAqDFFhGgLGb8Luy1DQJVPcTt3e'),
    false,
  ),
];

export default USE_NFTS;
