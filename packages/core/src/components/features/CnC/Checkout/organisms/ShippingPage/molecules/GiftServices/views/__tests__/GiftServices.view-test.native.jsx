import React from 'react';
import { shallow } from 'enzyme';
import Anchor from '@tcp/core/src/components/common/atoms/Anchor';
import { GiftServicesVanilla } from '../GiftServices.view.native';

describe('GiftServices component', () => {
  it('should renders correctly props not present', () => {
    const props = {
      isGiftServicesChecked: true,
      labels: {},
      dispatch: jest.fn(),
      giftWrapOptions: '{}',
      initialValues: {},
    };
    const component = shallow(<GiftServicesVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('should renders correctly props not present', () => {
    const props = {
      isGiftServicesChecked: false,
      labels: {},
      dispatch: jest.fn(),
      giftWrapOptions: '{}',
      initialValues: {},
    };
    const component = shallow(<GiftServicesVanilla {...props} />);
    component.find(Anchor).simulate('press', { preventDefault: jest.fn() });
    expect(component).toMatchSnapshot();
  });
});
