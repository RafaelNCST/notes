interface DEFAULT_VALUES_TYPES {
  THEME: -2 | 22;
  AUTOMATIC_ERASE_PAST_EVENTS: boolean;
  LANGUAGE: ['Português(BR)', 'pt'] | ['English', 'en'];
  DATE_TYPE_LOCAL:
    | ['Brasil(dia-mês-ano)', 'pt-br']
    | ['EUA(mês-dia-ano)', 'en'];
}

export const DEFAULT_VALUES: DEFAULT_VALUES_TYPES = {
  THEME: -2, // -2 para modo escuro e 22 para modo claro (Relacionado a posição do switch Button)
  AUTOMATIC_ERASE_PAST_EVENTS: false, // false para desligado e true para ligado (Relacionado ao apagamento automático de eventos de dias passados a partir do atual)
  LANGUAGE: ['Português(BR)', 'pt'], // linguagem escolhida
  DATE_TYPE_LOCAL: ['Brasil(dia-mês-ano)', 'pt-br'],
};
