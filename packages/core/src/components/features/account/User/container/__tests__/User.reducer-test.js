import { fromJS } from 'immutable';
import UserReducer from '../User.reducer';
import { DEFAULT_REDUCER_KEY } from '../../../../../../utils/cache.util';
import USER_CONSTANTS from '../../User.constants';
import { setUserInfo, setUserChildren } from '../User.actions';

describe('User reducer', () => {
  const initialState = fromJS({
    [DEFAULT_REDUCER_KEY]: null,
    personalData: null,
    airmiles: null,
    rewards: null,
    survey: null,
    children: null,
    favoriteStore: null,
    defaultStore: null,
    isRegisteredUserCallDone: false,
  });

  it('should return default state', () => {
    expect(UserReducer(undefined, {})).toEqual(initialState);
  });

  describe('should handle setUserInfo action correctly', () => {
    let payload;
    let state;
    beforeEach(() => {
      payload = {
        firstName: 'test',
        userProfileState: {
          profileCompletion: 20,
        },
        airmilesAccountNumber: '1111',
        myPlaceNumber: '2222',
        surveyAnswers: [],
        isExpressEligible: true,
      };
      state = UserReducer(initialState, setUserInfo(payload));
    });

    it('setting personalData correctly', () => {
      expect(state.getIn(['personalData', 'contactInfo', 'firstName'])).toEqual(payload.firstName);
    });

    it('setting profileCompletion correctly', () => {
      expect(state.getIn(['personalData', 'profileCompletion'])).toEqual(
        payload.userProfileState.profileCompletion
      );
    });

    it('setting airmiles correctly', () => {
      expect(state.getIn(['airmiles', 'accountNumber'])).toEqual(payload.airmilesAccountNumber);
    });

    it('setting rewards correctly', () => {
      expect(state.getIn(['rewards', 'accountNumber'])).toEqual(payload.myPlaceNumber);
    });

    it('setting survey correctly', () => {
      expect(state.getIn(['survey', 'answers'])).toEqual(fromJS(payload.surveyAnswers));
    });

    it('should handle SET_CHILDREN correctly', () => {
      const updatedState = UserReducer(
        initialState,
        setUserChildren({
          children: [{ childId: '12345' }],
        })
      );
      expect(updatedState.getIn(['children', '0', 'childId'])).toEqual('12345');
    });

    it('setting favorite store correctly', () => {
      expect(state.getIn(['favoriteStore', 'name'])).toEqual(payload.name);
    });

    it('set isExpressEligible correctly', () => {
      const action = {
        type: USER_CONSTANTS.SET_IS_EXPRESS_ELIGIBLE,
        payload: true,
      };
      const originalState = fromJS({});
      const updatedState = UserReducer(originalState, action);
      const returnValue = originalState.setIn(['personalData', 'isExpressEligible'], true);
      expect(updatedState).toStrictEqual(returnValue);
    });

    it('set isRegisteredUserCallDone correctly', () => {
      const action = {
        type: USER_CONSTANTS.SET_IS_REGISTERED_USER_CALL_DONE,
      };
      const originalState = fromJS({});
      const updatedState = UserReducer(originalState, action);
      const returnValue = originalState.set('isRegisteredUserCallDone', true);
      expect(updatedState).toStrictEqual(returnValue);
    });

    it('setting default store correctly', () => {
      const storeData = {
        name: 'new jersey',
      };
      const originalState = fromJS({});
      const action = {
        payload: storeData,
        type: USER_CONSTANTS.SET_DEFAULT_STORE,
      };
      const updatedState = UserReducer(originalState, action);
      const returnValue = originalState.set('defaultStore', storeData);
      expect(updatedState).toStrictEqual(returnValue);
    });
  });
});
