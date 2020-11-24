import { PublicKey } from '@solana/web3.js';
import { useEffect, useState } from 'react';
import { getNFTData } from '../utils/network';

export enum NFT_Types {
  VIDEO = 'VIDEO',
  IMAGE = 'IMAGE',
  REDEEMABLE = 'REDEEMABLE',
}

export interface NFTRes {
  img: string;
  name: string;
  supply: number;
  mintAddress: string;
  marketAddress: string;
  redeemable: boolean;
  keywords: string[];
  type: NFT_Types;
  imgSmall?: string;
  redeemAddress?: string;
}

export class NFT {
  img: string;
  name: string;
  supply: number;
  mintAddress: PublicKey;
  marketAddress: PublicKey;
  redeemable: boolean;
  keywords: string[];
  type: NFT_Types;
  imgSmall?: string;
  redeemAddress?: PublicKey;
  constructor(
    img: string,
    name: string,
    supply: number,
    mintAddress: PublicKey,
    marketAddress: PublicKey,
    redeemable: boolean,
    keywords: string[],
    type: NFT_Types,
    imgSmall?: string,
    redeemAddress?: PublicKey,
  ) {
    this.img = img;
    this.name = name;
    this.supply = supply;
    this.mintAddress = mintAddress;
    this.marketAddress = marketAddress;
    this.redeemable = redeemable;
    this.keywords = keywords;
    this.type = type;
    this.imgSmall = imgSmall;
    this.redeemAddress = redeemAddress;
  }
}

export interface NFT_Filter {
  take?: number;
  skip?: number;
  name?: string;
  redeemable?: boolean;
  mintAddress?: string |string[];
  marketAddress?: string | string[];
  type?: NFT_Types;
  keywords?: string | string[];
}

// react hook for query NFTs
export const useNFTs = (f: NFT_Filter = {}) => {
  const [nfts, setNfts] = useState<NFT[]>([]);
  const [filter, setFilter] = useState<NFT_Filter>(f);

  useEffect(() => { const update = async () => {
      try {
        let n : NFTRes[] = await getNFTData(filter);
        let nfts_temp : NFT[] = [];
        n.forEach(e => {
          nfts_temp.push(new NFT(e.img, e.name, e.supply, new PublicKey(e.mintAddress), new PublicKey(e.marketAddress), e.redeemable, e.keywords, NFT_Types[e.type], e.imgSmall, e.redeemAddress ? new PublicKey(e.redeemAddress) : undefined));
        });
        setNfts(nfts_temp);
      } catch (error) {
        throw error;
      }
    };
    update();
  }, [filter]);

  return [nfts, setFilter] as const;
};