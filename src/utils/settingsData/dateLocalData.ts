type DATA_DATE_LOCAL_TYPES = ['EUA(mês-dia-ano)', 'Brasil(dia-mês-ano)'];

interface LANGUAGE_TYPES {
  [unit: string]: 'pt-br' | 'en';
}

export const DATE_LOCAL_LIST: LANGUAGE_TYPES = {
  'EUA(mês-dia-ano)': 'en',
  'Brasil(dia-mês-ano)': 'pt-br',
};

export const DATA_DATE_LOCAL: DATA_DATE_LOCAL_TYPES = [
  'EUA(mês-dia-ano)',
  'Brasil(dia-mês-ano)',
];
