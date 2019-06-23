import React from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import 'jest-styled-components';
import FooterMiddleDesktop from '../views/FooterMiddleDesktop';

describe('FooterMiddleDesktop component', () => {
  it('renders correctly', () => {
    const props = {
      className: 'footer-links',
      navLinks: [
        {
          header: '',
          title: '',
        },
        {
          header: '',
          title: '',
        },
        {
          header: '',
          title: '',
        },
        {
          header: '',
          title: '',
        },
        {
          header: '',
          title: '',
        },
        {
          header: '',
          title: '',
        },
      ],
    };
    const rendererShallow = new ShallowRenderer();
    const component = rendererShallow.render(<FooterMiddleDesktop {...props} />);
    expect(component).toMatchSnapshot();
  });
  it('renders correctly', () => {
    const props = {
      className: 'footer-links',
      navLinks: [
        {
          header: '',
          title: '',
        },
        {
          header: '',
          title: '',
        },
        {
          header: '',
          title: '',
        },
        {
          header: '',
          title: '',
        },
        {
          header: '',
          title: '',
          isSubHeader: true,
        },
        {
          header: '',
          title: '',
        },
      ],
    };
    const rendererShallow = new ShallowRenderer();
    const component = rendererShallow.render(<FooterMiddleDesktop {...props} />);
    expect(component).toMatchSnapshot();
  });
});
