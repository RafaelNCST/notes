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
import { COLOR_MODAL_ICON } from '../../utils/iconMessageModalColors';
import { useTranslation } from 'react-i18next';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface Props {
  actionNegative?: () => void;
  actionAffirmative: () => void;
  text: string;
  iconName: string;
  arrayBlankError?: string[];
  textButtonAffirmative: string;
  textButtonNegative?: string;
}

export const ModalMessage: React.FC<Props> = ({
  actionNegative,
  actionAffirmative,
  text,
  iconName,
  arrayBlankError,
  textButtonAffirmative,
  textButtonNegative,
}) => {
  const { t } = useTranslation();

  return (
    <BodyScreenModal>
      <Content>
        <SpaceModal height="8%" border="bot" />
        <ContainerIcon>
          <Icon
            name={iconName}
            color={COLOR_MODAL_ICON[iconName]}
            size={iconName === 'done' ? 60 : 50}
          />
        </ContainerIcon>
        <ContainerText>
          <TextModalRegular accessibilityRole="Text" accessibilityLabel={text}>
            {t(text)}
          </TextModalRegular>
          <SubContainerText>
            {arrayBlankError?.map((item, index) => (
              <TextBlankWarning
                accessibilityRole="Text"
                accessibilityLabel={item}
                key={index}>
                {t(item)}
              </TextBlankWarning>
            ))}
          </SubContainerText>
        </ContainerText>
        <SpaceModal height="15%" border="top">
          <ContainerButton>
            {textButtonNegative && (
              <ButtonOk
                accessibilityRole="button"
                accessibilityLabel="Botão de ação"
                colorButton="negative"
                onPress={actionNegative}>
                <TextModalTitle>{t(textButtonNegative)}</TextModalTitle>
              </ButtonOk>
            )}
            <ButtonOk
              accessibilityRole="button"
              accessibilityLabel="Botão de ação"
              colorButton="affirmative"
              onPress={actionAffirmative}>
              <TextModalTitle>{t(textButtonAffirmative)}</TextModalTitle>
            </ButtonOk>
          </ContainerButton>
        </SpaceModal>
      </Content>
    </BodyScreenModal>
  );
};
