import React from 'react';
import { shallow } from 'enzyme';
import StoreDetail from '../views/StoreDetail';

describe('StoreDetail component', () => {
  it('StoreDetail component renders correctly without props', () => {
    const component = shallow(<StoreDetail />);
    expect(component).toMatchSnapshot();
  });

  it('BrandLogo component renders correctly with props', () => {
    const props = {
      className: 'test-class',
    };
    const component = shallow(<StoreDetail {...props} />);
    expect(component.find('.test-class')).toHaveLength(1);
  });
});
