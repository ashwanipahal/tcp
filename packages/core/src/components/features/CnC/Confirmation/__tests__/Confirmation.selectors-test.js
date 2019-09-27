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
  it('#getConfirmationSummary', () => {
    const Confirmation = fromJS({
      orderConfirmation: {
        summary: {},
      },
    });
    const State = { Confirmation };
    expect(ConfirmationSelectors.getConfirmationSummary(State)).toEqual(fromJS({}));
  });
});
