import React from 'react';
import { shallow } from 'enzyme';
import 'jest-styled-components';
import AccordionHeader from '../views/AccordionHeader';

describe('AccordionHeader component', () => {
  it('renders correctly', () => {
    const props = {
      className: 'abcd',
      updateAccordionState: () => {},
      index: 1,
      titleText: 'Sample Title',
    };
    const component = shallow(<AccordionHeader {...props} />);
    expect(component).toMatchSnapshot();
  });
});
