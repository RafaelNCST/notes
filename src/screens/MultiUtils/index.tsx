import React from 'react';
import { BodyScreen } from '../../styles/globalStyles';
import { ArrowNavigation } from '../../components/arrowNavigation';
import { ButtonContainer, Container } from './styles';
import { DropDown } from '../../components/DropDown';
import { SlideButton } from '../../components/SlideButton';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { DATA, DATA2 } from '../../helpers/DATAdropDown';
import { CoinShow } from './components/CoinShow';

const sunImage = () => {
  return <Icon name={'wb-sunny'} size={15} color={'#ff9c07'} />;
};

const moonImage = () => {
  return <Icon name={'brightness-2'} size={15} color={'#685369'} />;
};

export const MultiUtils: React.FC = () => {
  return (
    <BodyScreen>
      <Container>
        <ButtonContainer>
          <ArrowNavigation direction="left" route="HomeScreen" />
        </ButtonContainer>
        <DropDown Data={DATA} zIndex={3} />
        <DropDown Data={DATA2} zIndex={2} />
        <SlideButton ImageOne={moonImage} ImageTwo={sunImage} />
        <CoinShow />
      </Container>
    </BodyScreen>
  );
};
