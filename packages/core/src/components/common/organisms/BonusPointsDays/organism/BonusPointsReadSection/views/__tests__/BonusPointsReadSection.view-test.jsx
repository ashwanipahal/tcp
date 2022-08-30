import React from 'react';
import { shallow } from 'enzyme';
import { BonusPointsReadSection } from '../BonusPointsReadSection.view';

describe('BonusPointsReadSection', () => {
  const props = {
    availableBonusPointDays: 1,
    usedBonusPointDays: 1,
    toggleBonusPointsModal: () => {},
    labels: {
      lbl_bonus_points_daysLeft: 'You have {0} days left',
      lbl_bonus_points_bonusPointsDay: 'BONUS POINTS DAY',
      lbl_bonus_points_detailLink: 'details',
    },
  };

  it('should render correctly', () => {
    const tree = shallow(<BonusPointsReadSection {...props} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render filled dots according to the usedBonusPointsDay passed', () => {
    const tree = shallow(<BonusPointsReadSection {...props} />);
    expect(tree.find('.filled').length).toBe(props.usedBonusPointDays);
  });

  it('should render available dots according to the availableBonusPointDays passed', () => {
    const tree = shallow(<BonusPointsReadSection {...props} />);
    expect(tree.find('.dot').length).toBe(props.availableBonusPointDays + props.usedBonusPointDays);
  });

  it('should render nothing if availableBonusPointDays is null', () => {
    const updatedProps = { ...props, ...{ availableBonusPointDays: null } };
    const tree = shallow(<BonusPointsReadSection {...updatedProps} />);
    expect(tree.isEmptyRender()).toBeTruthy();
  });
});
