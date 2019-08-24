import React from 'react';
import { shallow } from 'enzyme';
import * as utils from '@tcp/core/src/utils/utils';

import { HeaderMiddleNavVanilla as HeaderMiddleNav } from '../HeaderMiddleNav';

utils.getBrand = jest.fn().mockReturnValue('tcp');

describe('HeaderMiddleNav component', () => {
  it('renders correctly', () => {
    const HeaderMiddleNavComp = shallow(<HeaderMiddleNav />);

    expect(HeaderMiddleNavComp).toMatchSnapshot();
  });

  it('Header Middle loaded perfectly', () => {
    const HeaderMiddleNavComp = shallow(<HeaderMiddleNav />);

    expect(HeaderMiddleNavComp.find('.header-middle-nav')).toHaveLength(1);
  });

  it('Header Middle Search Bar loaded perfectly', () => {
    const HeaderMiddleNavComp = shallow(<HeaderMiddleNav />);

    expect(HeaderMiddleNavComp.find('.header-middle-nav-search')).toHaveLength(1);
  });

  it('Header Middle Nav Bar loaded perfectly', () => {
    const HeaderMiddleNavComp = shallow(<HeaderMiddleNav />);

    expect(HeaderMiddleNavComp.find('.header-middle-nav-bar')).toHaveLength(1);
  });

  it('renders correctly when props dont change', () => {
    const props = {
      isLoggedIn: false,
    };
    const HeaderMiddleNavComp = shallow(<HeaderMiddleNav props={props} />);
    HeaderMiddleNavComp.setProps({
      isLoggedIn: false,
    });
    expect(HeaderMiddleNavComp.state('isLoggedIn')).toBe(false);
    expect(HeaderMiddleNavComp).toMatchSnapshot();
  });
});
