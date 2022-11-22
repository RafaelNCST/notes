import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  justify-content: space-between;
  align-items: center;
`;

export const Content = styled.View`
  width: 100%;
  flex: 1;
`;

export const ContentSpinner = styled.View`
  width: 100%;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ListEvents = styled.FlatList.attrs(() => ({
  contentContainerStyle: {
    flex: 1,
  },
}))``;
