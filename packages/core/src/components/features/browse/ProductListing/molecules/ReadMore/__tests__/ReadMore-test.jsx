import React from 'react';
import { shallow } from 'enzyme';
import { ReadMoreVanilla } from '../views/ReadMore.view';

describe('ReadMore component', () => {
  it('renders correctly without props', () => {
    const component = shallow(<ReadMoreVanilla>Read More</ReadMoreVanilla>);
    expect(component).toMatchSnapshot();
  });

  it('Read More component renders correctly with props', () => {
    const props = {
      className: 'read-more-text',
      description: 'Check out all of our girls school dresses, jumpers and more:',
    };
    const component = shallow(<ReadMoreVanilla {...props}>Read More with props</ReadMoreVanilla>);
    expect(component).toMatchSnapshot();
    expect(component.find('.read-more-text')).toHaveLength(1);
  });
});
