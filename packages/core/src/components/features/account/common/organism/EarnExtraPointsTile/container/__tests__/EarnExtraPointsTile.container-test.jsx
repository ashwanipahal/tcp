import { shallow } from 'enzyme';
import React from 'react';
import EarnExtraPointsTile from '../../views/EarnExtraPointsTile.view';
import EarnExtraPointsTileSkelton from '../../skelton/EarnExtraPointsTileSkelton.view';
import { EarnExtraPointsTileContainer, mapDispatchToProps } from '../EarnExtraPointsTile.container';

describe('EarnExtraPointsTileContainer View', () => {
  it('should render EarnExtraPointsTileContainer Correctly', () => {
    const tree = shallow(<EarnExtraPointsTileContainer getEarnExtraPointsListAction={() => {}} />);
    expect(tree).toMatchSnapshot();
  });

  it('should return an action getEarnExtraPointsListAction which will call dispatch function on execution', () => {
    const dispatch = jest.fn();
    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.getEarnExtraPointsListAction();
    expect(dispatch.mock.calls).toHaveLength(1);
  });

  it('should render EarnExtraPointsTile component', () => {
    const waysToEarn = [];
    const labels = {};
    const component = shallow(
      <EarnExtraPointsTileContainer
        waysToEarn={waysToEarn}
        labels={labels}
        isAccountOverview
        isFetching={false}
        getEarnExtraPointsListAction={() => {}}
      />
    );
    expect(component.is(EarnExtraPointsTile)).toBeTruthy();
    expect(component.is(EarnExtraPointsTileSkelton)).not.toBeTruthy();
  });
  it('should render EarnExtraPointsTileSkelton component', () => {
    const waysToEarn = [];
    const labels = {};
    const component = shallow(
      <EarnExtraPointsTileContainer
        waysToEarn={waysToEarn}
        labels={labels}
        isAccountOverview
        isFetching
        getEarnExtraPointsListAction={() => {}}
      />
    );
    expect(component.is(EarnExtraPointsTile)).not.toBeTruthy();
    expect(component.is(EarnExtraPointsTileSkelton)).toBeTruthy();
  });
});
