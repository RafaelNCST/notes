import React from 'react';
import { DropDownModalProps } from './types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  BodyScreenModalDropDown,
  ContentModalDropDown,
  ButtonOptions,
  TextRegular,
  ContainerOutItens,
} from './styles';
import { useTranslation } from 'react-i18next';
import { DATA } from './data';
import { defaultStyle } from '../../../../styles/themes/defaultStyle';

export const DropDownModal: React.FC<DropDownModalProps> = ({
  open,
  setOpen,
  actionEditOption,
  actionDeleteOption,
}) => {
  const { t } = useTranslation();

  if (!open) {
    return null;
  }

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
              <TextRegular>{t(item.Name)}</TextRegular>
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
