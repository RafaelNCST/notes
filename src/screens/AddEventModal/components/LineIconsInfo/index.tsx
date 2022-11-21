import React from 'react';
import { SubContainerWords, ContainerIcon, TextModalRegular } from './styles';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  IconName: string;
  Text: string;
}

export const LineIconsInfo: React.FC<Props> = ({ IconName, Text }) => {
  const { t } = useTranslation();
  return (
    <SubContainerWords>
      <ContainerIcon>
        <Icon name={IconName} size={15} color="#fff" />
      </ContainerIcon>
      <TextModalRegular accessibilityRole="Text" accessibilityLabel={Text}>
        {t(Text)}
      </TextModalRegular>
    </SubContainerWords>
  );
};
