import React from 'react';
import { shallow } from 'enzyme';
import CheckoutProgressUtils from '../utils/utils';
import utils from '../../../../../../../core/src/utils';
import {
  CheckoutProgressIndicator,
  mapDispatchToProps,
} from '../container/CheckoutProgressIndicator.container';

const { getAvailableStages } = CheckoutProgressUtils;
const { getObjectValue, getIconPath } = utils;

jest.mock('../utils/utils', () => ({
  getAvailableStages: jest.fn(),
  moveToStage: jest.fn(),
}));
jest.mock('../../../../../../../core/src/utils', () => ({
  getObjectValue: jest.fn(),
  getIconPath: jest.fn(),
}));

describe('CheckoutProgressIndicatorContainer', () => {
  it('should render correctly', () => {
    getObjectValue.mockImplementation(() => 'shipping');
    getIconPath.mockImplementation(() => '');
    const props = {
      initialActions: jest.fn(),

      availableStages: getAvailableStages.mockImplementation(() => ['pickup', 'shipping']),
    };
    const tree = shallow(<CheckoutProgressIndicator {...props} />);
    expect(tree).toMatchSnapshot();
  });
  describe('#mapDispatchToProps', () => {
    it('should return an action initialActions which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.initialActions();
      expect(dispatch.mock.calls).toHaveLength(2);
    });
    it('should return an action moveToCheckoutStage which will call dispatch function on execution', () => {
      const dispatch = jest.fn();
      const dispatchProps = mapDispatchToProps(dispatch);
      dispatchProps.moveToCheckoutStage();
      expect(dispatch.mock.calls).toHaveLength(1);
    });
  });
});
