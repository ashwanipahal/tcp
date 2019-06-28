import React from 'react';
import { shallow } from 'enzyme';
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
    const component = shallow(<FooterNavLinks {...props} />);
    expect(component).toMatchSnapshot();
  });
});
