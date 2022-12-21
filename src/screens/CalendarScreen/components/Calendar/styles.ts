import styled from 'styled-components/native';
import { defaultStyle } from '../../../../styles/themes/defaultStyle';
import { Dimensions } from 'react-native';
import responsive from '../../../../styles/themes/responsive';

const { height, width } = Dimensions.get('screen');

interface styledPropsBorder {
  backGroundToday: boolean;
  clickedDay: number;
}

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

export const ContainerBadges = styled.View`
  width: 50%;
  height: 30%;
  position: absolute;
  top: 0;
  right: 3px;
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
`;

export const Badge = styled.View`
  height: 40%;
  width: 25%;
  border-radius: 50px;
  background-color: red;
`;

export const CardDay = styled.TouchableOpacity<styledPropsBorder>`
  width: ${width / 7}px;
  height: ${height / 15}px;
  justify-content: center;
  align-items: center;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.Inverted};
  border-width: ${({ clickedDay }) => (clickedDay ? '1px' : 0)};
  background-color: ${({ backGroundToday }) =>
    backGroundToday ? defaultStyle.colors.BLUE_MARINE : 'transparent'};
`;
