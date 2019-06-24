import React from 'react';
import 'jest-styled-components';
import { shallow, mount } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import theme from '@tcp/core/styles/themes/TCP';
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
            text: 'list item 1',
          },
        },
      ],
      className: 'accordion-list1',
      defaultOpenIndex: 1,
      children: ['<div className="abcd1"></div>', '<div className="defg1"></div>'],
    };
    const component = shallow(<AccordionList {...props} />);
    expect(component).toMatchSnapshot();
    expect(component.find({ activeClass: 'active' })).toHaveLength(1);
    expect(component.find({ activeClass: 'inactive' })).toHaveLength(1);
  });

  it('renders correctly with no accordion open', () => {
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
    expect(component.find({ activeClass: 'active' })).toHaveLength(2);
    expect(component.find({ activeClass: 'inactive' })).toHaveLength(0);
  });

  it('renders correctly when click event is triggered', () => {
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
      defaultOpenIndex: 1,
      children: ['<div className="abcd2"></div>', '<div className="defg2"></div>'],
    };
    const component = mount(
      <ThemeProvider theme={theme}>
        <AccordionList {...props} />
      </ThemeProvider>
    );
    component.find('h4.accordion.inactive').simulate('click');
    expect(component.find({ activeClass: 'inactive' })).toHaveLength(3);
  });
});
