import React from 'react';
import { shallow } from 'enzyme';
import * as utils from '@tcp/core/src/utils/utils';
import { CondensedHeaderVanilla } from '../CondensedHeader';

utils.getBrand = jest.fn().mockReturnValue('tcp');

describe('<CondensedHeaderVanilla />', () => {
  let Wrapper = '';
  beforeEach(() => {
    Wrapper = shallow(<CondensedHeaderVanilla />);
  });

  test('Should match snapshot correctly', () => {
    expect(Wrapper).toMatchSnapshot();
  });
});
