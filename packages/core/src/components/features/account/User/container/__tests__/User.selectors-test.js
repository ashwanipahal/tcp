import { fromJS } from 'immutable';
import {
  getUserLoggedInState,
  isPlccUser,
  getUserName,
  getUserFullName,
  getUserEmail,
  getUserPhoneNumber,
  getPointsToNextRewardState,
  getCurrentPointsState,
  getTotalRewardsState,
} from '../User.selectors';
import { USER_REDUCER_KEY } from '../../../../../../constants/reducer.constants';

describe('#User selector', () => {
  const stateObject = {
    personalData: {
      contactInfo: {
        firstName: 'first',
        lastName: 'last',
        emailAddress: 'first@abc.com',
        phoneNumber: '1111111111',
      },
      isGuest: false,
      isPlcc: 'false',
    },
    rewards: {
      rewardPoints: '20',
      rewardDollars: '$20',
      rewardPointsToNextReward: '80',
    },
  };
  const state = {
    [USER_REDUCER_KEY]: fromJS(stateObject),
  };

  it('#getUserLoggedInState should return true if user is not guest', () => {
    expect(getUserLoggedInState(state)).toBeTruthy();
  });

  it('#getUserLoggedInState should return false if isGuest is true', () => {
    const updatedStateObject = {
      ...stateObject,
      ...{
        personalData: {
          isGuest: true,
        },
      },
    };
    const updatedState = {
      [USER_REDUCER_KEY]: fromJS(updatedStateObject),
    };
    expect(getUserLoggedInState(updatedState)).toBeFalsy();
  });

  it('#isPlccUser should return false if isPlcc is false', () => {
    expect(isPlccUser(state)).toBeFalsy();
  });

  it('#isPlccUser should return true if isPlcc is true', () => {
    const updatedStateObject = {
      ...stateObject,
      ...{
        personalData: {
          isPlcc: 'true',
        },
      },
    };
    const updatedState = {
      [USER_REDUCER_KEY]: fromJS(updatedStateObject),
    };
    expect(isPlccUser(updatedState)).toBeTruthy();
  });

  it('#getUserName should return firstName', () => {
    expect(getUserName(state)).toBe(stateObject.personalData.contactInfo.firstName);
  });

  it('#getUserFullName should return firstName and lastName', () => {
    expect(getUserFullName(state)).toBe(
      `${stateObject.personalData.contactInfo.firstName} ${
        stateObject.personalData.contactInfo.lastName
      }`
    );
  });

  it('#getUserEmail should return user email', () => {
    expect(getUserEmail(state)).toBe(stateObject.personalData.contactInfo.emailAddress);
  });

  it('#getUserPhoneNumber should return user phone', () => {
    expect(getUserPhoneNumber(state)).toBe(stateObject.personalData.contactInfo.phoneNumber);
  });

  it('#getPointsToNextRewardState should return rewardPointsToNextReward', () => {
    expect(getPointsToNextRewardState(state)).toBe(stateObject.rewards.rewardPointsToNextReward);
  });

  it('#getCurrentPointsState should return rewardPoints', () => {
    expect(getCurrentPointsState(state)).toBe(stateObject.rewards.rewardPoints);
  });

  it('#getTotalRewardsState should return rewardDollars', () => {
    expect(getTotalRewardsState(state)).toBe(stateObject.rewards.rewardDollars);
  });
});
