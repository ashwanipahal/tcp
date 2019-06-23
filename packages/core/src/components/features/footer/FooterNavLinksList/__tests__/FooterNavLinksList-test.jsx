import React from 'react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import theme from '@tcp/core/styles/themes/TCP';
import { ThemeProvider } from 'styled-components';
import FooterNavLinksList from '../views/FooterNavLinksList';

describe('FooterNavLinksList component', () => {
  it('renders default footer correctly', () => {
    const props = {
      className: 'footer-nav-header1',
      titleText: 'Title',
      ariaLabel: 'ABCD',
      isSubHeader: false,
      headerAsImage: false,
      updateAccordionState: () => {},
      listArray: [
        {
          url: '',
          text: '',
        },
        {
          url: '',
          text: '',
        },
        {
          url: '',
          text: '',
        },
      ],
    };
    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <FooterNavLinksList {...props} />
      </ThemeProvider>
    );
    expect(component).toMatchSnapshot();
  });
});
