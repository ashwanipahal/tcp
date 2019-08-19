import React from 'react';
import { shallow } from 'enzyme';
import BonusPointsView from '../views/BonusPoints.view.native';

describe('BonusPointsView', () => {
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
      <BonusPointsView labels={labels} bonusData={bonusData} bonusDetailsData={bonusDetailsData} />
    );
    tree.setState({ openModalState: true });
    expect(tree).toMatchSnapshot();
    tree.instance().toggleBonusPointsModal(e);
    expect(tree.state('openModalState')).toBe(false);
  });
});
