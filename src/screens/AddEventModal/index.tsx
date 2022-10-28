import React from 'react';
import { BodyScreen, TextRegular, TextTitle } from '../../styles/globalStyles';
import { ScrollView } from 'react-native-gesture-handler';
import { Modal } from 'react-native';
import { BottomMenu } from '../../components/BottomMenu';
import { HeaderMenu } from '../../components/HeaderMenu';
import { MaskInput } from '../../components/MaskInput';
import { DropDown } from '../../components/DropDown';
import { DropDownCircle } from '../../components/DropDownCircle';
import {
  Container,
  Content,
  TopContainer,
  ContainerTitle,
  BottomContainer,
  ContainerTexts,
  DropDownCircleContainer,
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

const DATACIRCLE = ['gray', 'green', 'yellow', 'red', 'black'];

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
                <DropDownCircleContainer>
                  <DropDownCircle Data={DATACIRCLE} zIndex={5} />
                </DropDownCircleContainer>
                <TextTitle>Um titulo para se lembrar</TextTitle>
              </ContainerTitle>
              <ContainerTexts>
                <TextRegular>Categoria: </TextRegular>
                <DropDown Data={DATA} zIndex={3} />
              </ContainerTexts>
              <ContainerTexts>
                <TextRegular>Horário:</TextRegular>
                <MaskInput separator=":" linesNumber={2} type="time" />
              </ContainerTexts>
              <ContainerTexts>
                <TextRegular>Data:</TextRegular>
                <MaskInput separator="/" linesNumber={3} type="date" />
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
