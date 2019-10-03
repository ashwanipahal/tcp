import { fromJS } from 'immutable';
// eslint-disable-next-line import/no-unresolved
import utils, { isOrderHasShipping } from '../utils/utils';

jest.mock('next/router', () => ({ push: jest.fn() }));

describe('isOrderHasPickup', () => {
  it('isOrderHasPickup', () => {
    const cartItems = fromJS({
      miscInfo: {
        store: [{}, {}],
      },
    });
    expect(utils.isOrderHasPickup(cartItems)).toBe(0);
  });

  it('isOrderHasShipping', () => {
    const cartItems = fromJS({
      miscInfo: {
        store: [{}, {}],
      },
    });
    expect(isOrderHasShipping(cartItems)).toBe(1);
  });

  it('getAvailableStages', () => {
    const cartItems = fromJS({});
    expect(utils.getAvailableStages(cartItems)).toStrictEqual(['billing', 'review']);
  });

  it('routeToStage', () => {
    expect(utils.routeToStage('pickup', [], true, 'pickup')).toBe();
  });

  it('routeToStage', () => {
    expect(utils.routeToStage('pickup', undefined, true, 'shipping')).toBe();
  });
});
