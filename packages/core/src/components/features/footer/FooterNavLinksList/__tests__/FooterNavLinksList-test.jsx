import React from 'react';
import 'jest-styled-components';
import { shallow } from 'enzyme';
import { FooterNavLinksListVanilla } from '../views/FooterNavLinksList';

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
    const component = shallow(<FooterNavLinksListVanilla {...props} />);
    expect(component).toMatchSnapshot();
  });
});
