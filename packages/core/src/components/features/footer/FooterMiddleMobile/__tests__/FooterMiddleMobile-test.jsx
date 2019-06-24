import React from 'react';
import { shallow } from 'enzyme';
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
    const component = shallow(<FooterMiddleMobile {...props} />);
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
    const component = shallow(<FooterMiddleMobile {...props} />);
    expect(component).toMatchSnapshot();
  });
});
