import styled from 'styled-components/native';
import { defaultStyle } from '../../styles/themes/defaultStyle';
import responsive from '../../styles/themes/responsive';

interface styledProps {
  zIndexContainer?: number;
}

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

export const Content = styled.View`
  flex: 1;
  width: 100%;
`;

export const SubContainer = styled.View<styledProps>`
  width: 80%;
  flex-direction: row;
  margin-top: ${responsive.big};
  margin-left: ${responsive.big};
  align-items: center;
  height: 40px;
  z-index: ${({ zIndexContainer }) => zIndexContainer || 0};
`;

export const SquareMarker = styled.TouchableOpacity`
  height: ${responsive.enormous};
  width: ${responsive.enormous};
  border: 1px solid ${({ theme }) => theme.colors.Text};
  margin: ${responsive.extraSmall};
  justify-content: center;
  align-items: center;
`;

export const TextRegular = styled.Text`
  color: ${({ theme }) => theme.colors.Text};
  font-family: ${defaultStyle.fontFamily.interSemiBold};
  font-size: ${defaultStyle.fontSize.small};
  text-align: center;
  line-height: ${defaultStyle.lineHeight.big};
  margin-left: ${responsive.medium};
`;
