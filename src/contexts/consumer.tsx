import { useContext } from 'react';
import { MainContext } from '.';

export const ConsumerMainContext = () => {
  if (!MainContext) {
    throw 'Não é possível usar esse metodo fora do QrCodeEloContextProvider.';
  }

  return useContext(MainContext);
};
