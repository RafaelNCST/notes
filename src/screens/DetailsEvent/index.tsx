import React, { useState } from 'react';
import { BodyScreen } from '../../styles/globalStyles';
import { Container } from './styles';
import { BottomMenu } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../routes/types';
import { useRoute } from '@react-navigation/native';
import { EditContent, ViewContent } from './RenderContent';
import { HeaderMenu } from '../../components';

export const DetailsEvent = () => {
  const [editMode, setEditMode] = useState<boolean>(false);

  const { goBack } = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { time, message, category, date, circle } =
    useRoute<RouteProp<RootStackParamList>>()?.params || {};

  return (
    <BodyScreen>
      <Container>
        <HeaderMenu
          textDate="22 de julho de 2022"
          iconLeft="arrow-back-ios"
          actionLeftButton={goBack}
        />
        {editMode ? (
          <EditContent
            time={time}
            message={message}
            category={category}
            date={date}
            circle={circle}
          />
        ) : (
          <ViewContent
            time={time}
            message={message}
            category={category}
            date={date}
            circle={circle}
          />
        )}
        <BottomMenu buttonExists={false} />
      </Container>
    </BodyScreen>
  );
};
