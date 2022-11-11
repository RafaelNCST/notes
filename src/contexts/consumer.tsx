import { useContext } from 'react';
import { MainContext } from '.';

export const ConsumerMainContext = () => {
  if (!MainContext) {
    throw 'Não é possível usar esse metodo fora do MainContextProvider.';
  }

  return useContext(MainContext);
};
