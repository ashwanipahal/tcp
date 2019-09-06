import { fromJS } from 'immutable';
import UserReducer from '../User.reducer';
import { DEFAULT_REDUCER_KEY } from '../../../../../../utils/cache.util';
import { setUserInfo, setUserPersonalData } from '../User.actions';

describe('User reducer', () => {
  const initialState = fromJS({
    [DEFAULT_REDUCER_KEY]: null,
    personalData: null,
    airmiles: null,
    rewards: null,
    survey: null,
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

    it('should handle SET_USER_PERSONAL_DATA correctly', () => {
      const updatedState = UserReducer(
        initialState,
        setUserPersonalData({
          children: [{ childId: '12345' }],
        })
      );
      expect(updatedState.getIn(['personalData', 'children', '0', 'childId'])).toEqual('12345');
    });

    it('should handle SET_USER_PERSONAL_DATA correctly if personalData is already present', () => {
      const currentState = fromJS({
        [DEFAULT_REDUCER_KEY]: null,
        personalData: {},
        airmiles: null,
        rewards: null,
        survey: null,
      });
      const updatedState = UserReducer(
        currentState,
        setUserPersonalData({
          children: [{ childId: '12345' }],
        })
      );
      expect(updatedState.getIn(['personalData', 'children', '0', 'childId'])).toEqual('12345');
    });
  });
});
