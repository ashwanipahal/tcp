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
          isSubHeader: true,
        },
        {
          header: '',
          title: '',
          links: [],
        },
      ],
    };
    const component = shallow(<FooterMiddleDesktop {...props} />);
    expect(component).toMatchSnapshot();
  });
});
