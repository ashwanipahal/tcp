import React from 'react';
import { shallow } from 'enzyme';
import { GuestMprPlccSectionVanilla } from '../views/GuestMprPlccSection';

describe('GuestMprPlccSection View Component', () => {
  let component;
  let props;
  beforeEach(() => {
    props = {
      className: '',
      labels: {},
      estimatedRewardsVal: 20,
      currentSubtotal: 21,
      estimatedSubtotal: 33,
      thresholdValue: 16.66,
      finalPointsLabelStr: '',
      showSubtotal: true,
      fsPoints: '',
      isPlcc: true,
      pointsDescription: '',
      earnedReward: null,
      remainingPlcc: 12,
      headingLabel: 'headingLabel',
      subHeadingLabel: 'subHeadingLabel',
      descriptionLabel: 'descriptionLabel',
    };
  });

  it('GuestMprPlccSection should render correctly', () => {
    component = shallow(<GuestMprPlccSectionVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
