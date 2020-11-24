import Urls from './Urls';
import { TokenMintReq, DBNFTPostReq } from './types';
import { MarketFilter } from './markets';
import { NFT_Filter } from '../nfts';

export async function apiPost(path, body, headers) {
  try {
    let response = await fetch(path, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: headers,
    });

    let json = await response.json();
    return json;
  } catch (err) {
    throw err;
  }
}

export async function apiGet(path, headers) {
  try {
    let response = await fetch(path, {
      method: 'GET',
      headers: headers,
    });

    let json = await response.json();
    return json;
  } catch (error) {
    throw error;
  }
}

export const postRedeemForm = async (data) => {
  try {
    const result = await apiPost(Urls.postRedeemForm, data, {});
    return result;
  } catch (error) {
    throw error;
  }
};

export const postMintToken = async (data: TokenMintReq) => {
  try {
    const result = await apiPost(Urls.postMintToken, data, {});
    return result;
  } catch (error) {
    throw error;
  }
};

export const getNFTData = async (filter: NFT_Filter) => {
  try {
    let search = new URLSearchParams();
    for (const [key, value] of Object.entries(filter)) {
      if (Array.isArray(value)) {
        for (let v of value) {
          search.append(key, v);
        }
      } else {
        search.append(key, value as string);
      }
    }
    const result = await apiGet(Urls.dbAPI + '/nft?' + search.toString(), {});
    return result;
  } catch (error) {
    throw error;
  }
};

export const postNFTData = async (data: DBNFTPostReq) => {
  try {
    const result = await apiPost(Urls.dbAPI + '/nft', data, {
      'Content-Type': 'application/json',
    });
    return result;
  } catch (error) {
    throw error;
  }
};

export const getMarketData = async (filter: MarketFilter) => {
  try {
    let search = new URLSearchParams();
    for (const [key, value] of Object.entries(filter)) {
      if (Array.isArray(value)) {
        for (let v of value) {
          search.append(key, v);
        }
      } else {
        search.append(key, value as string);
      }
    }
    const result = await apiGet(
      Urls.dbAPI + '/market?' + search.toString(),
      {},
    );
    return result;
  } catch (error) {
    throw error;
  }
};
