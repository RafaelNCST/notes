import { Dispatch, SetStateAction } from 'react';

export interface DropDownModalProps {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  actionEditOption: () => void;
  actionDeleteOption: () => void;
}
