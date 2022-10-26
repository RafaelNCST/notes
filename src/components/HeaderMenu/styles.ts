import styled from 'styled-components/native';

export const Container = styled.View`
  height: 50px;
  width: 100%;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  border-bottom-width: 1px;
  border-color: black;
  border-style: solid;
`;

export const ContainerButtonLeft = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 20px;
`;

export const ContainerButtonRight = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  position: absolute;
  right: 20px;
`;
