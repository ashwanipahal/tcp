import React from 'react';
import { shallow } from 'enzyme';
import { GuestMprPlccSectionVanilla } from '../views/GuestMprPlccSection';

describe('GuestMprPlccSection View Component', () => {
  let component;
  const Props = {
    className: '',
    labels: {},
    estimatedRewardsVal: 20,
    currentSubtotal: 21,
    estimatedSubtotal: 33,
    thresholdValue: 16.66,
    finalPointsLabelStr: '',
    showSubtotal: 0,
    fsPoints: '',
    isPlcc: true,
    pointsDescription: '',
    earnedReward: null,
    remainingPlcc: 0,
  };

  it('GuestMprPlccSection should render correctly', () => {
    component = shallow(<GuestMprPlccSectionVanilla {...Props} />);
    expect(component).toMatchSnapshot();
  });

  const Props2 = {
    className: '',
    labels: {},
    estimatedRewardsVal: 20,
    currentSubtotal: 21,
    estimatedSubtotal: 33,
    thresholdValue: 16.66,
    finalPointsLabelStr: '',
    showSubtotal: 1,
    fsPoints: '',
    isPlcc: false,
    pointsDescription: '',
    earnedReward: 0,
    remainingPlcc: 0,
  };

  it('GuestMprPlccSection should render correctly', () => {
    component = shallow(<GuestMprPlccSectionVanilla {...Props2} />);
    expect(component).toMatchSnapshot();
  });
});
