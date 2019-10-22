import React from 'react';
import { shallow } from 'enzyme';
import { MyPreferencesTile } from '../MyPreferencesTile.view.native';

describe('MyPreferencesTile component', () => {
  it('should render correctly', () => {
    const props = {
      labels: {},
      isCanada: '',
      favStoreName: '',
      favStoreAddress: '',
      favStoreState: '',
      favStoreCity: '',
      favStoreZipcode: '',
      favStorePhone: '',
      socialAccounts: {},
    };
    const component = shallow(<MyPreferencesTile {...props} />);
    expect(component).toMatchSnapshot();
  });
});
