import { getLabelValue, formatDate, isValidDate, formatPhoneNumber } from '../utils';

const formattedDate = '01/01/1970';
const formattedPhoneNumber = '(718)-243-1150';

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

describe('formatPhoneNumner', () => {
  it('should format the phone number correctly with area code in brackets', () => {
    const phone = formatPhoneNumber('7182431150');
    expect(phone).toBe(formattedPhoneNumber);
  });
});
