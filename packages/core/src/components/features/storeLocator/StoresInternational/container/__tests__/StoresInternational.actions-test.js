import STORES_INTL_CONSTANTS from '../StoresInternational.constants';
import { getModuleXContent, setModuleXContent } from '../StoresInternational.actions';
// TBD: Update test cases with correct actions
describe('StoresInternational Actions', () => {
  it('test should set correct action type for getModuleXContent', () => {
    expect(getModuleXContent().type).toBe(STORES_INTL_CONSTANTS.STORES_INTERNATIONAL_GET_MODULEX);
  });
  it('test should set correct action type for setModuleXContent', () => {
    expect(setModuleXContent().type).toBe(STORES_INTL_CONSTANTS.STORES_INTERNATIONAL_SET_MODULEX);
  });
});
