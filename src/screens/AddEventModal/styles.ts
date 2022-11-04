import styled from 'styled-components/native';
import responsive from '../../styles/themes/responsive';

interface styledProps {
  border?: boolean;
  heightStyled?: string;
  widthStyled?: string;
}

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
`;

export const Content = styled.View`
  flex: 1;
  width: 100%;
`;

export const DropDownCircleContainer = styled.View`
  width: 20%;
  height: 40px;
  margin-right: ${responsive.P};
`;

export const InputTexts = styled.TextInput<styledProps>`
  height: ${({ heightStyled }) => heightStyled || '100%'};
  width: ${({ widthStyled }) => widthStyled || '100%'};
  text-align: justify;
  margin-right: ${responsive.P};
  font-family: 'Inter-Bold';
  font-size: ${responsive.P};
  border-width: ${({ border }) => (border ? 1 : 0)}px;
  border-color: #000;
  border-style: solid;
  padding-left: ${responsive.P};
  /* padding-right: ${responsive.P}; */
  color: ${({ theme }) => theme.colors.Text};
  flex-wrap: wrap;
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
  align-items: center;
`;

export const BottomContainer = styled.View`
  flex: 1;
  width: 100%;
  padding: ${responsive.P};
  z-index: -1;
`;

export const ContainerTexts = styled.View`
  margin-bottom: ${responsive.M};
  flex-direction: row;
  padding: 0px;
  height: 20px;
`;
