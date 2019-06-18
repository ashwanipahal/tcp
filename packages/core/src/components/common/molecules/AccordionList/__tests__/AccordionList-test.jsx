import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import theme from '@tcp/core/styles/themes/TCP';
import { ThemeProvider } from 'styled-components';
import AccordionList from '../views/AccordionList';

describe('AccordionList component', () => {
  it('renders correctly with 1 accordion open', () => {
    const props = {
      accordionItems: [
        {
          header: {
            text: 'list item 1',
          },
        },
        {
          header: {
            text: 'list item 2',
          },
        },
      ],
      className: 'accordion-list',
      defaultOpenIndex: 1,
      children: ['<div className="abcd"></div>', '<div className="defg"></div>'],
    };
    const component = renderer
      .create(
        <ThemeProvider theme={theme}>
          <AccordionList {...props} />
        </ThemeProvider>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with no accordion open', () => {
    const props = {
      accordionItems: [
        {
          header: {
            text: 'list item 1',
          },
        },
        {
          header: {
            text: 'list item 2',
          },
        },
      ],
      className: 'accordion-list',
      defaultOpenIndex: -1,
      children: ['<div className="abcd"></div>', '<div className="defg"></div>'],
    };
    const component = renderer
      .create(
        <ThemeProvider theme={theme}>
          <AccordionList {...props} />
        </ThemeProvider>
      )
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
