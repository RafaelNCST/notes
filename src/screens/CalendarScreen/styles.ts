import styled from 'styled-components/native';
import { defaultStyle } from '../../styles/themes/defaultStyle';

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

export const Content = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.BackGround};
`;

export const ContainerDetailsDay = styled.View`
  flex: 1;
  width: 100%;
  background-color: pink;
`;

export const BottomInfoEvent = styled.View`
  flex: 1;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.BackGround};
  border-style: solid;
  border-color: ${defaultStyle.colors.BLACK};
  border-top-width: 1px;
`;
