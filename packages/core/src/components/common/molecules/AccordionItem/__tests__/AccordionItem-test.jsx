import React from 'react';
import { shallow } from 'enzyme';
import { AccordionVanilla } from '../views/AccordionItem';

describe('AccordionItem component', () => {
  it('renders correctly', () => {
    const props = {
      className: 'accordion-item',
      titleText: 'Heading',
      index: 1,
      activeClass: 'active',
      children: ['<div className="abcd">Content1</div>'],
    };
    const component = shallow(<AccordionVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with no index', () => {
    const props = {
      className: 'accordion-item',
      titleText: 'Heading',
      index: 0,
      activeClass: 'active',
      children: ['<div className="abcd">Content2</div>'],
    };
    const component = shallow(<AccordionVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
