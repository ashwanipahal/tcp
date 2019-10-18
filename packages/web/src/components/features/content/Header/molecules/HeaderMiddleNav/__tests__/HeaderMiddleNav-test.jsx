import React from 'react';
import { shallow } from 'enzyme';
import * as utils from '@tcp/core/src/utils/utils';

import { HeaderMiddleNavVanilla as HeaderMiddleNav } from '../HeaderMiddleNav';

utils.getBrand = jest.fn().mockReturnValue('tcp');

const props = {
  isLoggedIn: false,
  labels: {
    accessibility: {
      closeIconButton: 'close',
    },
  },
};
describe('HeaderMiddleNav component', () => {
  let HeaderMiddleNavComp = '';

  beforeEach(() => {
    HeaderMiddleNavComp = shallow(<HeaderMiddleNav {...props} />);
  });

  it('renders correctly', () => {
    expect(HeaderMiddleNavComp).toMatchSnapshot();
  });

  it('Header Middle loaded perfectly', () => {
    expect(HeaderMiddleNavComp.find('.header-middle-nav')).toHaveLength(1);
  });

  it('Header Middle Search Bar loaded perfectly', () => {
    expect(HeaderMiddleNavComp.find('.header-middle-nav-search')).toHaveLength(1);
  });

  it('Header Middle Nav Bar loaded perfectly', () => {
    expect(HeaderMiddleNavComp.find('.header-middle-nav-bar')).toHaveLength(1);
  });

  it('renders correctly when props dont change', () => {
    expect(HeaderMiddleNavComp.state('isLoggedIn')).toBe(false);
    expect(HeaderMiddleNavComp).toMatchSnapshot();
  });
});
