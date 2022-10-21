import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.BackGround};
  border-top-width: 1px;
  border-color: #000;
  border-style: solid;
  align-items: center;
  justify-content: center;
`;

export const ContainerButton = styled.TouchableHighlight`
  width: 50px;
  height: 50px;
  border-radius: 30px;
  background-color: ${({ theme }) => theme.colors.BackGround};
  align-items: center;
  justify-content: center;
  margin-top: -45px;
  border: 1px solid #000;
`;
