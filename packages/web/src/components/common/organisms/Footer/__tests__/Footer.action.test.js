import FOOTER_CONSTANTS from '../Footer.constants';

import { loadFooterData } from '../container/Footer.actions';

describe('Footer Actions', () => {
  test('should load Footer data action', () => {
    const { type } = loadFooterData();
    expect(type).toEqual(FOOTER_CONSTANTS.LOAD_FOOTER_DATA);
  });
});
