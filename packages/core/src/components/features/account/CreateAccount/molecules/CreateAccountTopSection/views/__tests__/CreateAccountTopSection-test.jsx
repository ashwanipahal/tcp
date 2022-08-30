import React from 'react';
import { shallow } from 'enzyme';
import { CreateAccountTopSectionVanilla } from '../CreateAccountTopSection';

describe('Create Account component', () => {
  const props = {
    labels: {
      registration: {
        lbl_createAccount_createA: 'Create a',
        lbl_createAccount_myPlaceRewards: 'My Place Rewards',
        lbl_createAccount_earnPoints: 'account to earn',
        lbl_createAccount_spendPoint: 'points on every purchase',
        lbl_createAccount_pointReward: '$1 Spent = 1 POINT',
        lbl_createAccount_signedUp: 'Signed up in Store?',
        lbl_createAccount_onlineAccCreated: 'An online account has been created',
      },
      heading: 'Welcome Back',
      subHeading: 'Log in to earn points for MY PLACE REWARDS ',
      description: `Signed up in store?\nAn online account has been created with your email! Click here to reset your password.`,
    },
    showForgotPasswordFormFn: jest.fn(),
    showForgotPasswordForm: jest.fn(),
  };

  it('should renders correctly', () => {
    const component = shallow(<CreateAccountTopSectionVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
