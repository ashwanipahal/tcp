import React from 'react';
import 'jest-styled-components';
import renderer from 'react-test-renderer';
import theme from '@tcp/core/styles/themes/TCP';
import { ThemeProvider } from 'styled-components';
import FooterNavHeader from '../views/FooterNavHeader';

describe('FooterNavHeader component', () => {
  it('renders default footer correctly', () => {
    const props = {
      className: 'footer-nav-header1',
      titleText: 'Title',
      ariaLabel: 'ABCD',
      isSubHeader: false,
      index: 2,
    };
    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <FooterNavHeader {...props} />
      </ThemeProvider>
    );
    expect(component).toMatchSnapshot();
  });

  it('renders subheader variation correctly', () => {
    const props = {
      className: 'footer-nav-header2',
      titleText: 'Title',
      ariaLabel: 'ABCD',
      isSubHeader: true,
      index: 4,
    };
    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <FooterNavHeader {...props} />
      </ThemeProvider>
    );
    expect(component).toMatchSnapshot();
  });

  it('renders image in header variation correctly', () => {
    const props = {
      className: 'footer-nav-header',
      titleText: 'Title',
      ariaLabel: 'ABCD',
      isSubHeader: false,
      headerAsImage: true,
      index: 3,
      titleObj: {
        text: '',
        url: '',
      },
    };
    const component = renderer.create(
      <ThemeProvider theme={theme}>
        <FooterNavHeader {...props} />
      </ThemeProvider>
    );
    expect(component).toMatchSnapshot();
  });
});
