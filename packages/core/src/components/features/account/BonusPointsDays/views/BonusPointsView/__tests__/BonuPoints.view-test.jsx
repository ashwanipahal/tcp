import React from 'react';
import { shallow } from 'enzyme';
import { BonusPointsViewVanilla } from '../views/BonusPoints.view';

describe('BonusPointsViewVanilla', () => {
  it('should render correctly', () => {
    const labels = {
      myPlaceRewards: {
        lbl_place_rewards_bonus: 'bonus',
        lbl_place_rewards_points: 'points',
      },
    };
    const bonusData = {};
    const bonusDetailsData = 'hello';
    const e = { preventDefault: jest.fn() };
    const tree = shallow(
      <BonusPointsViewVanilla
        labels={labels}
        bonusData={bonusData}
        bonusDetailsData={bonusDetailsData}
      />
    );
    tree.setState({ openModalState: true });
    expect(tree).toMatchSnapshot();
    tree.instance().toggleBonusPointsModal(e);
    expect(tree.state('openModalState')).toBe(false);
  });
});
