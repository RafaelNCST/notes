interface MODAL_MESSAGES_TYPES {
  ERROR: {
    TYPE: 'error';
    ICON: 'close';
    BLANK: 'Os campos a seguir estão vazios:';
  };
  SUCESS: {
    TYPE: 'sucess';
    ICON: 'done';
    ADD_SUCESS: 'Você adicionou um evento com sucesso! Deseja voltar ao menu principal ou continuar a adicionar?';
    EDIT_SUCESS: 'TUDO FEITO';
  };
  WARNING: {
    TYPE: 'warning';
    ICON: 'warning';
    DUPLICATED: 'Ei, psiu, só um aviso, mas você tem um evento com título semelhante ao que você colocou (❁´◡`❁)';
    CONFIRM_DELETED: 'Você deseja mesmo excluir esse evento?';
    CONFIRM_CHANGES: 'Você tem modificações não salvas, o que deseja fazer?';
  };
}

interface MODAL_TEXT_BUTTONS_TYPES {
  OK: 'OK';
  CONTINUAR: 'CONTINUAR';
  VOLTAR: 'VOLTAR';
  ENTENDI: 'ENTENDI';
  SALVAR: 'SALVAR';
  DESCARTAR: 'DESCARTAR';
  SIM: 'SIM';
  NAO: 'NÃO';
}

export const MODAL_MESSAGES: MODAL_MESSAGES_TYPES = {
  ERROR: {
    TYPE: 'error',
    ICON: 'close',
    BLANK: 'Os campos a seguir estão vazios:',
  },
  SUCESS: {
    TYPE: 'sucess',
    ICON: 'done',
    ADD_SUCESS:
      'Você adicionou um evento com sucesso! Deseja voltar ao menu principal ou continuar a adicionar?',
    EDIT_SUCESS: 'TUDO FEITO',
  },
  WARNING: {
    TYPE: 'warning',
    ICON: 'warning',
    DUPLICATED:
      'Ei, psiu, só um aviso, mas você tem um evento com título semelhante ao que você colocou (❁´◡`❁)',
    CONFIRM_DELETED: 'Você deseja mesmo excluir esse evento?',
    CONFIRM_CHANGES: 'Você tem modificações não salvas, o que deseja fazer?',
  },
};

export const MODAL_TEXT_BUTTONS: MODAL_TEXT_BUTTONS_TYPES = {
  OK: 'OK',
  CONTINUAR: 'CONTINUAR',
  VOLTAR: 'VOLTAR',
  ENTENDI: 'ENTENDI',
  SALVAR: 'SALVAR',
  DESCARTAR: 'DESCARTAR',
  SIM: 'SIM',
  NAO: 'NÃO',
};
