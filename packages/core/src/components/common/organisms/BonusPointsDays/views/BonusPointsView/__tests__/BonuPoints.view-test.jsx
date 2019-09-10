import React from 'react';
import { shallow } from 'enzyme';
import { BonusPointsViewVanilla } from '../views/BonusPoints.view';
import BonusPointsReadSection from '../../../organism/BonusPointsReadSection';
import constants from '../../../BonusPointsDays.constants';

describe('BonusPointsViewVanilla', () => {
  it('should render correctly', () => {
    const labels = {
      myPlaceRewards: {
        lbl_bonusPoints_placeRewardsBonus: 'bonus',
        lbl_bonusPoints_placeRewardsPoints: 'points',
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

  it('should render BonusPointsReadSection if view is read', () => {
    const labels = {
      myPlaceRewards: {
        lbl_place_rewards_bonus: 'bonus',
        lbl_bonusPoints_placeRewardsPoints: 'points',
      },
    };
    const bonusData = {};
    const bonusDetailsData = 'hello';
    const wrapper = shallow(
      <BonusPointsViewVanilla
        labels={labels}
        bonusData={bonusData}
        bonusDetailsData={bonusDetailsData}
        view={constants.VIEWS.READ}
      />
    );

    expect(wrapper.find(BonusPointsReadSection)).toHaveLength(1);
  });
});
