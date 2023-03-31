import axios from 'axios';

const HOST = `https://test.v5.pryaniky.com`;

export const requestToken = async (username: string, password: string) => {

  try {
    const response = await axios.post(`${HOST}/ru/data/v3/testmethods/docs/login`, {
      username: username,
      password: password
    });
    console.log('response', response);
    return response.data.data.token;
  } catch (err) {
    console.log('ошибка запроса:', err);
  }
};
