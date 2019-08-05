import { parseDate, compareDate } from '../parseDate';

describe('parse date test', () => {
  it('should return date object', () => {
    expect(parseDate('2017-03-16 11:21:49.994').toString()).toEqual(
      'Thu Mar 16 2017 11:21:49 GMT+0530 (India Standard Time)'
    );
  });

  it('should return true', () => {
    expect(compareDate(new Date('12/12/2019'), new Date('12/12/2019'))).toEqual(true);
  });
});
