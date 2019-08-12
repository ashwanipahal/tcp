import React from 'react';
import { shallow } from 'enzyme';
import EmptyMiniBag from '../views/EmptyMiniBag';

describe('Empty Mini Bag Component', () => {
  it('should render correctly', () => {
    const labels = {
      yourShoppingBag: 'YOUR SHOPPING BAG IS EMPTY',
      continueShopping: 'continue Shopping',
      logIn: 'log In',
      dontHaveAccount: 'Dont have an account',
      createOne: 'Create one now to start earning points!',
      createAccount: 'create Account',
    };
    const userName = 'User';
    const tree = shallow(
      <EmptyMiniBag labels={labels} userName={userName} className="cclassName" />
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with labels name', () => {
    const labels = {
      yourShoppingBag: 'YOUR SHOPPING BAG IS EMPTY',
      continueShopping: 'continue Shopping',
      logIn: 'logged In',
      dontHaveAccount: 'Dont have an account',
      createOne: 'Create one now to start earning points!',
      createAccount: 'create Account',
    };
    const userName = 'User';
    const tree = shallow(
      <EmptyMiniBag labels={labels} userName={userName} className="className2" />
    );
    expect(tree).toMatchSnapshot();
  });
});
