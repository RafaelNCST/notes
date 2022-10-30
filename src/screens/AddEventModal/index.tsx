import React, { useState } from 'react';
import { BodyScreen, TextRegular } from '../../styles/globalStyles';
import { ScrollView } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { Modal } from 'react-native';
import { BottomMenu } from '../../components/BottomMenu';
import { HeaderMenu } from '../../components/HeaderMenu';
import { MaskInput } from './components/MaskInput';
import { DropDown } from '../../components/DropDown';
import { DropDownCircle } from './components/DropDownCircle';
import { InfoButton } from './components/InfoButton';
import { ContentInfo } from './components/InfoButton';
import {
  Container,
  Content,
  TopContainer,
  ContainerTitle,
  BottomContainer,
  ContainerTexts,
  DropDownCircleContainer,
  InputTitle,
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
  const [focusTitle, setFocusTitle] = useState(false);
  const [focusDescription, setFocusDescription] = useState(false);
  const [showModalInfo, setShowModalInfo] = useState(false);

  const theme = useTheme();

  return (
    <Modal visible={modalState} animationType="slide">
      <BodyScreen>
        <Modal visible={showModalInfo} transparent animationType="fade">
          <ContentInfo setOpen={setShowModalInfo} />
        </Modal>

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
                  <DropDownCircle Data={DATACIRCLE} zIndex={4} />
                </DropDownCircleContainer>
                <InputTitle
                  heightStyled="40px"
                  widthStyled="75%"
                  placeholder="Um título para se lembrar!"
                  placeholderTextColor={
                    focusTitle ? '#777676' : theme.colors.Text
                  }
                  onFocus={() => setFocusTitle(true)}
                  onBlur={() => setFocusTitle(false)}
                  border={true}
                  maxLength={35}
                />
              </ContainerTitle>
              <ContainerTexts>
                <TextRegular>Categoria: </TextRegular>
                <DropDown Data={DATA} zIndex={5} />
              </ContainerTexts>
              <ContainerTexts>
                <TextRegular>Horário:</TextRegular>
                <MaskInput separator=":" linesNumber={2} type="time" />
              </ContainerTexts>
              <ContainerTexts>
                <TextRegular>Data:</TextRegular>
                <MaskInput separator="/" linesNumber={3} type="date" />
              </ContainerTexts>

              <InfoButton setOpen={setShowModalInfo} />
            </TopContainer>
            <BottomContainer>
              <ScrollView showsVerticalScrollIndicator={false}>
                <InputTitle
                  placeholder="Descreve seu compromisso ai cara!"
                  placeholderTextColor={
                    focusDescription ? '#777676' : theme.colors.Text
                  }
                  onFocus={() => setFocusDescription(true)}
                  onBlur={() => setFocusDescription(false)}
                  multiline={true}
                  border={false}
                />
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
