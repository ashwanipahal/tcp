import ApplyCardReducer from '../ApplyCard.reducer';
import constants from '../../RewardsCard.constants';

describe('ApplyCardReducer', () => {
  it('should return the undefined state', () => {
    expect(
      ApplyCardReducer(undefined, {
        type: '',
        payload: 'abc',
      })
    ).not.toBe(null);
  });

  it('should return undefined if no payload provided', () => {
    expect(
      ApplyCardReducer(
        { set: jest.fn(), get: jest.fn() },
        {
          type: constants.SET_MODULEX_CONTENT,
        }
      )
    ).toBe(undefined);
  });

  it('should return the initial state', () => {
    expect(
      ApplyCardReducer(
        { set: jest.fn(), get: jest.fn() },
        {
          type: constants.RESPONSE_SEND_INSTANT_CARD_APPLICATION,
          payload: 'abc',
        }
      )
    ).toBe(undefined);
  });

  it('should return the initial state', () => {
    expect(
      ApplyCardReducer(
        { set: jest.fn(), get: jest.fn() },
        {
          type: '',
          payload: 'abc',
        }
      )
    ).not.toBe(null);
  });
});
