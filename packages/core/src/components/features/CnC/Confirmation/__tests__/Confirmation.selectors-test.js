import { fromJS } from 'immutable';
import ConfirmationSelectors from '../container/Confirmation.selectors';

describe('Confirmation Selectors', () => {
  it('#getOrderConfirmation', () => {
    const Confirmation = fromJS({
      orderConfirmation: {},
    });
    const State = { Confirmation };
    expect(ConfirmationSelectors.getOrderConfirmation(State)).toEqual(fromJS({}));
  });
});
