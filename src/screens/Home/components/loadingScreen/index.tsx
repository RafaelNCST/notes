import React from 'react';
import { Image } from '../../../../styles/globalStyles';
import { BackgroundView } from './styles';
import LogoImage from '../../../../assets/images/logo.png';

export const LoadingScreen = () => {
  return (
    <BackgroundView>
      <Image source={LogoImage} width="100px" height="100px" />
    </BackgroundView>
  );
};
