import React from 'react';
import { shallow } from 'enzyme';
import BackToView from '../views/BackToView';

describe('BackToView component', () => {
  it('BackToView component renders correctly without props', () => {
    const component = shallow(<BackToView />);
    expect(component).toMatchSnapshot();
  });

  it('BrandLogo component renders correctly with props', () => {
    const props = {
      className: 'test-class',
    };
    const component = shallow(<BackToView {...props} />);
    expect(component.find('.test-class')).toHaveLength(1);
  });
});
