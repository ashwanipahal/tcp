import React from 'react';
import { shallow } from 'enzyme';
import * as utils from '@tcp/core/src/utils/utils';
import { CondensedHeaderVanilla } from '../CondensedHeader';

utils.getBrand = jest.fn().mockReturnValue('tcp');

const props = {
  labels: {
    accessibility: {
      accountIconButton: 'Account',
      cartIconButton: 'cart',
      hamburgerMenu: 'menu',
      searchIconButton: 'search',
    },
  },
};

describe('<CondensedHeaderVanilla />', () => {
  let Wrapper = '';
  beforeEach(() => {
    Wrapper = shallow(<CondensedHeaderVanilla {...props} />);
  });

  test('Should match snapshot correctly', () => {
    expect(Wrapper).toMatchSnapshot();
  });
});
