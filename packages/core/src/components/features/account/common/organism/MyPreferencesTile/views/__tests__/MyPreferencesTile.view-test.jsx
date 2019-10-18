import React from 'react';
import { shallow } from 'enzyme';
import { MyPreferencesTile } from '../MyPreferencesTile.view';

describe('MyPreferencesTile component', () => {
  it('should render correctly when coupons are not present', () => {
    const props = {
      labels: {},
      isCanada: '',
      favStoreName: '',
      favStoreAddress: '',
      favStoreState: '',
      favStoreCity: '',
      favStoreZipcode: '',
      favStorePhone: '',
      getSocialAcc: {},
    };
    const component = shallow(<MyPreferencesTile {...props} />);
    expect(component).toMatchSnapshot();
  });
});
