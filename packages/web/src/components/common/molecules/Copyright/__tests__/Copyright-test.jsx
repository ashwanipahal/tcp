import React from 'react';
import { shallow } from 'enzyme';
import { CopyrightVanilla } from '../views';
import mock from './mock';

describe('Copyright component', () => {
  it('renders correctly', () => {
    const props = {
      className: 'test-copyright',
    };
    const component = shallow(<CopyrightVanilla {...props}>{mock.text}</CopyrightVanilla>);
    expect(component).toMatchSnapshot();
    expect(component.find('.test-copyright').html()).toContain(mock.text);
  });
});
