import React from 'react';
import {
  BodyScreenModal,
  TextModalRegular,
  TextModalTitle,
} from '../../styles/globalStyles';
import {
  Content,
  ContainerText,
  ButtonOk,
  ContainerButton,
  ContainerIcon,
  SubContainerText,
  TextBlankWarning,
} from './styles';
import { useTheme } from 'styled-components';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  actionNegative: (state: boolean) => void;
  actionAffirmative: () => void;
  text: string;
  iconName: string;
  arrayBlankWarnings?: string[];
  textButtonAffirmative: string;
  textButtonNegative: string;
}

export const ModalWarning: React.FC<Props> = ({
  actionNegative,
  actionAffirmative,
  text,
  iconName,
  arrayBlankWarnings,
  textButtonAffirmative,
  textButtonNegative,
}) => {
  const theme = useTheme();

  return (
    <BodyScreenModal>
      <Content>
        <ContainerIcon>
          <Icon
            name={iconName}
            color={
              iconName === 'done'
                ? theme.colors.ButtonAfirmative
                : theme.colors.ButtonNegative
            }
            size={iconName === 'done' ? 50 : 40}
          />
        </ContainerIcon>
        <ContainerText>
          <TextModalRegular>{text}</TextModalRegular>
          <SubContainerText>
            {arrayBlankWarnings?.map((item, index) => (
              <TextBlankWarning key={index}>{item}</TextBlankWarning>
            ))}
          </SubContainerText>
        </ContainerText>
        <ContainerButton>
          {textButtonNegative !== '' && (
            <ButtonOk
              colorButton="negative"
              onPress={() => actionNegative(false)}>
              <TextModalTitle>{textButtonNegative}</TextModalTitle>
            </ButtonOk>
          )}
          <ButtonOk colorButton="affirmative" onPress={actionAffirmative}>
            <TextModalTitle>{textButtonAffirmative}</TextModalTitle>
          </ButtonOk>
        </ContainerButton>
      </Content>
    </BodyScreenModal>
  );
};
