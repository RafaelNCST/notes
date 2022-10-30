import React from 'react';
import { TextModalRegular } from '../../../../styles/globalStyles';
import { SubContainerWords, ContainerIcon } from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  IconName: string;
  Text: string;
}

export const LineIconsInfo: React.FC<Props> = ({ IconName, Text }) => {
  return (
    <SubContainerWords>
      <ContainerIcon>
        <Icon name={IconName} size={15} color="#fff" />
      </ContainerIcon>
      <TextModalRegular>{Text}</TextModalRegular>
    </SubContainerWords>
  );
};
