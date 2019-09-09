import React from 'react';
import { shallow } from 'enzyme';
import { BonusPointsSectionVanilla } from '../views/BonusPoints.section';

describe('BonusPointsAvailabilityVanilla', () => {
  const labels = {
    common: { lbl_common_details: '' },
    myPlaceRewards: {
      lbl_bonus_points_msg: '',
      lbl_bonus_points_apply_any_day: '',
      lbl_place_rewards_bonus: '',
      lbl_place_rewards_points: '',
      lbl_place_rewards_day: '',
    },
  };
  const mockedToggleBonusPointsModal = jest.fn();
  const showAccordian = true;
  it('should render correctly available_today', () => {
    const bonusData = {
      totalBonusPointDays: 1,
      availableBonusPointDays: 1,
      usedBonusPointDays: 0,
      appliedToBagBonusPointDays: 0,
      usedBonusPointDates: [],
    };
    const tree = shallow(
      <BonusPointsSectionVanilla
        labels={labels}
        bonusData={bonusData}
        toggleBonusPointsModal={mockedToggleBonusPointsModal}
        showAccordian={showAccordian}
      />
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with isUsed', () => {
    const bonusData = {
      totalBonusPointDays: 1,
      availableBonusPointDays: 0,
      usedBonusPointDays: 1,
      appliedToBagBonusPointDays: 0,
      usedBonusPointDates: [],
    };
    const tree = shallow(
      <BonusPointsSectionVanilla
        labels={labels}
        bonusData={bonusData}
        toggleBonusPointsModal={mockedToggleBonusPointsModal}
        showAccordian={showAccordian}
      />
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with futureDisabled', () => {
    const bonusData = {
      totalBonusPointDays: 3,
      availableBonusPointDays: 0,
      usedBonusPointDays: 1,
      appliedToBagBonusPointDays: 0,
      usedBonusPointDates: ['15/7'],
    };
    const tree = shallow(
      <BonusPointsSectionVanilla
        labels={labels}
        bonusData={bonusData}
        toggleBonusPointsModal={mockedToggleBonusPointsModal}
        showAccordian={showAccordian}
      />
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with future Use', () => {
    const bonusData = {
      totalBonusPointDays: 3,
      availableBonusPointDays: 3,
      usedBonusPointDays: 1,
      appliedToBagBonusPointDays: 0,
      usedBonusPointDates: [],
    };
    const tree = shallow(
      <BonusPointsSectionVanilla
        labels={labels}
        bonusData={bonusData}
        toggleBonusPointsModal={mockedToggleBonusPointsModal}
        showAccordian={showAccordian}
      />
    );
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly with applied to bag bonus point days', () => {
    const bonusData = {
      totalBonusPointDays: 3,
      availableBonusPointDays: 3,
      usedBonusPointDays: 1,
      appliedToBagBonusPointDays: 1,
      usedBonusPointDates: [],
    };
    const tree = shallow(
      <BonusPointsSectionVanilla
        labels={labels}
        bonusData={bonusData}
        toggleBonusPointsModal={mockedToggleBonusPointsModal}
        showAccordian={showAccordian}
      />
    );
    expect(tree).toMatchSnapshot();
  });
});
