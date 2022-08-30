import { shallow } from 'enzyme';
import React from 'react';
import { PointsHistoryContainer, mapDispatchToProps } from '../PointsHistory.container';

describe('PointsHistoryContainer View', () => {
  it('should render PointsHistoryContainer Correctly', () => {
    const tree = shallow(<PointsHistoryContainer getPointsHistoryAction={() => {}} />);
    expect(tree).toMatchSnapshot();
  });

  it('should render PointsHistory container Correctly', () => {
    const tree = shallow(<PointsHistoryContainer getPointsHistoryAction={() => {}} />);
    tree.setProps({ router: { query: { id: 'addressBook' } } });
    expect(tree).toMatchSnapshot();
  });

  it('should return an action getPointsHistoryAction which will call dispatch function on execution', () => {
    const dispatch = jest.fn();
    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.getPointsHistoryAction();
    expect(dispatch.mock.calls).toHaveLength(1);
  });
});
