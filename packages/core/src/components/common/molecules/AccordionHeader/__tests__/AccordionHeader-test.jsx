import React from 'react';
import { shallow } from 'enzyme';
import { AccordionHeaderVanilla } from '../views/AccordionHeader';

describe('AccordionHeader component', () => {
  it('renders correctly', () => {
    const props = {
      className: 'abcd',
      updateAccordionState: () => {},
      index: 1,
      titleText: 'Sample Title',
    };
    const component = shallow(<AccordionHeaderVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
