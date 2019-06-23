import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import 'jest-styled-components';
import FooterMiddleMobile from '../views/FooterMiddleMobile';

describe('FooterMiddleMobile component', () => {
  it('renders correctly', () => {
    const props = {
      className: 'footer-links',
      navLinkItems: [
        {
          header: '',
          title: '',
          links: [],
        },
        {
          header: '',
          title: '',
          links: [],
        },
        {
          header: '',
          title: '',
          links: [],
        },
        {
          header: '',
          title: '',
          links: [],
        },
        {
          header: '',
          title: '',
          links: [],
        },
        {
          header: '',
          title: '',
          links: [],
        },
      ],
    };
    const rendererShallow = new ShallowRenderer();
    const component = rendererShallow.render(<FooterMiddleMobile {...props} />);
    expect(component).toMatchSnapshot();
  });

  it('renders correctly', () => {
    const props = {
      className: 'footer-links',
      navLinkItems: [
        {
          header: '',
          title: '',
          links: [],
        },
        {
          header: '',
          title: '',
          links: [],
        },
        {
          header: '',
          title: '',
          links: [],
        },
        {
          header: '',
          title: '',
          links: [],
        },
        {
          header: '',
          title: '',
          isSubHeader: true,
          links: [],
        },
        {
          header: '',
          title: '',
          links: [],
        },
      ],
    };
    const rendererShallow = new ShallowRenderer();
    const component = rendererShallow.render(<FooterMiddleMobile {...props} />);
    expect(component).toMatchSnapshot();
  });
});
