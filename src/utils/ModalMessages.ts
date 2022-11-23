interface MODAL_MESSAGES_TYPES {
  ERROR: {
    TYPE: 'error';
    ICON: 'close';
    BLANK: 'Os campos a seguir estão vazios:';
    DUPLICATED_ID: 'Você possuí título, horário e data do eventos repetidos com algum evento, e isso não é legal. O The Notes usa os três para identificar melhor seus eventos, então pedimos que você os mude!';
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
    DUPLICATED_TITLE: 'Ei, psiu, só um aviso, mas você tem um evento com título semelhante ao que você colocou (❁´◡`❁)';
    DUPLICATED_TIME_AND_DATE: 'Ei, psiu, só um aviso, mas você tem um evento com data e horários semelhantes ao que você colocou (❁´◡`❁)';
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
    DUPLICATED_ID:
      'Você possuí título, horário e data do eventos repetidos com algum evento, e isso não é legal. O The Notes usa os três para identificar melhor seus eventos, então pedimos que você os mude!',
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
    DUPLICATED_TITLE:
      'Ei, psiu, só um aviso, mas você tem um evento com título semelhante ao que você colocou (❁´◡`❁)',
    DUPLICATED_TIME_AND_DATE:
      'Ei, psiu, só um aviso, mas você tem um evento com data e horários semelhantes ao que você colocou (❁´◡`❁)',
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
