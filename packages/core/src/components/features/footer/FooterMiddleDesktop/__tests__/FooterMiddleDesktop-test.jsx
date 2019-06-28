import React from 'react';
import { shallow } from 'enzyme';
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
    const component = shallow(<FooterMiddleDesktop {...props} />);
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
    const component = shallow(<FooterMiddleDesktop {...props} />);
    expect(component).toMatchSnapshot();
  });
});
