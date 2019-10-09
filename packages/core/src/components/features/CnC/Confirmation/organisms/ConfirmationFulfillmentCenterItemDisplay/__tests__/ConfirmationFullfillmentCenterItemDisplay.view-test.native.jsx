import React from 'react';
import { shallow } from 'enzyme';

import ConfirmationFulfillmentCenterItemDisplay from '../views/ConfirmationFulfillmentCenterItemDisplay.view.native';

describe('ConfirmationFulfillmentCenterItemDisplay', () => {
  it('should render correctly', () => {
    const props = {
      index: 0,
      center: { isSamePickUpStore: true },
      labels: {},
    };
    const tree = shallow(<ConfirmationFulfillmentCenterItemDisplay {...props} />);
    expect(tree).toMatchSnapshot();
  });
  it('should render correctly when isSamePickUpStore is false', () => {
    const props = {
      index: 0,
      center: { isSamePickUpStore: false },
      labels: {},
    };
    const tree = shallow(<ConfirmationFulfillmentCenterItemDisplay {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
