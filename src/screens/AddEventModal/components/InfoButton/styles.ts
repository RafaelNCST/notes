import styled from 'styled-components/native';
import responsive from '../../../../styles/themes/responsive';
import { RFPercentage } from 'react-native-responsive-fontsize';
import { defaultStyle } from '../../../../styles/themes/defaultStyle';

export const Container = styled.TouchableOpacity`
  height: 30px;
  width: 30px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  background-color: ${defaultStyle.colors.BLUE_DARK};
  position: absolute;
  right: 20px;
  bottom: 20px;
`;

export const ContentInfoStyled = styled.View`
  height: ${RFPercentage(45)}px;
  width: 85%;
  border-radius: 12px;
  background-color: white;
  border: 1px solid #000;
`;

export const TopContent = styled.View`
  height: 15%;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  padding-left: ${responsive.extraMedium};
  padding-right: ${responsive.extraMedium};
`;

export const ContentWords = styled.View`
  padding-left: ${responsive.small};
  padding-right: ${responsive.small};
  justify-content: space-evenly;
  flex: 1;
`;

export const TextModalTitle = styled.Text`
  color: ${defaultStyle.colors.RED_NEGATIVE};
  font-family: ${defaultStyle.fontFamily.interBold};
  font-size: ${defaultStyle.fontSize.medium};
  text-align: center;
  line-height: ${defaultStyle.lineHeight.big};
`;

export const CloseButton = styled.TouchableOpacity``;
