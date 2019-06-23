import React from 'react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import theme from '@tcp/core/styles/themes/TCP';
import { ThemeProvider } from 'styled-components';
import FooterNavLinks from '../views/FooterNavLinks';

describe('FooterNavLinks component', () => {
  it('renders default footer correctly', () => {
    const props = {
      className: 'footer-nav-header1',
      titleText: 'Title',
      ariaLabel: 'ABCD',
      isSubHeader: false,
      headerAsImage: false,
      updateAccordionState: () => {},
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
    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <FooterNavLinks {...props} />
      </ThemeProvider>
    );
    expect(component).toMatchSnapshot();
  });
});
