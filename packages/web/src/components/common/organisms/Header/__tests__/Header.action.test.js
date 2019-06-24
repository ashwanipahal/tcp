import HEADER_CONSTANTS from '../Header.constants';

import { loadHeaderData } from '../container/Header.actions';

describe('Header Actions', () => {
  test('should load Header data action', () => {
    const { type } = loadHeaderData();
    expect(type).toEqual(HEADER_CONSTANTS.LOAD_HEADER_DATA);
  });
});
