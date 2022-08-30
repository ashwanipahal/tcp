import { fromJS } from 'immutable';
import AccountHeader from '../AccountHeader.reducer';
import constants from '../../AccountHeader.constants';

describe('AccountHeader Reducer', () => {
  it('should return banner rich text', () => {
    const initialState = fromJS({});
    const updatedState = initialState.set('rewardsPointsBannerContent', '<div></div>');
    expect(
      AccountHeader(initialState, {
        type: constants.SET_MODULEX_CONTENT,
        payload: {
          richText: '<div></div>',
        },
      })
    ).toEqual(updatedState);
  });
});
