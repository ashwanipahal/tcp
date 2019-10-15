import {
  getLabelValue,
  formatDate,
  isValidDate,
  childOptionsMap,
  formatPhoneNumber,
  getAddressFromPlace,
  extractFloat,
  getStoreHours,
  parseUTCDate,
} from '../utils';
import storesMock from '../../components/common/molecules/StoreAddressTile/__mocks__/store.mock';

const formattedDate = '01/01/1970';
const formattedPhoneNumber = '(718) 243-1150';

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

  it('should return labelkey if incorrect params type are passed', () => {
    const label = getLabelValue('', 'common.account.lbl_last_name');
    expect(label).toBe('common.account.lbl_last_name');
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

describe('formatPhoneNumner', () => {
  it('should format the phone number correctly with area code in brackets', () => {
    const phone = formatPhoneNumber('7182431150');
    expect(phone).toBe(formattedPhoneNumber);
  });
});

describe('extractFloat', () => {
  it('should extract the floated for single decimal number', () => {
    const phone = extractFloat('$234.0');
    expect(phone).toBe(234);
  });
  it('should extract the floated for double decimal number', () => {
    const phone = extractFloat('$20.23');
    expect(phone).toBe(20.23);
  });
});

describe('getAddressFromPlace', () => {
  it('should return the initial address if address_components is undefined', () => {
    const address = getAddressFromPlace({}, '');
    expect(address.streetNumber).toBe('');
  });

  it('should return streetNumber correctly', () => {
    const address = getAddressFromPlace(
      {
        address_components: [
          {
            types: ['street_number'],
            short_name: '1000',
          },
          {
            types: ['route'],
            long_name: 'test',
          },
        ],
      },
      ''
    );
    expect(address.street).toBe('1000 test');
  });
});

describe('getStoreHours', () => {
  const { hours } = storesMock;
  const labels = {
    lbl_storelanding_opensAt: 'opens at',
    lbl_storelanding_openInterval: 'open until',
  };
  it('should return opens until toTime', () => {
    const storeTime = getStoreHours(hours, labels, new Date('2019-09-17 19:59:00'));
    expect(storeTime).toContain('open until 8 pm');
  });
  it('should return opens at fromTime', () => {
    const storeTime = getStoreHours(hours, labels, new Date('2019-09-17 21:00:00'));
    expect(storeTime).toContain('opens at 10 am');
  });
});

describe('parseUTCDate', () => {
  it('default', () => {
    const returnDateValue = parseUTCDate('2019-10-15 20:00:00');
    expect(returnDateValue).toStrictEqual(new Date('2019-10-15T20:00:00.000Z'));
  });
});
