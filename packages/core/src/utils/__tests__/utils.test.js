import { getLabelValue, formatDate, isValidDate, childOptionsMap } from '../utils';

const formattedDate = '01/01/1970';

describe('getLabelValue', () => {
  const labelState = {
    account: {
      payment: {
        lbl_name: 'test',
      },
    },
  };

  it('should return correct label value if category and subCategory both are passed', () => {
    const label = getLabelValue(labelState, 'lbl_name', 'payment', 'account');
    expect(label).toBe(labelState.account.payment.lbl_name);
  });

  it('should return labelKey if any of the category and subCategory is missing', () => {
    const label = getLabelValue(labelState, 'lbl_name');
    expect(label).toBe('lbl_name');
  });

  it('should return correct label value if labelState is category and subCategory is passed', () => {
    const label = getLabelValue(labelState.account, 'lbl_name', 'payment');
    expect(label).toBe(labelState.account.payment.lbl_name);
  });

  it('should return empty string if incorrect params type are passed', () => {
    const label = getLabelValue('', 'common.account.lbl_last_name');
    expect(label).toBe('');
  });

  it('should return label key if category is passed but not present in label state', () => {
    const label = getLabelValue(labelState, 'lbl_last_name', 'test', 'test');
    expect(label).toBe('lbl_last_name');
  });

  it('should return label key if category & subcategory is passed but subcategory is not present in label state', () => {
    const label = getLabelValue(labelState, 'lbl_last_name', 'test', 'account');
    expect(label).toBe('lbl_last_name');
  });

  it('should return label key if subcategory is passed but subcategory is not present in label state', () => {
    const label = getLabelValue(labelState.account, 'lbl_last_name', 'test');
    expect(label).toBe('lbl_last_name');
  });

  it('should return label key if subcategory is incorrectly passed', () => {
    const label = getLabelValue(labelState.account, 'lbl_last_name', 'lbl_last_name');
    expect(label).toBe('lbl_last_name');
  });
});

describe('formatDate', () => {
  it('should format the date correctly in mm/dd/yy', () => {
    const date = new Date(formattedDate);
    expect(formatDate(date)).toEqual(formattedDate);
  });
});

describe('isvalidDate', () => {
  it('should return true for valid date', () => {
    const date = new Date(formattedDate);
    expect(isValidDate(date)).toBeTruthy();
  });

  it('should return false for invalid date', () => {
    const date = new Date('');
    expect(isValidDate(date)).toBeFalsy();
  });
});

describe('childOptionsMap', () => {
  it('should return childOptionsMap mapping', () => {
    const childOptions = childOptionsMap();
    expect(childOptions).toEqual({
      genderMap: [{ displayName: 'Boy', id: '01' }, { displayName: 'Girl', id: '0' }],
      yearsMap: [
        { displayName: '2019', id: '2019' },
        { displayName: '2018', id: '2018' },
        { displayName: '2017', id: '2017' },
        { displayName: '2016', id: '2016' },
        { displayName: '2015', id: '2015' },
        { displayName: '2014', id: '2014' },
        { displayName: '2013', id: '2013' },
        { displayName: '2012', id: '2012' },
        { displayName: '2011', id: '2011' },
        { displayName: '2010', id: '2010' },
        { displayName: '2009', id: '2009' },
        { displayName: '2008', id: '2008' },
        { displayName: '2007', id: '2007' },
        { displayName: '2006', id: '2006' },
        { displayName: '2005', id: '2005' },
        { displayName: '2004', id: '2004' },
        { displayName: '2003', id: '2003' },
      ],
    });
  });
});
