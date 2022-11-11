import styled from 'styled-components/native';
import { defaultStyle } from '../../styles/themes/defaultStyle';
import responsive from '../../styles/themes/responsive';

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

export const Content = styled.View`
  flex: 1;
  width: 100%;
`;

export const SubContainer = styled.View`
  width: 80%;
  flex-direction: row;
  align-items: center;
  margin-top: ${responsive.big};
  margin-left: ${responsive.big};
`;

export const SquareMarker = styled.TouchableOpacity`
  height: 30px;
  width: 30px;
  border: 1px solid #000;
  margin: ${responsive.extraSmall};
  justify-content: center;
  align-items: center;
`;

export const Marker = styled.View`
  width: 70%;
  height: 70%;
  background-color: ${({ theme }) => theme.colors.Text};
`;

export const TextRegular = styled.Text`
  color: ${({ theme }) => theme.colors.Text};
  font-family: ${defaultStyle.fontFamily.interSemiBold};
  font-size: ${defaultStyle.fontSize.small};
  text-align: center;
  line-height: ${defaultStyle.lineHeight.big};
  margin-left: ${responsive.medium};
`;
