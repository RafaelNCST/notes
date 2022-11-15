import React from 'react';
import { DropDownModalProps } from '../types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  BodyScreenModalDropDown,
  ContentModalDropDown,
  ButtonOptions,
  TextRegular,
  ContainerOutItens,
} from './styles';
import { defaultStyle } from '../../../../styles/themes/defaultStyle';

const DATA = [
  { Name: 'Editar', Icon: 'edit' },
  { Name: 'Excluir', Icon: 'delete' },
];

export const DropDownModal: React.FC<DropDownModalProps> = ({
  open,
  setOpen,
  actionEditOption,
  actionDeleteOption,
}) => {
  if (!open) return null;

  return (
    <BodyScreenModalDropDown onPress={() => setOpen(false)}>
      <ContentModalDropDown>
        {DATA.map((item, index) => (
          <ButtonOptions
            key={index}
            onPress={
              item.Name === 'Editar' ? actionEditOption : actionDeleteOption
            }>
            <ContainerOutItens>
              <TextRegular>{item.Name}</TextRegular>
              <Icon
                name={item.Icon}
                size={25}
                color={
                  item.Icon === 'delete'
                    ? defaultStyle.colors.RED_NEGATIVE
                    : defaultStyle.colors.BLUE_MARINE
                }
              />
            </ContainerOutItens>
          </ButtonOptions>
        ))}
      </ContentModalDropDown>
    </BodyScreenModalDropDown>
  );
};
