import { fromJS } from 'immutable';
import MailingAddressReducer from '../MailingAddress.reducer';
import { addMailingAddressSuccess, addMailingAddressFail } from '../MailingAddress.actions';

describe('MailingAddress reducer', () => {
  it('should return  default state', () => {
    expect(MailingAddressReducer(undefined, {})).toBeNull();
  });
  it('should handle failure MailingAddressError', () => {
    const initialState = null;
    expect(
      MailingAddressReducer(
        initialState,
        addMailingAddressFail({
          error: 'test error',
        })
      )
    ).toEqual(
      fromJS({
        error: 'test error',
      })
    );
  });

  it('should handle success MailingAddressSuccess', () => {
    const initialState = null;
    expect(
      MailingAddressReducer(
        initialState,
        addMailingAddressSuccess({
          AdresssId: '12345',
        })
      )
    ).toEqual(
      fromJS({
        AdresssId: '12345',
      })
    );
  });
});
