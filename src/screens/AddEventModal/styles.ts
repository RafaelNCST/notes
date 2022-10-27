import styled from 'styled-components/native';
import responsive from '../../styles/themes/responsive';

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
`;

export const Content = styled.View`
  flex: 1;
  width: 100%;
`;

export const TopContainer = styled.View`
  width: 100%;
  align-items: flex-start;
  border-bottom-width: 1px;
  border-color: #000;
  border-style: solid;
  padding: ${responsive.P};
  justify-content: center;
`;

export const ContainerTitle = styled.View`
  width: 100%;
  flex-direction: row;
  margin-bottom: ${responsive.P};
`;

export const BottomContainer = styled.View`
  flex: 1;
  width: 100%;
  padding: ${responsive.P};
`;

export const ContainerTexts = styled.View`
  margin-bottom: ${responsive.EP};
  flex-direction: row;
  padding: 0px;
  height: 20px;
`;
