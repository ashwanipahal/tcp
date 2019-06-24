import React from 'react';
import 'jest-styled-components';
import ShallowRenderer from 'react-test-renderer/shallow';
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
    const rendererShallow = new ShallowRenderer();
    const component = rendererShallow.render(<AccordionList {...props} />);
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
    const rendererShallow = new ShallowRenderer();
    const component = rendererShallow.render(<AccordionList {...props} />);
    expect(component).toMatchSnapshot();
  });
});
