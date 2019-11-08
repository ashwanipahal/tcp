import React from 'react';
import { shallow } from 'enzyme';
import { PlaceRewardsContainerVanilla, mapStateToProps } from '../PlaceRewards.container.native';

describe('PlaceRewardsContainer', () => {
  it('should render correctly', () => {
    const labels = {
      common: {},
      myPlaceRewards: {},
    };

    const commonLabels = {
      common: {},
      myPlaceRewards: {},
    };

    const tree = shallow(
      <PlaceRewardsContainerVanilla labels={labels} commonLabels={commonLabels} />
    );
    expect(tree).toMatchSnapshot();
  });
  it('mapStateToProps should return label props', () => {
    const stateProps = mapStateToProps({
      Labels: {
        global: {
          myPlaceRewards: {},
        },
      },
    });
    expect(stateProps.labels).toBeDefined();
  });
  it('mapStateToProps should return commonlabel props', () => {
    const stateProps = mapStateToProps({
      Labels: {
        account: {
          common: {
            lbl_common_point_balance: '12',
          },
        },
      },
    });
    expect(stateProps.commonLabels).toBeDefined();
  });
});
