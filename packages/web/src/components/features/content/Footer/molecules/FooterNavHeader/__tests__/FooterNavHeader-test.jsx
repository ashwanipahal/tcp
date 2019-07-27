import React from 'react';
import { shallow } from 'enzyme';
import { FooterNavHeaderVanilla } from '../views/FooterNavHeader';

describe('FooterNavHeader component', () => {
  it('renders default footer correctly', () => {
    const props = {
      className: 'footer-nav-header1',
      titleText: 'Title',
      ariaLabel: 'ABCD',
      isSubHeader: false,
      colNum: 2,
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
      colNum: 4,
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
      colNum: 3,
      titleObj: {
        text: '',
        url: '',
      },
    };
    const component = shallow(<FooterNavHeaderVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
