import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { defaultStyle } from '../../styles/themes/defaultStyle';
import responsive from '../../styles/themes/responsive';

interface styledProps {
  colorButton?: 'affirmative' | 'negative';
  height?: string;
  border?: 'top' | 'bot';
}

export const SpaceModal = styled.View<styledProps>`
  height: ${({ height }) => height};
  width: 100%;
  border-style: solid;
  border-color: ${defaultStyle.colors.BLACK};
  border-bottom-width: ${({ border }) => (border === 'bot' ? '1px' : '0px')};
  border-top-width: ${({ border }) => (border === 'top' ? '1px' : '0px')};
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.BackGround};
`;

export const Content = styled.View`
  width: 70%;
  height: 350px;
  background-color: ${({ theme }) => theme.colors.BackGround};
  justify-content: space-between;
  align-items: center;
  border: 1px solid ${defaultStyle.colors.BLACK};
`;

export const ContainerText = styled.View`
  width: 80%;
  align-items: center;
`;

export const ContainerIcon = styled.View`
  border-radius: 50px;
  border-width: 1px;
  border-color: ${defaultStyle.colors.BLACK};
  border-style: solid;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 80px;
  background-color: ${({ theme }) => theme.colors.CircleModalBackGroundColor};
`;

export const ContainerButton = styled.View`
  width: 100%;
  align-items: center;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const SubContainerText = styled.View`
  width: 100%;
  flex-direction: column;
`;

export const TextBlankWarning = styled.Text`
  color: ${defaultStyle.colors.RED_NEGATIVE};
  font-family: ${defaultStyle.fontFamily.interSemiBold};
  font-size: ${responsive.medium};
  text-align: center;
  line-height: 18px;
  margin-top: ${responsive.extraSmall};
`;

export const TextModalTitle = styled.Text`
  color: ${defaultStyle.colors.WHITE};
  font-family: ${defaultStyle.fontFamily.interBold};
  font-size: ${responsive.small};
  text-align: center;
  line-height: ${defaultStyle.lineHeight.big};
`;

export const TextModalRegular = styled.Text`
  color: ${({ theme }) => theme.colors.Text};
  font-family: ${defaultStyle.fontFamily.interSemiBold};
  font-size: ${responsive.medium};
  text-align: center;
  line-height: ${defaultStyle.lineHeight.big};
`;

export const ButtonOk = styled(TouchableOpacity)<styledProps>`
  width: 35%;
  height: 90%;
  background-color: ${({ colorButton }) =>
    colorButton === 'affirmative'
      ? defaultStyle.colors.GREEN_AFIRMATIVE
      : defaultStyle.colors.RED_NEGATIVE};
  justify-content: center;
  align-items: center;
  border-radius: 12px;
`;
