import styled from 'styled-components/native';
import responsive from '../../../../styles/themes/responsive';

export const Container = styled.TouchableOpacity`
  height: 30px;
  width: 30px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.Primary};
  position: absolute;
  right: 20px;
  bottom: 20px;
`;

export const ContentInfoStyled = styled.View`
  height: 350px;
  width: 80%;
  border-radius: 12px;
  background-color: white;
  border: 1px solid #000;
`;

export const TopContent = styled.View`
  height: 15%;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  padding-left: ${responsive.PM};
  padding-right: ${responsive.PM};
`;

export const ContentWords = styled.View`
  padding-left: ${responsive.P};
  padding-right: ${responsive.P};
  justify-content: space-evenly;
  flex: 1;
`;

export const CloseButton = styled.TouchableOpacity``;
