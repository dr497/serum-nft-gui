import Urls from './Urls';
import { TokenMintReq, DBNFTPostReq } from './types';
import { DB_API_KEY } from './credentials';

export async function apiPost(path, body, headers) {
  try {
    let response = await fetch(path, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: headers,
    });
    if (!response.ok) {
      return [];
    }
    let json = await response.json();
    return json;
  } catch (err) {
    throw err;
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

export const postNFTData = async (data: DBNFTPostReq) => {
  try {
    const result = await apiPost(Urls.dbAPI, data, {
      Authorization: 'Api-key ' + DB_API_KEY,
    });
    return result;
  } catch (error) {
    throw error;
  }
};