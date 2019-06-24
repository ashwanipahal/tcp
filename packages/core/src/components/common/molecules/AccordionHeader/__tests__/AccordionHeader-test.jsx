import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import theme from '@tcp/core/styles/themes/TCP';
import AccordionHeader from '../views/AccordionHeader';

describe('AccordionHeader component', () => {
  it('renders correctly', () => {
    const props = {
      className: 'abcd',
      updateAccordionState: () => {},
      index: 1,
      titleText: 'Sample Title',
      theme,
    };
    const component = renderer.create(<AccordionHeader {...props} />).toJSON();
    expect(component).toMatchSnapshot();
  });
});
