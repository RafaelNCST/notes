export interface PropsDate {
  [unit: string]: string;
}

export type FebruaryProps = (event: string) => string;

export const DATA_MASK_MONTH: PropsDate = {
  '01': '31',
  '03': '31',
  '04': '30',
  '05': '31',
  '06': '30',
  '07': '31',
  '08': '30',
  '09': '30',
  '10': '31',
  '11': '30',
  '12': '31',
};

export const February: FebruaryProps = (event: string) => {
  if (parseInt(event, 10) % 400 === 0) {
    return '29';
    // eslint-disable-next-line prettier/prettier
  } else if (parseInt(event, 10) % 4 === 0 && parseInt(event, 10) % 100 !== 0) {
    return '29';
  } else {
    return '28';
  }
};
