import ADDRESS_BOOK_CONSTANTS from '../../AddressList.constants';
import { getAddressList, setAddressList } from '../AddressList.actions';

describe('Address List actions', () => {
  it('getAddressList should return action type as GET_ADDRESS_LIST', () => {
    expect(getAddressList().type).toBe(ADDRESS_BOOK_CONSTANTS.GET_ADDRESS_LIST);
  });

  it('setAddressList should return action type as SET_ADDRESS_LIST', () => {
    expect(setAddressList().type).toBe(ADDRESS_BOOK_CONSTANTS.SET_ADDRESS_LIST);
  });
});
