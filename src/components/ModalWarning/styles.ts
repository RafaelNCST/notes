import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import { defaultStyle } from '../../styles/themes/defaultStyle';
import responsive from '../../styles/themes/responsive';

interface styledProps {
  colorButton?: 'affirmative' | 'negative';
}

export const Content = styled.View`
  width: 70%;
  height: 300px;
  background-color: #fff;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 12px;
`;

export const ContainerText = styled.View`
  width: 80%;
  align-items: center;
`;

export const ContainerIcon = styled.View`
  border-radius: 30px;
  border-width: 2px;
  border-color: #000;
  border-style: solid;
  justify-content: center;
  align-items: center;
  height: 60px;
  width: 60px;
`;

export const ContainerButton = styled.View`
  width: 100%;
  height: 45px;
  align-items: center;
  flex-direction: row;
  justify-content: space-evenly;
`;

export const SubContainerText = styled.View`
  width: 100%;
  flex-direction: column;
`;

export const TextBlankWarning = styled.Text`
  color: ${defaultStyle.colors.GREEN_AFIRMATIVE};
  font-family: 'Inter-SemiBold';
  font-size: ${responsive.small};
  text-align: center;
  line-height: 18px;
`;

export const TextModalTitle = styled.Text`
  color: ${defaultStyle.colors.RED_NEGATIVE};
  font-family: ${defaultStyle.fontFamily.interBold};
  font-size: ${responsive.medium};
  text-align: center;
  line-height: ${defaultStyle.lineHeight.big};
`;

export const TextModalRegular = styled.Text`
  color: ${defaultStyle.colors.RED_NEGATIVE};
  font-family: ${defaultStyle.fontFamily.interRegular};
  font-size: ${responsive.small};
  text-align: center;
  line-height: ${defaultStyle.lineHeight.big};
`;

export const ButtonOk = styled(TouchableOpacity)<styledProps>`
  width: 40%;
  height: 40px;
  background-color: ${({ colorButton }) =>
    colorButton === 'affirmative'
      ? defaultStyle.colors.GREEN_AFIRMATIVE
      : defaultStyle.colors.RED_NEGATIVE};
  justify-content: center;
  align-items: center;
  border-radius: 12px;
`;
