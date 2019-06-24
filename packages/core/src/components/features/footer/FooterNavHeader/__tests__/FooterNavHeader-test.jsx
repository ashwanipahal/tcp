import React from 'react';
import 'jest-styled-components';
import { shallow } from 'enzyme';
import { FooterNavHeaderVanilla } from '../views/FooterNavHeader';

describe('FooterNavHeader component', () => {
  it('renders default footer correctly', () => {
    const props = {
      className: 'footer-nav-header1',
      titleText: 'Title',
      ariaLabel: 'ABCD',
      isSubHeader: false,
      index: 2,
    };
    const component = shallow(<FooterNavHeaderVanilla {...props} />);
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
    const component = shallow(<FooterNavHeaderVanilla {...props} />);
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
    const component = shallow(<FooterNavHeaderVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
