import React from 'react';
import { shallow } from 'enzyme';
import { CheckoutProgressIndicator } from '../views/CheckoutProgressIndicator.view.native';
import Anchor from '../../../../../../common/atoms/Anchor';

describe('CheckoutProgressIndicator component', () => {
  it('should renders correctly props not present', () => {
    const props = {
      activeStage: '',
      navigation: {
        navigate: jest.fn(),
      },
    };
    const component = shallow(<CheckoutProgressIndicator {...props} />);
    expect(component.find(Anchor)).not.toHaveLength(5);
    expect(component).toMatchSnapshot();
  });
});
