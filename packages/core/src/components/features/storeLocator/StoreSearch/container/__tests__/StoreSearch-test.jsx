import React from 'react';
import { shallow } from 'enzyme';
import StoreSearch from '../views/StoreSearch';

describe('StoreSearch component', () => {
  it('StoreSearch component renders correctly without props', () => {
    const component = shallow(<StoreSearch />);
    expect(component).toMatchSnapshot();
  });

  it('BrandLogo component renders correctly with props', () => {
    const props = {
      className: 'test-class',
    };
    const component = shallow(<StoreSearch {...props} />);
    expect(component.find('.test-class')).toHaveLength(1);
  });
});
