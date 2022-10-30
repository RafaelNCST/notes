interface Props {
  '01': string;
  '02': (event: string) => string;
  '03': string;
  '04': string;
  '05': string;
  '06': string;
  '07': string;
  '08': string;
  '09': string;
  '10': string;
  '11': string;
  '12': string;
}

export const DATA_MASK_MONTH: Props = {
  '01': '31',
  '02': event => {
    if (parseInt(event, 10) % 400 === 0) {
      return '29';
      // eslint-disable-next-line prettier/prettier
    } else if (
      parseInt(event, 10) % 4 === 0 &&
      parseInt(event, 10) % 100 !== 0
    ) {
      return '29';
    } else {
      return '28';
    }
  },
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
