import Urls from './Urls';

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
    console.log(err);
    return [];
  }
}

export const postRedeemForm = async (data) => {
  const result = await apiPost(Urls.postRedeemForm, data, {
    'Content-Type': 'application/json',
  });
  return result;
};
