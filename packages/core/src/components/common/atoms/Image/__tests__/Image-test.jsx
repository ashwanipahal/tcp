import React from 'react';
import { shallow } from 'enzyme';
import { ImageVanilla } from '../views/Image';

describe('Image component', () => {
  it('renders correctly', () => {
    const props = {
      className: 'sample-image',
      src: 'acdde.html',
      alt: 'abcd',
    };
    const component = shallow(<ImageVanilla {...props} />);
    expect(component).toMatchSnapshot();
    expect(component.find('.sample-image')).toHaveLength(1);
  });
});
