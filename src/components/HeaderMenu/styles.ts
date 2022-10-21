import styled from 'styled-components/native';

export const Container = styled.View`
  height: 50px;
  width: 100%;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-color: black;
  border-style: solid;
  padding: 10px;
`;

export const ContainerButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;
