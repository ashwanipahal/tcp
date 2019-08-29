import React from 'react';
import { shallow } from 'enzyme';
import { CheckoutProgressIndicatorVanilla } from '../CheckoutProgressIndicator.view';

describe('CheckoutHeaderVanilla', () => {
  const props = {
    labels: {},
    className: 'test',
    availableStages: ['pickup', 'shipping', 'billing'],
  };

  it('should render CheckoutProgressIndicatorVanilla section', () => {
    const component = shallow(<CheckoutProgressIndicatorVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('should render CheckoutProgressIndicatorVanilla section with active stage ', () => {
    const component = shallow(<CheckoutProgressIndicatorVanilla activeStage="pickup" {...props} />);
    expect(component).toMatchSnapshot();
  });
});
