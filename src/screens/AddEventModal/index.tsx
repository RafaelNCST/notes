import React from 'react';
import { BodyScreen, TextRegular, TextTitle } from '../../styles/globalStyles';
import { CircleEvent } from '../../components/CircleEvent';
import { ScrollView } from 'react-native-gesture-handler';
import { Modal } from 'react-native';
import { BottomMenu } from '../../components/BottomMenu';
import { HeaderMenu } from '../../components/HeaderMenu';
import { MaskInput } from '../../components/MaskInput';
import { DropDown } from '../../components/DropDown';
import {
  Container,
  Content,
  TopContainer,
  ContainerTitle,
  BottomContainer,
  ContainerTexts,
} from './styles';

interface Props {
  closeModal: () => void;
  modalState: boolean;
}

const DATA = [
  'Sem importância',
  'Indiferente',
  'Importante',
  'Extremamente importante',
  'Vida ou morte',
];

export const AddEventModal: React.FC<Props> = ({ closeModal, modalState }) => {
  return (
    <Modal visible={modalState} animationType="slide">
      <BodyScreen>
        <Container>
          <HeaderMenu
            textDate="Adicionar Evento"
            iconRight="close"
            actionRightButton={closeModal}
          />
          <Content>
            <TopContainer>
              <ContainerTitle>
                <CircleEvent colorEvent="white" />
                <TextTitle>Um titulo para se lembrar</TextTitle>
              </ContainerTitle>
              <ContainerTexts>
                <TextRegular>Categoria: </TextRegular>
                <DropDown Data={DATA} zIndex={3} />
              </ContainerTexts>
              <ContainerTexts>
                <TextRegular>Horário:</TextRegular>
                <MaskInput separator=":" linesNumber={2} />
              </ContainerTexts>
              <ContainerTexts>
                <TextRegular>Data:</TextRegular>
                <MaskInput separator="/" linesNumber={3} />
              </ContainerTexts>
            </TopContainer>
            <BottomContainer>
              <ScrollView showsVerticalScrollIndicator={false}>
                <TextRegular>Descreva seu Compromisso Cara!</TextRegular>
              </ScrollView>
            </BottomContainer>
          </Content>
          <BottomMenu
            buttonExists={true}
            buttonAction={() => console.log('pressou')}
            iconButton="check"
          />
        </Container>
      </BodyScreen>
    </Modal>
  );
};
