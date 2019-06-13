import React from 'react';
import { shallow } from 'enzyme';
import { SocialMediaLinksVanilla } from '../views';
import mock from './mock';

describe('Legal Links component', () => {
  it('renders correctly', () => {
    const props = {
      className: 'test-socialMediaLinks',
      ...mock,
    };
    const component = shallow(<SocialMediaLinksVanilla {...props} />);
    expect(component).toMatchSnapshot();
    expect(component.find('.test-socialMediaLinks img')).toHaveLength(4);
  });
});
