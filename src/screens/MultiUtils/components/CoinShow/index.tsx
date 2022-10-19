import React, { useEffect, useState } from 'react';
import { TextSubTitle } from '../../../../styles/globalStyles';
import {
  CoinShowContainer,
  CoinShowBRL,
  CoinEqualShow,
  CoinShowUSD,
  ContainerSpinner,
} from './styles';
import { getCoinUSD_BRL } from '../../../../services/apiBase';
import { ActivityIndicator } from 'react-native';

const Spinner = () => {
  return (
    <ContainerSpinner>
      <ActivityIndicator color="#fff" size={20} />
    </ContainerSpinner>
  );
};

export const CoinShow = () => {
  const [coinBRL, setCoinBRL] = useState<null | string>(null);

  const getCoinInfos = async () => {
    const result = await getCoinUSD_BRL();
    setCoinBRL(result?.data.USDBRL.bid);
  };

  useEffect(() => {
    getCoinInfos();
  }, []);

  return (
    <CoinShowContainer>
      <CoinShowBRL>
        <TextSubTitle>USD 1,00</TextSubTitle>
      </CoinShowBRL>
      <CoinEqualShow>
        <TextSubTitle>=</TextSubTitle>
      </CoinEqualShow>
      <CoinShowUSD>
        <TextSubTitle>
          {coinBRL ? `BRL ${parseFloat(coinBRL).toFixed(2)}` : <Spinner />}
        </TextSubTitle>
      </CoinShowUSD>
    </CoinShowContainer>
  );
};
