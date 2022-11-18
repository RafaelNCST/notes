import styled from 'styled-components/native';
import responsive from '../../../../styles/themes/responsive';
import { defaultStyle } from '../../../../styles/themes/defaultStyle';

interface styledProps {
  marginLeft?: boolean;
}

export const TextTitle = styled.Text<styledProps>`
  color: ${({ theme }) => theme.colors.Text};
  font-family: ${defaultStyle.fontFamily.interBold};
  font-size: ${defaultStyle.fontSize.small};
  text-align: center;
  line-height: ${defaultStyle.lineHeight.big};
  margin-left: ${({ marginLeft }) => (marginLeft ? responsive.extraSmall : 0)};
`;
