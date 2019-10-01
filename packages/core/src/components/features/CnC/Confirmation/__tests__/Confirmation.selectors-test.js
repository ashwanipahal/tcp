import { fromJS } from 'immutable';
import { getOrderConfirmation } from '../container/Confirmation.selectors';

describe('Confirmation Selectors', () => {
  it('#getOrderConfirmation', () => {
    const Confirmation = fromJS({
      orderConfirmation: {
        createAccountSuccess: false,
      },
    });
    const State = { Confirmation };
    const orderConfirmation = getOrderConfirmation(State);
    expect(orderConfirmation.get('createAccountSuccess')).toEqual(false);
  });
});
