import styled from 'styled-components/native';
import { defaultStyle } from '../../../../styles/themes/defaultStyle';
import responsive from '../../../../styles/themes/responsive';

interface styledProps {
  outMonth: number[];
  position: number;
}

export const CalendarContainer = styled.View`
  width: 100%;
`;

export const CalendarShortNameDaysContainer = styled.View`
  height: 25px;
  width: 100%;
  flex-direction: row;
`;

export const ContainerNameDay = styled.View`
  flex: 1;
  padding-left: ${responsive.small};
  padding-right: ${responsive.small};
  align-items: center;
  justify-content: center;
`;

export const TextRegular = styled.Text<styledProps>`
  color: ${({ theme, outMonth }) =>
    outMonth ? defaultStyle.colors.GRAY_OSLO : theme.colors.Text};
  font-family: ${defaultStyle.fontFamily.interRegular};
  font-size: ${defaultStyle.fontSize.small};
  text-align: justify;
  line-height: ${defaultStyle.lineHeight.big};
`;
