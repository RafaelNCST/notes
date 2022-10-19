import React from 'react';
import { IconArrow } from './styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../routes/types';

interface Props {
  direction: string;
  route: 'MultiUtils' | 'HomeScreen';
}

export const ArrowNavigation: React.FC<Props> = ({ direction, route }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const handleNavigation = () => {
    if (route === 'MultiUtils') {
      navigation.navigate(route);
    } else if ('HomeScreen') {
      navigation.goBack();
    }
  };

  return (
    <IconArrow
      name={direction === 'right' ? 'arrow-forward-ios' : 'arrow-back-ios'}
      size={30}
      onPress={handleNavigation}
    />
  );
};
