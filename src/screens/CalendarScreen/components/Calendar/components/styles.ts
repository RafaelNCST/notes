import styled from 'styled-components/native';
import { defaultStyle } from '../../../../../styles/themes/defaultStyle';
import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('screen');

interface styledPropsBorder {
  backGroundToday: boolean;
  clickedDay: number;
}

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
