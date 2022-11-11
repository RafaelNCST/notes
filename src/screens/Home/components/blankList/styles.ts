import styled from 'styled-components/native';
import { defaultStyle } from '../../../../styles/themes/defaultStyle';

export const Container = styled.View`
  width: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const TextSubTitle = styled.Text`
  color: ${({ theme }) => theme.colors.Text};
  font-family: ${defaultStyle.fontFamily.interBold};
  font-size: ${defaultStyle.fontSize.medium};
  text-align: center;
  line-height: ${defaultStyle.lineHeight.big};
`;
