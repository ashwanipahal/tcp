import React from 'react';
import { shallow } from 'enzyme';
import { BonusPointsAvailabilityVanilla } from '../views/BonusPointsAvailability.view';

describe('BonusPointsAvailabilityVanilla', () => {
  it('should render correctly', () => {
    const bonusPoints = [
      {
        buttonText: 'Available For Future Use',
        disabled: false,
      },
      {
        buttonText: 'Applied to Order',
        disabled: true,
      },
    ];
    const tree = shallow(<BonusPointsAvailabilityVanilla bonusPoints={bonusPoints} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with 1 bonus point', () => {
    const bonusPoints = [
      {
        buttonText: 'Available For Future Use',
        disabled: false,
      },
    ];
    const tree = shallow(<BonusPointsAvailabilityVanilla bonusPoints={bonusPoints} />);
    expect(tree).toMatchSnapshot();
  });
});
