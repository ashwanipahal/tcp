import { fromJS } from 'immutable';
import AddEditCreditCardReducer from '../AddEditCreditCard.reducer';
import { addCreditCardSuccess, addCreditCardError } from '../AddEditCreditCard.actions';

describe('AddEditCreditCardReducer reducer', () => {
  it('should return  default state', () => {
    const initialState = fromJS({
      showNotification: false,
      error: null,
    });
    expect(AddEditCreditCardReducer(initialState, {}));
  });
  it('should handle failure addCreditCardError', () => {
    const initialState = fromJS({
      showNotification: true,
    });
    expect(
      AddEditCreditCardReducer(
        initialState,
        addCreditCardError({
          userId: '12345',
        })
      )
    ).toEqual(
      fromJS({
        showNotification: true,
        error: fromJS({ userId: '12345' }),
        success: null,
      })
    );
  });

  it('should handle success addCreditCardSuccess', () => {
    const initialState = fromJS({});
    expect(
      AddEditCreditCardReducer(
        initialState,
        addCreditCardSuccess({
          creditCardId: '12345',
        })
      )
    ).toEqual(
      fromJS({
        success: fromJS({ creditCardId: '12345' }),
        error: null,
      })
    );
  });
});
