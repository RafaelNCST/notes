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
  SpaceModal,
} from './styles';
import { defaultStyle } from '../../styles/themes/defaultStyle';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  actionNegative: () => void;
  actionAffirmative: () => void;
  text: string;
  iconName: string;
  arrayBlankWarnings?: string[];
  textButtonAffirmative: string;
  textButtonNegative: string;
  closeModal: () => void;
}

export const ModalWarning: React.FC<Props> = ({
  actionNegative,
  actionAffirmative,
  text,
  iconName,
  arrayBlankWarnings,
  textButtonAffirmative,
  textButtonNegative,
  closeModal,
}) => {
  return (
    <BodyScreenModal>
      <Content>
        <SpaceModal height="8%" border="bot" />
        <ContainerIcon>
          <Icon
            name={iconName}
            color={
              iconName === 'done'
                ? defaultStyle.colors.GREEN_AFIRMATIVE
                : defaultStyle.colors.RED_NEGATIVE
            }
            size={iconName === 'done' ? 60 : 50}
          />
        </ContainerIcon>
        <ContainerText>
          <TextModalRegular accessibilityRole="Text" accessibilityLabel={text}>
            {text}
          </TextModalRegular>
          <SubContainerText>
            {arrayBlankWarnings?.map((item, index) => (
              <TextBlankWarning
                accessibilityRole="Text"
                accessibilityLabel={item}
                key={index}>
                {item}
              </TextBlankWarning>
            ))}
          </SubContainerText>
        </ContainerText>
        <SpaceModal height="15%" border="top">
          <ContainerButton>
            {textButtonNegative !== '' && (
              <ButtonOk
                accessibilityRole="button"
                accessibilityLabel="Botão de ação"
                colorButton="negative"
                onPress={actionNegative}>
                <TextModalTitle>{textButtonNegative}</TextModalTitle>
              </ButtonOk>
            )}
            <ButtonOk
              accessibilityRole="button"
              accessibilityLabel="Botão de ação"
              colorButton="affirmative"
              onPress={iconName === 'done' ? actionAffirmative : closeModal}>
              <TextModalTitle>{textButtonAffirmative}</TextModalTitle>
            </ButtonOk>
          </ContainerButton>
        </SpaceModal>
      </Content>
    </BodyScreenModal>
  );
};
