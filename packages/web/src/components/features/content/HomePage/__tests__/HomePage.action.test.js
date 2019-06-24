import HOMEPAGE_CONSTANTS from '../HomePage.constants';

import { getHeaderlinks, setHeaderlinks, getEspots } from '../container/HomePage.actions';

describe('Header Page Actions', () => {
  test('should fetch Header Links action', () => {
    const { type } = getHeaderlinks();
    expect(type).toEqual(HOMEPAGE_CONSTANTS.FETCH_HEADER_LINKS);
  });
  test('should set Header Links action', () => {
    const { type } = setHeaderlinks();
    expect(type).toEqual(HOMEPAGE_CONSTANTS.SET_HEADER_LINKS);
  });
  test('should fetch Espots action', () => {
    const { type } = getEspots();
    expect(type).toEqual(HOMEPAGE_CONSTANTS.FETCH_ESPOT);
  });
  test('call initActions action', () => {
    const { type } = getHeaderlinks();
    expect(type).toEqual(HOMEPAGE_CONSTANTS.FETCH_HEADER_LINKS);
  });
});
