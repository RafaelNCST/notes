import React from 'react';
import { BodyScreen, TextRegular, TextTitle } from '../../styles/globalStyles';
import {
  Container,
  Content,
  TopContainer,
  ContainerTitle,
  BottomContainer,
} from './styles';
import { HeaderMenu } from '../../components/HeaderMenu';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../routes/types';
import { useRoute } from '@react-navigation/native';
import { BottomMenu } from '../../components/BottomMenu';
import { CircleEvent } from '../../components/CircleEvent';
import { ScrollView } from 'react-native-gesture-handler';

export const DetailsEvent = () => {
  const { goBack } = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { time, message, colorEvent } =
    useRoute<RouteProp<RootStackParamList>>()?.params || {};

  return (
    <BodyScreen>
      <Container>
        <HeaderMenu
          textDate="22 de julho de 2022"
          iconLeft="arrow-back-ios"
          actionLeftButton={goBack}
        />
        <Content>
          <TopContainer>
            <ContainerTitle>
              <CircleEvent colorEvent={colorEvent} />
              <TextTitle>{message}</TextTitle>
            </ContainerTitle>
            <TextRegular>Categoria: Extramamente importante</TextRegular>
            <TextRegular>Horário: {time}</TextRegular>
          </TopContainer>
          <BottomContainer>
            <ScrollView showsVerticalScrollIndicator={false}>
              <TextRegular>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using 'Content
                here, content here', making it look like readable English. It is
                a long established fact that a reader will be distracted by the
                readable content of a page when looking at its layout. The point
                of using Lorem Ipsum is that it has a more-or-less normal
                distribution of letters, as opposed to using 'Content here,
                content here', making it look like readable English. It is a
              </TextRegular>
            </ScrollView>
          </BottomContainer>
        </Content>
        <BottomMenu buttonExists={false} />
      </Container>
    </BodyScreen>
  );
};
