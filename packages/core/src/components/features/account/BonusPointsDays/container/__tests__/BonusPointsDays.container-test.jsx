import React from 'react';
import { shallow } from 'enzyme';
import { BonusPointsDays, mapDispatchToProps } from '../BonusPointsDays.container';
import { isCanada } from '../../../../../../utils';

jest.mock('../../../../../../utils', () => ({
  isCanada: jest.fn(),
}));

describe('BonusPointsDaysContainer', () => {
  it('should render correctly', () => {
    isCanada.mockImplementation(() => false);
    const tree = shallow(<BonusPointsDays bonusDetailsContentId="123" isBonusPointsEnabled />);
    expect(tree).toMatchSnapshot();
  });
  it('should not render correctly', () => {
    isCanada.mockImplementation(() => true);
    const tree = shallow(<BonusPointsDays bonusDetailsContentId="123" />);
    expect(tree).toMatchSnapshot();
  });
});
describe('#getBonusDaysData', () => {
  it('should return an action getBonusDaysData which will call dispatch function on execution', () => {
    const dispatch = jest.fn();
    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.getBonusDaysData();
    expect(dispatch.mock.calls).toHaveLength(1);
  });
  it('should return an action getBonusPointsDetails which will call dispatch function on execution', () => {
    const dispatch = jest.fn();
    const dispatchProps = mapDispatchToProps(dispatch);
    dispatchProps.getBonusPointsDetails();
    expect(dispatch.mock.calls).toHaveLength(1);
  });
});
