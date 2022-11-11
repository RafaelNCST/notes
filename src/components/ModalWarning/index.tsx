import React from 'react';
import { BodyScreenModal } from '../../styles/globalStyles';
import {
  Content,
  ContainerText,
  ButtonOk,
  ContainerButton,
  ContainerIcon,
  SubContainerText,
  TextBlankWarning,
  TextModalTitle,
  TextModalRegular,
} from './styles';
import { defaultStyle } from '../../styles/themes/defaultStyle';
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
  return (
    <BodyScreenModal>
      <Content>
        <ContainerIcon>
          <Icon
            name={iconName}
            color={
              iconName === 'done'
                ? defaultStyle.colors.GREEN_AFIRMATIVE
                : defaultStyle.colors.RED_NEGATIVE
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
