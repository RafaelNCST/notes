import React, { useState } from 'react';
import { LayoutAnimation } from 'react-native';
import { toggleAnimation } from './animations/toggleAnimation';
import {
  DropDownContainer,
  DropDownSubContainer,
  Selected,
  Option,
  TextSelected,
  TextDropDown,
} from './styles';

interface Props {
  Data: Array<string>;
  zIndex?: number;
}

export const DropDown: React.FC<Props> = ({ Data, zIndex }) => {
  const placeholder: string = 'Selecione algo ai poh pra começar';

  const [firstRun, setFirstRun] = useState<boolean>(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const handleDropDrown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setOpen(prev => !prev);
  };

  const handleSelectedOption = (item: string) => {
    setSelected(item);
    setFirstRun(false);
    setOpen(false);
  };

  return (
    <DropDownContainer zIndex={zIndex}>
      <Selected
        onPress={handleDropDrown}
        activeOpacity={0.8}
        underlayColor="#cac8c8">
        <TextSelected color={firstRun ? '#9e9d9d' : '#363636'}>
          {firstRun ? placeholder : selected}
        </TextSelected>
      </Selected>
      {open && (
        <DropDownSubContainer>
          {Data.map((item, index) => {
            if (item === selected) {
              return null;
            }

            return (
              <Option
                activeOpacity={0.8}
                underlayColor="#cac8c8"
                sizeBorderRadius={index === Data.length - 1 ? '12px' : '0px'}
                key={String(index)}
                onPress={() => handleSelectedOption(item)}>
                <TextDropDown>{item}</TextDropDown>
              </Option>
            );
          })}
        </DropDownSubContainer>
      )}
    </DropDownContainer>
  );
};
