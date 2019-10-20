import React from 'react';
import { shallow } from 'enzyme';
import { LoyaltyFooterSectionVanilla } from '../views/LoyaltyFooterSection';

describe('LoyaltyFooterSection View Component', () => {
  let component;
  const Props = {
    labels: {},
    className: '',
    isProductDetailView: false,
    isGuest: false,
    isPlcc: false,
    isReviewPage: false,
    isConfirmationPage: false,
    isAddedToBagPage: false,
    earnedReward: false,
  };

  it('not isPlcc should render correctly', () => {
    component = shallow(<LoyaltyFooterSectionVanilla {...Props} />);
    expect(component).toMatchSnapshot();
  });

  const Props2 = {
    labels: {},
    className: '',
    isProductDetailView: true,
    isGuest: false,
    isPlcc: false,
    isReviewPage: false,
    isConfirmationPage: false,
    isAddedToBagPage: false,
    earnedReward: false,
  };

  it('ProductDetailSection true should render correctly', () => {
    component = shallow(<LoyaltyFooterSectionVanilla {...Props2} />);
    expect(component).toMatchSnapshot();
  });

  const Props3 = {
    labels: {},
    className: '',
    isProductDetailView: false,
    isGuest: false,
    isPlcc: false,
    isReviewPage: false,
    isConfirmationPage: false,
    isAddedToBagPage: true,
    earnedReward: false,
  };

  it('isAddedToBagPage true should render correctly', () => {
    component = shallow(<LoyaltyFooterSectionVanilla {...Props3} />);
    expect(component).toMatchSnapshot();
  });

  const Props7 = {
    labels: {},
    className: '',
    isProductDetailView: false,
    isGuest: true,
    isPlcc: false,
    isReviewPage: false,
    isConfirmationPage: false,
    isAddedToBagPage: true,
    earnedReward: false,
  };

  it('isAddedToBagPage & isGuest true should render correctly', () => {
    component = shallow(<LoyaltyFooterSectionVanilla {...Props7} />);
    expect(component).toMatchSnapshot();
  });

  const Props8 = {
    labels: {},
    className: '',
    isProductDetailView: false,
    isGuest: false,
    isPlcc: false,
    isReviewPage: false,
    isConfirmationPage: false,
    isAddedToBagPage: true,
    earnedReward: true,
  };

  it('isAddedToBagPage & earnedReward true should render correctly', () => {
    component = shallow(<LoyaltyFooterSectionVanilla {...Props8} />);
    expect(component).toMatchSnapshot();
  });

  const Props9 = {
    labels: {},
    className: '',
    isProductDetailView: false,
    isGuest: false,
    isPlcc: true,
    isReviewPage: false,
    isConfirmationPage: false,
    isAddedToBagPage: true,
    earnedReward: false,
  };

  it('isAddedToBagPage & isPlcc true should render correctly', () => {
    component = shallow(<LoyaltyFooterSectionVanilla {...Props9} />);
    expect(component).toMatchSnapshot();
  });

  const Props4 = {
    labels: {},
    className: '',
    isProductDetailView: false,
    isGuest: false,
    isPlcc: true,
    isReviewPage: true,
    isConfirmationPage: false,
    isAddedToBagPage: false,
    earnedReward: false,
  };

  it('isPlcc & isReviewPage true should render correctly', () => {
    component = shallow(<LoyaltyFooterSectionVanilla {...Props4} />);
    expect(component).toMatchSnapshot();
  });

  const Props5 = {
    labels: {},
    className: '',
    isProductDetailView: false,
    isGuest: false,
    isPlcc: true,
    isReviewPage: false,
    isConfirmationPage: false,
    isAddedToBagPage: false,
    earnedReward: false,
  };

  it('isPlcc true should render correctly', () => {
    component = shallow(<LoyaltyFooterSectionVanilla {...Props5} />);
    expect(component).toMatchSnapshot();
  });

  const Props6 = {
    labels: {},
    className: '',
    isProductDetailView: false,
    isGuest: true,
    isPlcc: false,
    isReviewPage: false,
    isConfirmationPage: true,
    isAddedToBagPage: false,
    earnedReward: true,
  };

  it('isConfirmationPage true should render correctly', () => {
    component = shallow(<LoyaltyFooterSectionVanilla {...Props6} />);
    expect(component).toMatchSnapshot();
  });
});
