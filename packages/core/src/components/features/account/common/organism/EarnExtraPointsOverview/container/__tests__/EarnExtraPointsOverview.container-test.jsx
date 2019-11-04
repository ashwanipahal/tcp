import React from 'react';
import { shallow } from 'enzyme';
import {
  EarnExtraPointsOverviewContainer,
  mapStateToProps,
} from '../EarnExtraPointsOverview.container';
import EarnExtraPointsOverview from '../../views/EarnExtraPointsOverview.view';
import EarnExtraPointsOverviewSkelton from '../../skelton/EarnExtraPointsOverviewSkelton.view';

describe('EarnExtraPointsOverview container', () => {
  it('should render EarnExtraPointsOverview', () => {
    const props = {
      labels: {},
    };
    const component = shallow(<EarnExtraPointsOverviewContainer {...props} />);
    expect(component.is(EarnExtraPointsOverview)).toBeTruthy();
  });

  it('mapStateToProps should return label props', () => {
    const stateProps = mapStateToProps({
      Labels: {
        account: {
          common: {
            lbl_common_earnExtraPoints: 'earnExtraPoints',
          },
        },
      },
    });
    expect(stateProps.labels).toBeDefined();
  });
  it('should render EarnExtraPointsOverview component', () => {
    const waysToEarn = [];
    const labels = {};
    const component = shallow(
      <EarnExtraPointsOverviewContainer
        waysToEarn={waysToEarn}
        labels={labels}
        isAccountOverview
        isFetching={false}
        getEarnExtraPointsListAction={() => {}}
      />
    );
    expect(component.is(EarnExtraPointsOverview)).toBeTruthy();
    expect(component.is(EarnExtraPointsOverviewSkelton)).not.toBeTruthy();
  });
  it('should render EarnExtraPointsOverviewSkelton component', () => {
    const waysToEarn = [];
    const labels = {};
    const component = shallow(
      <EarnExtraPointsOverviewContainer
        waysToEarn={waysToEarn}
        labels={labels}
        isAccountOverview
        isFetching
        getEarnExtraPointsListAction={() => {}}
      />
    );
    expect(component.is(EarnExtraPointsOverview)).not.toBeTruthy();
    expect(component.is(EarnExtraPointsOverviewSkelton)).toBeTruthy();
  });
});
