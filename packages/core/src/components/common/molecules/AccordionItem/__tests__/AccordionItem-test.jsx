import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import theme from '@tcp/core/styles/themes/TCP';
import { ThemeProvider } from 'styled-components';
import AccordionItem from '../views/AccordionItem';

describe('AccordionItem component', () => {
  it('renders correctly', () => {
    const props = {
      className: 'accordion-list',
      titleText: 'Heading',
      index: 1,
      activeClass: 'active',
      children: ['<div className="abcd"></div>'],
    };
    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <AccordionItem {...props} />
      </ThemeProvider>
    );
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with no index', () => {
    const props = {
      className: 'accordion-list',
      titleText: 'Heading',
      index: 0,
      activeClass: 'active',
      children: ['<div className="abcd"></div>'],
    };
    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <AccordionItem {...props} />
      </ThemeProvider>
    );
    expect(component).toMatchSnapshot();
  });
});
