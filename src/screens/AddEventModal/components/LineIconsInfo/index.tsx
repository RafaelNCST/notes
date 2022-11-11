import React from 'react';
import { SubContainerWords, ContainerIcon, TextModalRegular } from './styles';
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
      <TextModalRegular accessibilityRole="Text" accessibilityLabel={Text}>
        {Text}
      </TextModalRegular>
    </SubContainerWords>
  );
};
