import { defaultStyle } from '../styles/themes/defaultStyle';

interface COLOR_MODAL_ICON_TYPES {
  [unitg: string]: string;
}

export const COLOR_MODAL_ICON: COLOR_MODAL_ICON_TYPES = {
  done: defaultStyle.colors.GREEN_AFIRMATIVE,
  close: defaultStyle.colors.RED_NEGATIVE,
  warning: defaultStyle.colors.YELLOW_WARNING,
};
