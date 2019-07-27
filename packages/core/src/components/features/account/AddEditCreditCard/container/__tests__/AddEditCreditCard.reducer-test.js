import { fromJS } from 'immutable';
import AddEditCreditCardReducer from '../AddEditCreditCard.reducer';
import { addCreditCardSuccess, addCreditCardError } from '../AddEditCreditCard.actions';

describe('AddEditCreditCardReducer reducer', () => {
  it('should return  default state', () => {
    expect(AddEditCreditCardReducer(undefined, {})).toBeNull();
  });
  it('should handle failure addCreditCardError', () => {
    const initialState = null;
    expect(
      AddEditCreditCardReducer(
        initialState,
        addCreditCardError({
          error: 'test error',
        })
      )
    ).toEqual(
      fromJS({
        error: 'test error',
      })
    );
  });

  it('should handle success addCreditCardSuccess', () => {
    const initialState = null;
    expect(
      AddEditCreditCardReducer(
        initialState,
        addCreditCardSuccess({
          creditCardId: '12345',
        })
      )
    ).toEqual(
      fromJS({
        creditCardId: '12345',
      })
    );
  });
});
