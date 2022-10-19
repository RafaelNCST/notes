import axios from 'axios';

const baseAPI = axios.create({
  baseURL: 'https://economia.awesomeapi.com.br',
});

export const getCoinUSD_BRL = async () => {
  try {
    return await baseAPI.get('/last/USD-BRL');
  } catch (error) {
    console.log(error);
  }
};
