import React from 'react';
import { shallow } from 'enzyme';
import StoreAddressTile from '../views/StoreAddressTile';

describe('StoreAddressTile component', () => {
  it('StoreAddressTile component renders correctly without props', () => {
    const component = shallow(<StoreAddressTile />);
    expect(component).toMatchSnapshot();
  });

  it('BrandLogo component renders correctly with props', () => {
    const props = {
      className: 'test-class',
    };
    const component = shallow(<StoreAddressTile {...props} />);
    expect(component.find('.test-class')).toHaveLength(1);
  });
});
