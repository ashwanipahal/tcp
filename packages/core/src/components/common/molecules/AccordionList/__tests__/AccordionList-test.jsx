import React from 'react';
import 'jest-styled-components';
import { shallow, mount } from 'enzyme';
import theme from '@tcp/core/styles/themes/TCP';
import { ThemeProvider } from 'styled-components';
import AccordionList from '../views/AccordionList';

describe('AccordionList component', () => {
  it('renders correctly with 1 accordion open', () => {
    const props = {
      accordionItems: [
        {
          header: {
            text: 'list item 11',
          },
        },
        {
          header: {
            text: 'list item 12',
          },
        },
      ],
      className: 'accordion-list1',
      defaultOpenIndex: 1,
      children: ['<div className="abcd1"></div>', '<div className="defg1"></div>'],
    };
    const component = shallow(<AccordionList {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly with no accordion open 1', () => {
    const props = {
      accordionItems: [
        {
          header: {
            text: 'list item 12',
          },
        },
        {
          header: {
            text: 'list item 23',
          },
        },
      ],
      className: 'accordion-list2',
      children: ['<div className="abcd2"></div>', '<div className="defg2"></div>'],
    };
    const component = shallow(<AccordionList {...props} />);
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
      children: ['<div className="abcd"></div>', '<div className="defg"></div>'],
    };
    const component = shallow(<AccordionList {...props} />);
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
      children: ['<div className="abcd"></div>', '<div className="defg"></div>'],
    };
    const component = mount(
      <ThemeProvider theme={theme}>
        <AccordionList theme={theme} {...props} />
      </ThemeProvider>
    );
    expect(component.find('h4')).toHaveLength(2);
  });
});
