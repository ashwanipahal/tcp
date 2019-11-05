import React from 'react';
import { shallow } from 'enzyme';
import MyPlaceRewardsCreditCardTile from '../MyPlaceRewardsCreditCardTile.view.native';

describe('MyPlaceRewardsCreditCardTile component', () => {
  const labels = {
    lbl_overview_manageYourCard: 'MANAGE YOUR CARD',
    lbl_overview_25Off: '25% OFF',
    lbl_overview_yourKidsBirthdays: ' your kids’ birthdays!',
    lbl_overview_earnDoublePoints: 'EARN DOUBLE POINTS',
    lbl_overview_whenYouCheckout: ' when you check out using your card',
    lbl_overview_exclusiveBonusEvents: 'EXCLUSIVE BONUS EVENTS',
    lbl_overview_tripePointsDoubleRewards: 'Tripe points, double rewards & more!',
    lbl_overview_addYourCardTo: 'Add your card to:',
    lbl_overview_addYourCardToPoint1: 'Earn 2 pints for every $1 spent',
    lbl_overview_addYourCardToPoint2: 'Get 25% off birthday savings',
    lbl_overview_addYourCardToPoint3: 'Check out even faster',
    lbl_overview_addYourCard: 'ADD YOUR CARD',
    lbl_overview_dontHaveMyPlaceCard: 'Don’t have a My Place Rewards Credit Card?',
  };

  const myPlaceRewardCard = {
    accountNo: '************1111',
    billingAddressId: 2390774,
    ccBrand: 'Visa',
    ccType: 'COMPASSVISA',
    creditCardId: 979037,
    defaultInd: false,
    expMonth: '3 ',
    expYear: '2028',
    nameOnAccount: '.',
    properties: null,
  };

  it('should render empty state correctly', () => {
    const component = shallow(<MyPlaceRewardsCreditCardTile labels={labels} />);
    expect(component).toMatchSnapshot();
  });

  it('should render Card tile correctly', () => {
    const component = shallow(
      <MyPlaceRewardsCreditCardTile labels={labels} myPlaceRewardCard={myPlaceRewardCard} />
    );
    expect(component).toMatchSnapshot();
  });
});
