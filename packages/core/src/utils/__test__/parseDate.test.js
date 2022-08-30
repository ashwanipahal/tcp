import { parseDate, compareDate } from '../parseDate';

describe('parse date test', () => {
  it('should return date object', () => {
    expect(
      parseDate('2017-03-16')
        .getFullYear()
        .toString()
    ).toEqual('2017');
  });

  it('should return true', () => {
    expect(compareDate(new Date('12/12/2019'), new Date('12/12/2019'))).toEqual(true);
  });
});
