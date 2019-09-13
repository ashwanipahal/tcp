import React from 'react';
import { shallow } from 'enzyme';
import CnCCommonTemplate from '../views/CnCTemplate.view.native';

describe('CnCCommonTemplate Page', () => {
  it('should render correctly', () => {
    const props = {
      navigation: {},
      btnText: 'Shipping',
      onPress: jest.fn(),
    };
    const tree = shallow(<CnCCommonTemplate {...props} />);
    expect(tree).toMatchSnapshot();
  });
});
