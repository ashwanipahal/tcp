import { fromJS } from 'immutable';
import constants from '../AccountHeader.constants';

const initialState = fromJS({
  rewardsPointsBannerContent: '',
});

const AccountHeaderReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_MODULEX_CONTENT:
      return state.set('rewardsPointsBannerContent', fromJS(action.payload.richText));
    default:
      // TODO: currently when initial state is hydrated on browser, List is getting converted to an JS Array
      if (state instanceof Object) {
        return fromJS(state);
      }
      return state;
  }
};

export default AccountHeaderReducer;
